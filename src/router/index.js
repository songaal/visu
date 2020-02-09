const fs = require('fs')
const config = require('../../config.json')

module.exports = function(app) {
    app.get('/', function(req, res){

        res.render("index", {
            tradeFiles: fs.readdirSync(config.tradeDir)
                            .filter(file => file.startsWith(config.tradePrefix)),
            statusFiles: fs.readdirSync(config.statusDir)
                            .filter(file => file.startsWith(config.statusPrefix))
        })
    })

    app.get('/bots', function(req, res){
        let bots = fs.readdirSync(config.statusDir)
                            .filter(file => file.startsWith(config.statusPrefix))
                            .map(file => file.replace(config.statusPrefix, '').replace('.json', ''))
        res.render("bots", {
            bots: bots
        })
    })

    app.get('/bots/:name', function(req, res) {
        let bot = {
            name: req.params['name'],
            tradeJson: `/trade/${config.tradePrefix}${req.params['name']}.json`,
            statusJson: `/status/${config.statusPrefix}${req.params['name']}.json`,
            status: null,
            trade: null
        }

        res.render('bot', {
            bot: encodeURI(JSON.stringify(bot))
        })
        
    })

    

}
