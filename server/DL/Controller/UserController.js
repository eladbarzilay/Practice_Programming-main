require('../db')
const mongoose = require('mongoose')

const UserModel = require('../Model/UserModel')

async function create(data) {
    return await UserModel.create(data)
}

async function read(filter = {}, projection) {
    return await UserModel.find(filter, projection)
}

async function update(_id, data) {
    return await UserModel.findByIdAndUpdate(
        _id,
        data,
        { new: true, runValidators: true }
    )
}


module.exports={create,read,update}