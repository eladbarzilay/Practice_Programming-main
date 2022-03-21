const 
ExersciseLogic = require('./Logic/ExersciseLogic'),
LangLogic = require('./Logic/LangLogic')
const UserLogic = require('./Logic/UserLogic');

async function getSingleExercise(_id) {
    const exercise = await ExersciseLogic.read(_id)
    // let c_id = exercise[0].creator_id
    const user = await UserLogic.read({_id: exercise[0].creator_id})

    return {
        exercise,
        user
    }
}

module.exports={
    getSingleExercise
}