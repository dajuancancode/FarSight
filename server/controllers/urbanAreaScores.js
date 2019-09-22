const axios = require('axios')
const { getUrbanAreaID } = require('../utils/utilityFunctions')
const { NEWS_API_KEY } = process.env

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
        
        const location = encodeURIComponent(`${req.params.city}, ${req.params.state}`)
        const newsURL = `https://newsapi.org/v2/everything?q=${location}&apiKey=${NEWS_API_KEY}&pageSize=4`
        const {data : news} = await axios({url: newsURL, method:'get'})

        res.send({ urbanAreaScoresCategories, news})
    } catch {
        res.send({err: 'Could not fetch data'})
    }
}

module.exports = viewArea