require('../db')
const mongoose = require('mongoose')

const Lang = require('../Model/LangModel')

async function create(data) {
    return await Lang.create(data)
}


async function read(filter = {}, projection) {
    return await Lang.find(filter, projection)
}

async function update(_id, data) {
    return await Lang.findByIdAndUpdate(
        _id,
        data,
        { new: true, runValidators: true }
    )
}

module.exports = {
    create,
    read,
    update
}

