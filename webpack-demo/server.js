let express = require('express')
let app = express()

console.log(process.env.NODE_ENV)

app.get('/user', (req, res) => {
    res.json({
        name: 'hello node serve'
    })
})

app.get('/api/form', (req, res) => {
    res.json({
        name: 'form'
    })
})

app.listen(3000)