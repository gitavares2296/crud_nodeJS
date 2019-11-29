const axios = require('axios')

//exportar a função de Login do usuário
exports.login = (req, res) => {

    console.log('Login')

    const { username, password } = req.body

    let url = "https://ec021-2019-2-av2-auth.herokuapp.com/auth/login"
    let postData = { username, password }
    let axiosConfig = {}
    console.log(username)
    console.log(url)
    axios.post(url, postData, axiosConfig)
        .then(sucess => {
            console.log(sucess.data)
            res.json(sucess.data)
        })
        .catch(err => {
            console.log(err)
            res.send("Login inválido")
        })

}

exports.token = (req, res) => {
    console.log('Token')

    const { token } = req.headers

    let url = "https://ec021-2019-2-av2-auth.herokuapp.com/auth/validateToken"
    let postData = {}
    let axiosConfig = {
        headers: {
            token
        }
    }

    axios.post(url, postData, axiosConfig)
        .then(sucess => {
            console.log(sucess.data)
            res.send(200, sucess.data)
        })
        .catch(err => {
            console.log(err.data)
            res.send("Token invalido")
        })
}

exports.verifyJWT = async (req, res, next) => {
    const { token } = req.headers
    console.log(`Verificação de token: ${token}`)

    if(token == null) {
        return res.send(403, { Erro: 'Token não fornecido' })
    }

    let url = "https://ec021-2019-2-av2-auth.herokuapp.com/auth/validateToken"
    let postData = {}
    let axiosConfig = {
        headers: {
            token
        }
    }

    await axios.post(url, postData, axiosConfig)
        .then(sucess => {
            console.log(sucess.data)
            next()
        })
        .catch(err => {
            console.log(err.data)
            res.send(401, { Erro: "Token inválido" })
        })
}