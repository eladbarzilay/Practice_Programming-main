const exersciseController = require('../../DL/Controller/ExersciseController')

async function create(data) {
    return exersciseController.create(data)
   
}

async function read(_id) {
    let filter = _id ? {_id } : {}
    return exersciseController.read(filter)
}
async function readByLang(prog_lang) {
    let filter = prog_lang ? {prog_lang } : {}
    return exersciseController.read(filter)
}

async function update(id,data) {
    data.lastSeen = Date.now()
    return exersciseController.update(id, data)
}

module.exports = {
    ...exersciseController,
    create,
    read,
    update,
    readByLang

}
