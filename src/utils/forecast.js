const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/0336df0e7172e30b1c92ab7dfdcc5c76/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      console.log(body.daily.data[0])
      const temp = body.currently.temperature
      const precipProb = body.currently.precipProbability
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + precipProb + '% chance of rain.')
    }
  })
}

module.exports = forecast
