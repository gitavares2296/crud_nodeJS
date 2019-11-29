const Router = require('restify-router').Router
const authController = require('../controller/auth')


var authRouter = new Router()

authRouter.post('/auth/login', authController.login)            //Rota de login
authRouter.post('/auth/validateToken', authController.token)    //Rota de verificação de token


module.exports = authRouter