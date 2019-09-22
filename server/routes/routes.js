const { Router } = require('express')
const viewArea = require('../controllers/urbanAreaScores')
const {weatherDetail, createState, safetyDetail, commuteDetail, educationDetail, taxationDetail, costOfLivingDetail, leisureDetail, economyDetail} = require('../controllers/urbanAreaDetails')

const apiRouter = Router();

apiRouter.post('/create', createState)

apiRouter.get('/:city/:state', viewArea )
apiRouter.get('/:city/:state/safety', safetyDetail)
apiRouter.get('/:city/:state/commute', commuteDetail)
apiRouter.get('/:city/:state/education', educationDetail)
apiRouter.get('/:city/:state/economy', economyDetail)
apiRouter.get('/:city/:state/taxation', taxationDetail)
apiRouter.get('/:city/:state/costOfLiving', costOfLivingDetail)
apiRouter.get('/:city/:state/leisure', leisureDetail)
apiRouter.get('/:city/:state/weather', weatherDetail)

module.exports = apiRouter;
