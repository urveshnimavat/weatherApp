//token = pk.eyJ1IjoidXJ2ZXNobmltYXZhdCIsImEiOiJja2g5Z2Nnd3IwOGxzMzFwamZkMzEzcXZjIn0.FHzwHDU7-l6_W10x_KUtZA
const request = require('request');


const geocoding = (place, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ place +".json?access_token=pk.eyJ1IjoidXJ2ZXNobmltYXZhdCIsImEiOiJja2g5Z2Nnd3IwOGxzMzFwamZkMzEzcXZjIn0.FHzwHDU7-l6_W10x_KUtZA"
    request({url: url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to complete request. Try Again')
        }else if(response.body.features.length === 0 ){
            callback('Please enter valid address')
        }else if(response.body.message){
            callback(response.body.message)
        }else{
            const lat = response.body.features[0].center[1]
            const long = response.body.features[0].center[0]
    
            const result = {lat, long}

            callback(undefined, result)
        }
    })
}

const forecast = (lat, long, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&appid=e5806af75fea026de7d647794461b432"
    console.log(lat, long)
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to complete request. Try Again.')
            // console.log(error)
        }else{
            const temp= response.body.main.temp
            const desc=response.body.weather[0].main
            // console.log(response.body.current)

            const result={temp, desc}

            callback(undefined, result)
        }
    })
}

module.exports = {
    geocoding, forecast
}