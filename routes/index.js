const openeventRouter = require('express').Router()
const UserRouter = require('./user')
const EventRouter = require('./event')
const AssistanceRouter = require('./assistance')
const messageRouter = require('./message')
const friendRouter = require('./friend')

openeventRouter.use('/users', UserRouter)
openeventRouter.use('/events', EventRouter)
openeventRouter.use('/assistances', AssistanceRouter)
openeventRouter.use('/messages', messageRouter)
openeventRouter.use('/friends', friendRouter)

module.exports = openeventRouter
