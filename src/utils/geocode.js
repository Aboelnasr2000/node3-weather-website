import request from 'postman-request';

export const geocode = (address, callback) => {
    const geocodingurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWx5c3dpbW1lciIsImEiOiJjbGg5ZGhzc3kwNmozM2VudWxlZGR4Ynl2In0.Wk-rzah19jtix2FqPqzPNA&limit=1'
    request({ url: geocodingurl, json: true }, (error, { body } = {}) => {
        if (error) {

            callback('Unable to connect to weather service!', undefined)

        } else if ((body.features).length == 0) {

            callback('Unable to find to location! Try Another Search.', undefined)

        }
        else {

            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const placeName = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                placeName
            })

        }
    })
}