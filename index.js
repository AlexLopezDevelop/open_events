const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const openeventRouter = require('./routes/openevent')

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
