const axios = require('axios')

const viewArea = async(req, res) => {
    try {
        const location = encodeURIComponent(`${req.params.city}, ${req.params.state}`)
        const {data: cityInfo} = await axios({url: `https://api.teleport.org/api/cities/?search=${location}&limit=1`, method: 'get'})
        const cityURL = cityInfo["_embedded"]["city:search-results"][0]["_links"]["city:item"].href
        const {data: cityDetails} = await axios({url: `${cityURL}`, method: 'get'})
        
        const urbanAreaURL = cityDetails["_links"]["city:urban_area"].href
        const {data: urbanAreaDetails} = await axios({url: `${urbanAreaURL}`, method: 'get'})
        const urbanAreaID = urbanAreaDetails["ua_id"]
        console.log(urbanAreaID)

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

module.exports = { viewArea }