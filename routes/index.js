const openeventRouter = require('express').Router()
const UserRouter = require('./user')
const EventRouter = require('./event')
const AssistanceRouter = require('./assistance')
const messageRouter = require('./message')
const friendRouter = require('./friend')

openeventRouter.use('/user', UserRouter)
openeventRouter.use('/event', EventRouter)
openeventRouter.use('/assistance', AssistanceRouter)
openeventRouter.use('/message', messageRouter)
openeventRouter.use('/friend', friendRouter)

module.exports = openeventRouter
