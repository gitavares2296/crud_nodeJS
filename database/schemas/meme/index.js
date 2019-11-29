const { Schema, model } = require('mongoose')

const MemeSchema = new Schema(
    {
        titulo: {type: String, required: true},
        descricao: {type: String, required: true},
        ano: {type: Number, required: true},
    },
    {
        timestamps: true
    }
)

module.exports = model('Meme', MemeSchema)