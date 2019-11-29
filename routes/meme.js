const Router = require('restify-router').Router
const memeController = require('../controller/meme')
const authController = require('../controller/auth')

var memeRouter = new Router()

memeRouter.use(authController.verifyJWT)
memeRouter.get('/:id', memeController.search)   //Rota de listagem de meme
memeRouter.post('/', memeController.insert)     //Rota de insert de meme
memeRouter.patch('/:id', memeController.update) //Rota de update de meme
memeRouter.del('/', memeController.delete)   //Rota de delete de meme


module.exports = memeRouter