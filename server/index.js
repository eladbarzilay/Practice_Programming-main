
require('dotenv').config()

// require('./DL/ScriptData/script_lang')
const
    express = require('express'),
    app = express(),
    PORT = process.env.PORT
const cors = require('cors')




app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

require('./Router')(app)


app.listen(PORT, () => console.log(`server is running... port: ${PORT} `))