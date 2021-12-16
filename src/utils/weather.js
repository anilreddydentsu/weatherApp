const request = require('postman-request');

const getGio = (address, callback) => {
    const gio = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW5pbGdoYWppbmkwMDciLCJhIjoiY2t4NjVmbW0zMThmZDJ1bngwdnJybnB3ZSJ9.6rGPxxTYjNKwuyRRvsEtiA&limit=1';
    request(gio, function (error, response, body) {
        var jsonData = JSON.parse(body);
        var lat = jsonData.features[0].center[1];
        var lang = jsonData.features[0].center[0];
        callback(lat, lang);
    });
}

const getWeather = (lat, lang, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=99b0766ecd732d68fb17eedf476f752b&query='+lat+','+lang+'&units=f';
    request(url, function (error, response, body) {
        var jsonData = JSON.parse(body);
        callback('Current tempcture is: ' + jsonData.current.temperature + '. It seems:' + jsonData.current.weather_descriptions.join());
    });
}

module.exports = {
    getGio,
    getWeather
}