var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var subReddit = "ShowerThoughts";

request("https://www.reddit.com/r/" + subReddit + "/top/?limit=100&t=month&sort=top&count=0", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);


$('div#siteTable > div.link').each(function( index ) {
    var title = $(this).find('p.title > a.title').text().trim();
    fs.appendFileSync(subReddit + '-reddit.txt', title + '\n');
  });

});
