const express = require('express')
const app = express()
require(__dirname + '/src/router')(app)

const config = require('./config.json')

app.set('views', __dirname + '/src/views')

app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use(express.static('public'))
app.use('/bots/charting_library', express.static('public/charting_library'))
app.use('/trade', express.static(config.tradeDir))
app.use('/status', express.static(config.statusDir))

app.listen(config.port, () => console.log(`visu app listening on port ${config.port}!`))