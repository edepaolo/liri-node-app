require("dotenv").config();

var keys = require("./keys");

// var spotify = new Spotify(keys.spotify);

// var Spotify = require('node-spotify-api');

var axios = require('axios');

var moment = require('moment');

var fs = require('fs');

var liri = {
    'concert-this': function (artist) {
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
            .then(response => {
                for (var i = 0; i < response.data.length; ++i) {
                    var data = response.data[i];
                    var venue = data.venue;
                    console.log('this function works')
                    console.log('Venue Name: ' + venue.name);
                    console.log('City: ' + venue.city + ',' + venue.region);
                    console.log('Date: ' + moment(data.datetime).format('MM/DD/YY'));
                }
            });
    },
    
    runCommand: function (str) {
        var commaIndex = str.indexOf(',');
        var command, param;
        
        if (commaIndex > -1) {
            command = str.slice(0, commaIndex);
            param = str.slice(commaIndex + 1);
        } else command = str;
        console.log(command);
        this[command](param);
        
    }
}
liri.runCommand(process.argv.slice(2).join(','));