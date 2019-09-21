const axios = require('axios')
const { getUrbanAreaID } = require('../utils/utilityFunctions')

const viewArea = async(req, res) => {
    try {
        
        const urbanAreaID = await getUrbanAreaID(req, res)

        const ubanAreaScoresURL = `https://api.teleport.org/api/urban_areas/teleport:${urbanAreaID}/scores/`
        const {data: urbanAreaScores} = await axios({url: ubanAreaScoresURL, method: 'get'})
        const [, costOfLiving, , , , commute, , safety, , education, , economy, taxation, , leisure] = urbanAreaScores.categories
        const urbanAreaScoresCategories = [ costOfLiving, commute, safety, education, economy, taxation, leisure]

        urbanAreaScoresCategories.forEach(category => {
            delete category.color
            category["score_out_of_10"] = Math.floor(category["score_out_of_10"])
        })
        res.send(urbanAreaScoresCategories)
    } catch {
        res.send({err: 'Could not fetch data'})
    }
}

module.exports = viewArea