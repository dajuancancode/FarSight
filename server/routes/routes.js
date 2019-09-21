const { Router } = require('express')
const { viewArea } = require('../controllers/urbanArea')

const apiRouter = Router();

apiRouter.get('/:city/:state', viewArea )

module.exports = apiRouter;