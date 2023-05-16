import request from 'postman-request';



export const forecast = (longitude, latitude, callback) => {
    const weatherurl = 'http://api.weatherstack.com/current?access_key=f40da06fd7c3e931428707fd10858d36&query=' + latitude + ',' + longitude + '&units=m'

    request({ url: weatherurl, json: true }, (error, { body } = {}) => {
        if (error) {
            console.log("Unable to connect to weather service!")
        } else if (body.error) {
            console.log("Unable to find to location!")
        }
        else {
            // console.log(body)
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                tempreture: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
            })

        }
    })
}