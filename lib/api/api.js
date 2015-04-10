//http://api.bandsintown.com/artists/name.format

//http://api.bandsintown.com/artists/mbid_65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab?format=xml&api_version=2.0&app_id=YOUR_APP_ID

/*
HTTP.call("POST", "http://api.bandsintown.com/artists/",
    function (error, result) {
        if (!error) {
            Session.set("twizzled", true);
        }
    });

if (Meteor.isServer) {
    Meteor.methods({
        checkBands: function () {
            this.unblock();
            var result =  Meteor.http.call("GET", "http://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=Emoji_Nucleation");
            return result.content;
        }
    });
}

if (Meteor.isClient) {
    Meteor.call("checkBands", function(error, results) {
        if(!error) {
            console.log('no error');
            //console.log(results);
            var results = JSON.parse(results);
            Session.set('skrillex',results);
        } else {
            console.log('api returned error');
        }
    });
}
*/