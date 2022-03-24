const bcryptjs = require('bcryptjs')
const UserController = require('../../DL/Controller/UserController')

async function create(data) {
    if (!data.email?.includes('@'))
        throw 'you forgot to put @'
    return UserController.create(data)
}

async function update(data) {
    data.lastSeen = Date.now()
    return UserController.update(data._id, data)
}


async function register(data) {
    if (!data.firstName || !data.lastName)
        throw 'first and last name are required!!'

    data.userName = `${data.firstName} ${data.lastName}`

    data.password = bcryptjs.hashSync(data.password)

    return create(data)
}


async function login(email, password) {
    const user = (await UserController.read({ email }, '+password'))[0] //// מחזיר מערך
  

    if (!user) throw ' email or password invaild' //// לא נרצה לחשוף את הסיבה

    if (!bcryptjs.compareSync(password, user.password))
    throw ' email or password invaild'
 
    return update(user)

}

module.exports = { ...UserController, create, update, register, login }