const axios = require('axios')

const Meme = require('../database/schemas/meme/index')

module.exports = {
    //cadastrar um meme
    async insert(req, res) {
        console.log('Insere meme')

        const { titulo, descricao, ano } = req.body

        const meme = await Meme.create({
            titulo,
            descricao,
            ano
        })

        console.log(meme)
        res.send(201, meme)
    },

    //atualizar meme
    async update(req, res) {
        console.log('Atualiza meme')

        const { titulo, descricao, ano } = req.body
        const { id } = req.params

        const response = await Meme.updateOne({ _id: id }, {
            titulo,
            descricao,
            ano
        })

        if(response.nModified == 1 && response.ok == 1) {
            console.log(`${titulo} foi atualizado`)
            const meme = await Meme.findById(id)
            return res.send(200, meme)
        }

        res.send(400)
    },

    //Procurar meme
    async search(req, res) {
        console.log("Buscar meme")

        const { id } = req.params
        console.log(id)

        let meme
        // logica para verficar se existe algum meme com o id pesquisado
        if(id) {
            meme = await Meme.findById(id)

            if (meme != null) {
                res.json(meme)
                res.status(204)
            } else {
                res.status(404) 
                res.json({Message: 'Not Found'})}

        } else {
            meme = await Meme.find()
            console.log(`${meme.length} memes encontrados`)
            res.json(meme)
        }

    },

    //Excluir meme
    async delete(req, res) {
        console.log('Exclui meme')

        const { id } = req.body

        const response = await Meme.deleteOne({ _id: id })

        if(response.deletedCount == 1 && response.ok == 1) {
            console.log(`${id} removido`)
            return res.send(204)
        }
    }
}