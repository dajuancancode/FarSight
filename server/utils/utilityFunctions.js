const axios = require('axios')

const getUrbanAreaID = async (req, res) => {
    const location = encodeURIComponent(`${req.params.city}, ${req.params.state}`)
    const {data: cityInfo} = await axios({url: `https://api.teleport.org/api/cities/?search=${location}&limit=1`, method: 'get'})
    const cityURL = cityInfo["_embedded"]["city:search-results"][0]["_links"]["city:item"].href
    const {data: cityDetails} = await axios({url: `${cityURL}`, method: 'get'})
    
    const urbanAreaURL = cityDetails["_links"]["city:urban_area"].href
    const {data: urbanAreaDetails} = await axios({url: `${urbanAreaURL}`, method: 'get'})

    return urbanAreaDetails["ua_id"]
}

module.exports = { getUrbanAreaID }