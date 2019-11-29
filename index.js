
const restify = require('restify')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const memeRoutes = require('./routes/meme')

const PORT = process.env.PORT || 3000

var server = restify.createServer()
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser());

authRoutes.applyRoutes(server)
memeRoutes.applyRoutes(server, '/meme')

var dataBaseURL = "mongodb+srv://adauto:adauto@cluster0-rven8.mongodb.net/test?retryWrites=true&w=majority",
dataBase_setting = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    dbName: "ec021-av2-core"
}

mongoose.connect(dataBaseURL, dataBase_setting, (err) => {
    if(!err) {
        console.log(`Estabelecida a conexão: ${dataBase_setting.dbName}`)
    } else {
        console.log(`ERRO: ${err}`)
    }
})

server.listen(8081, () => {
    console.log(`Server running at port: 8081`)
})