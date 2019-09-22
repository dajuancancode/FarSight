const axios = require('axios')
const { getUrbanAreaID } = require('../utils/utilityFunctions')
const { State } = require('../models/state')


const createState = async (req, res) => {
    const state = new State(req.body)
    
    try {
      await state.save()
      
      res.status(201).send({state})
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
  }

const safetyDetail = async (req, res) => {
    const urbanAreaID = await getUrbanAreaID(req, res)
    
    const urbanAreaDetailsUrl = `https://api.teleport.org/api/urban_areas/teleport:${urbanAreaID}/details/`
    const {data: {categories: urbanAreaDetails}} = await axios({url: urbanAreaDetailsUrl, method: "get"})

    const safetyDetails = urbanAreaDetails[16].data

    const crimeRate = `${(safetyDetails[0]["float_value"]*100).toFixed(2)} per 1000 residents`
    const gunDeathRate = `${(safetyDetails[1]["int_value"])} per 100,000 residents`
    const gunOwnership = `${(safetyDetails[3]["int_value"]).toFixed(2)} per 100 residents`

    res.send({crimeRate, gunDeathRate, gunOwnership})
}

const commuteDetail = async (req, res) => {
    const urbanAreaID = await getUrbanAreaID(req, res)
    
    const urbanAreaDetailsUrl = `https://api.teleport.org/api/urban_areas/teleport:${urbanAreaID}/details/`
    const {data: {categories: urbanAreaDetails}} = await axios({url: urbanAreaDetailsUrl, method: "get"})

    

    const costOfBusPass = urbanAreaDetails[3].data[7]["currency_dollar_value"]
    const trafficScore = (urbanAreaDetails[19].data[1]["float_value"] * 100).toFixed(2)
    const airportHubScore = (urbanAreaDetails[20].data[1]["float_value"] * 100).toFixed(2)
    const trainTransportScore = (urbanAreaDetails[20].data[2]["float_value"] * 100).toFixed(2)

    res.send({costOfBusPass, trafficScore, airportHubScore, trainTransportScore})
}

const educationDetail = async (req, res) => {
    const urbanAreaID = await getUrbanAreaID(req, res)
    
    const urbanAreaDetailsUrl = `https://api.teleport.org/api/urban_areas/teleport:${urbanAreaID}/details/`
    const {data: {categories: urbanAreaDetails}} = await axios({url: urbanAreaDetailsUrl, method: "get"})

    const educationDetails = urbanAreaDetails[6].data

    const percentOfHappyStudents = (educationDetails[0]["percent_value"] * 100).toFixed(2)
    const percentTopPerformersMath = (educationDetails[1]["percent_value"] * 100).toFixed(2)
    const percentTopPerformersReading = (educationDetails[4]["percent_value"] * 100).toFixed(2)
    const percentTopPerformersScience = (educationDetails[7]["percent_value"] * 100).toFixed(2)
    const bestUniversity = educationDetails[16]["string_value"]
    const univeristyRanking = educationDetails[17]["int_value"]

    res.send({ percentOfHappyStudents, percentTopPerformersMath, percentTopPerformersReading, percentTopPerformersScience, bestUniversity, univeristyRanking })
}

const taxationDetail = async (req, res) => {
    const urbanAreaID = await getUrbanAreaID(req, res)
    
    const urbanAreaDetailsUrl = `https://api.teleport.org/api/urban_areas/teleport:${urbanAreaID}/details/`
    const {data: {categories: urbanAreaDetails}} = await axios({url: urbanAreaDetailsUrl, method: "get"})

    const taxationDetails = urbanAreaDetails[18].data

    const salesTax = (taxationDetails[3]["percent_value"]*100).toFixed(2)
    const state = await State.findOne({ name: "Florida"})
    const stateTax = state.stateTax.toFixed(2)

    res.send({salesTax, stateTax})
}

const costOfLivingDetail = async (req, res) => {
    const urbanAreaID = await getUrbanAreaID(req, res)
    
    const urbanAreaDetailsUrl = `https://api.teleport.org/api/urban_areas/teleport:${urbanAreaID}/details/`
    const {data: {categories: urbanAreaDetails}} = await axios({url: urbanAreaDetailsUrl, method: "get"})

    const consumerPriceIndex = urbanAreaDetails[3].data[0]["float_value"]
    const rentOfLgApartment = urbanAreaDetails[8].data[0]["currency_dollar_value"]
    const rentOfMedApartment = urbanAreaDetails[8].data[1]["currency_dollar_value"]
    const rentOfSmApartment = urbanAreaDetails[8].data[2]["currency_dollar_value"]


    res.send({ consumerPriceIndex, rentOfLgApartment, rentOfMedApartment, rentOfSmApartment })
}

const leisureDetail = async (req, res) => {
    const urbanAreaID = await getUrbanAreaID(req, res)
    
    const urbanAreaDetailsUrl = `https://api.teleport.org/api/urban_areas/teleport:${urbanAreaID}/details/`
    const {data: {categories: urbanAreaDetails}} = await axios({url: urbanAreaDetailsUrl, method: "get"})

    const leisureDetails = urbanAreaDetails[4].data
    
    const numOfArtGalleries = leisureDetails[1]["int_value"]
    const numOfCinemas = leisureDetails[3]["int_value"]
    const numOfComedyClubs = leisureDetails[5]["int_value"]
    const numOfConcertVenues = leisureDetails[7]["int_value"]
    const numOfHistoricalSites= leisureDetails[9]["int_value"]
    const numOfMuseums = leisureDetails[11]["int_value"]
    const numOfPerformingArtVenues= leisureDetails[13]["int_value"]
    const numOfSportsVenues = leisureDetails[15]["int_value"]
    const numOfZoos = leisureDetails[17]["int_value"]

    res.send({ numOfArtGalleries, numOfCinemas, numOfComedyClubs, numOfConcertVenues, numOfHistoricalSites, numOfMuseums, numOfPerformingArtVenues, numOfSportsVenues, numOfZoos })
}

const economyDetail = async (req, res) => {
    const urbanAreaID = await getUrbanAreaID(req, res)
    
    const urbanAreaDetailsUrl = `https://api.teleport.org/api/urban_areas/teleport:${urbanAreaID}/details/`
    const {data: {categories: urbanAreaDetails}} = await axios({url: urbanAreaDetailsUrl, method: "get"})

    const economyDetails = urbanAreaDetails[5].data

    const gdpGrowthRate = (economyDetails[2]["percent_value"] * 100).toFixed(2)
    const gdpPerCapita = economyDetails[4]["currency_dollar_value"].toFixed(2)

    res.send({ gdpGrowthRate, gdpPerCapita })
}
const weatherDetail = async (req, res) => {
    const urbanAreaID = await getUrbanAreaID(req, res)
    
    const urbanAreaDetailsUrl = `https://api.teleport.org/api/urban_areas/teleport:${urbanAreaID}/details/`
    const {data: {categories: urbanAreaDetails}} = await axios({url: urbanAreaDetailsUrl, method: "get"})

    const weatherDetails = urbanAreaDetails[2].data
    
    const avgDayLength = weatherDetails[0]["float_value"]
    const avgNumOfClearDays = weatherDetails[1]["float_value"]
    const avgNumOfRainyDays = weatherDetails[2]["float_value"]

    const state = await State.findOne({name: `${req.params.state}`})
    const averageWeather = state.weather

    res.send({averageWeather, avgDayLength, avgNumOfClearDays, avgNumOfRainyDays})

}
module.exports = { weatherDetail, createState, safetyDetail, commuteDetail, educationDetail, taxationDetail, costOfLivingDetail, leisureDetail, economyDetail }