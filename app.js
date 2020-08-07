//get Exspress.js
//function require get packeges
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')


//Variable (Server)
const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

//this if for working together Frontend and Backend = in Node.js on server
if (process.env.NODE_ENV === 'production'){
    app.use('/',express.static(path.json(__dirname, 'client' , 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = config.get('port') || 5000
//function connect to mongoDB
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()