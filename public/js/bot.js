async function fetchStatus() {
    try {
        // status 기본 정보 
        bot.status = await (await fetch(bot.statusJson)).json()
        bot.status.symbol = `${bot.status.base}${bot.status.quote}`
    } catch (err) {
        console.error('status error', err)
        throw err
    }
}

async function fetchTrade() {
    try {
        // trade 기록 정보
        bot.trade = await (await fetch(bot.tradeJson)).json()
    } catch (err) {
        console.error('trade error', err)
        bot.trade = []
    }
}

async function initOnReady() {
    window.shape_list = new Map()

    try {
        await fetchStatus()
        console.log('fetch Status Ready')

        await fetchTrade()
        console.log('fetch Trade Ready')

    } catch (err) {
        console.log('파일이 없습니다.')
        alert('BOT 정보가 없습니다.')
    }

    await drawWidget(bot.status)
    console.log('widget Ready')

    await drawTrade(bot.trade)
    console.log('widget Trade Ready')


    await drawBotDetails(bot)

};

async function drawWidget(opt={}) {
    if (window.widget) {
        widget.remove()
    }
    return new Promise((resolve, reject) => {
        window.widget = new TradingView.widget(Object.assign({
            // fullscreen: true,
            width: '100%',
            height: '600',
            symbol: "BTCUSDT",
            datafeed: new Datafeeds.UDFCompatibleDatafeed("http://13.124.177.37:8080"),
            timezone: "Asia/Seoul",
            interval: "60",
            allow_symbol_change: true,
            container_id: "tv_chart_container",
            library_path: "charting_library/",
            locale: "ko",
            disabled_features: ["use_localstorage_for_settings"],
            enabled_features: ["move_logo_to_main_pane"]
        }, opt))
        let eventCode = setInterval(() => {
            console.log('widget check...')
            if (widget._ready) {
                clearInterval(eventCode)
                autoChartHeight()
                window.onresize = autoChartHeight
                resolve(widget)
            }
        }, 100)
    })
}

async function drawTrade(trade = []) {
    trade.forEach(async (t, i) => {
        addShape(t.tradeTime, t.price, t.position, '')
    })
}

async function addShape(time, price, pos, memo='') {
    return new Promise((resolve, reject) => {
        if (shape_list[time]) {
            reject(shape_list[time])
        }
        resolve(widget.chart()
            .createShape({ 
                time: Math.ceil(time),
                price: price
            }, {
                shape: pos === 'LONG' ? 'arrow_up' : pos === 'SHORT' ? 'arrow_down' : 'flag',
                text: formatText(time, price, pos, memo),
                lock: true
            }
        ))
    })
}

function formatText(time, price, pos, memo) {
    let d = new Date(time * 1000)
    let fd = d.getFullYear() + '-'
    fd += (d.getMonth() + 1) + '-'
    fd += d.getDate()
    if (pos === 'LONG') {
        return `[${pos}]T:${fd},P:${price}${memo ? ',M:' + memo : ''}`
    } else if (pos === 'SHORT') {
        return `[${pos}]T:${fd},P:${price}${memo ? ',M:' + memo : ''}`
    } else {
        return `[${pos}]T:${fd},P:${price}${memo ? ',M:' + memo : ''}`
    }
}

function autoChartHeight() {
    let navsHeight = document.querySelector('#botTab').offsetHeight
    let windowHeight = window.innerHeight
    let chartHeight = windowHeight - navsHeight
    if (chartHeight < 200) {
        chartHeight = 200
    } else if (chartHeight > 2000) {
        chartHeight = 2000
    }
    document.querySelector('#tv_chart_container>iframe').setAttribute('height', chartHeight)
}

window.addEventListener('DOMContentLoaded', initOnReady, false);


async function drawBotDetails(bot) {
    document.querySelector('#showStatus').innerHTML = JSON.stringify(bot.status, null, 4)
    document.querySelector('#showTrade').innerHTML = JSON.stringify(bot.trade, null, 4)
}