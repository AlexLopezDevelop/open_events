const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const openeventRouter = require('./routes/index.js')

const port = 3000
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Open Events API',
            description: 'Open Events API',
            contact: {
                name: 'Open Events API'
            },
            servers: [`http://localhost:${port}`]
        }
    },
    apis: ['./routes/*.js']
}
const swaggerDocs = swaggerJsdoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(openeventRouter)
app.use(express.json())

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

module.exports = app;
