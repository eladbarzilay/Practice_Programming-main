
const LangController = require( '../../DL/Controller/LangControler') 

  async function read(_id) {
    let filter = _id ? { _id } : {}
    return LangController.read(filter)
}

module.exports ={...LangController, read}
