require("dotenv").config();

var keys = require("./keys");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

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
    'spotify-this-song': function (song) {
        if (!song) song = 'Jopping';
        spotify.search({type:'track', query: song}, (err,data) => {
            if(err) return console.log('An error has occured: ' + err);
            var artistNames = new Set();
            var item = data.track.items[0];
            var artists = item.artists;
            var songName = item.name;
            var url = item.external_urls.spotify;
            var albumName = item.album.name;
            for (var j = 0; j < artists.length; ++j) {
                artistNames.add(artists[j].name);
            }
            console.log('Artists: ' + Array.from(artistNames).join(','));
            console.log('Name: ' + songName);
            console.log('Preview link: ' + url);
            console.log('Album name: ' + albumName);
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