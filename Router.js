const jwt = require('jsonwebtoken')
const UserLogic = require('./BL/Logic/UserLogic')
const LangLogic = require('./BL/Logic/LangLogic')
const GeneralLogic = require('./BL/GeneralLogic')
const ExersciseLogic = require('./BL/Logic/ExersciseLogic')
const userConrroller = require('./DL/Controller/UserController')
const RSA_PRIVATE_KEY = process.env.PASSWORD

module.exports = app => {
    // login
    app.post('/login', async (req, res) => {
        const { email, password } = req.body
        let result;
        try {
            result = await UserLogic.login(email, password)
            const userId = result.id ///// ראוטר כמה שיותר נקי ובשליחה לשלוח כבר אובייקט מסונן
            let token = jwt.sign({id:userId},RSA_PRIVATE_KEY,{expiresIn:'15m'} )
            console.log(token);
            res.send({token,result})
        } catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
            res.send(result)
        }

    })

    /// register
    app.post('/register', async (req, res) => {
        let result
        try {
            result = await UserLogic.register(req.body)
        } catch (error) {
            result = {
                status: 400,
                message: error.message || error
            }
        }
        res.send(result)

    })

    //read - exercise
    app.get('/exercise/:id?', async (req, res) => {
        let result;
        try {
           
            if (req.params.id) {
                result = await GeneralLogic.getSingleExercise(req.params.id)
            }
            else {
                result = await ExersciseLogic.read()
            }

        } catch (err) {
            result = {
                status: 400,
                message: err.message || err
            }
        }
        res.send(result)
    })

    //create -exercise
    app.post('/exercise', async (req, res) => {
        const Token = req.headers.authorization
        let result;
        try {
            const {id: userId} = jwt.verify(Token,RSA_PRIVATE_KEY) /// הסוגריים מסולסלים הם הגדרת מזהה בתור שם חדש
            const user = await userConrroller.read({_id:userId})
            console.log(user[0].permit,userId);
            if(user[0].permit !== "admin") throw "not auth"
            result = await ExersciseLogic.create(req.body)
        } catch (err) {
            result = {
                status: 400,
                massage: err.massage || err
            }
        }
        res.send(result)

    })
    //update - exercise
    app.put('/exercise/:id', async (req, res) => {
        const { id } = req.params
        const Token = req.headers.authorization
        let result;
        try {
       const {id: userId} = jwt.verify(Token,RSA_PRIVATE_KEY) /// הסוגריים מסולסלים הם הגדרת מזהה בתור שם חדש
       const user = await userConrroller.read({_id:userId})
       console.log(user[0].permit,userId);
       if(user[0].permit !== "admin") throw "not auth"
            result = await ExersciseLogic.update(id, req.body)
        } catch (err) {
            result = {
                status: 400,
                message: err.message || err
            }
        }
        res.send(result)

    })

    //delete - exercise
    app.put('/exercise/:id', (req, res) => {

    })

    //read  - Lang
    app.get('https://exercide-site.herokuapp.com/Lang', async (req, res) => {
        res.send(await LangLogic.read())
    })


    app.get('/exe-Lang/:prog_lang', async (req, res) => {
        const { prog_lang } = req.params
        let result;
        try {
            result = await ExersciseLogic.readByLang(prog_lang)
        } catch (err) {
            result = {
                status: 400,
                message: err.message || err
            }
        }
        res.send(result)
    })



}