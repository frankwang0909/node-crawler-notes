var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("http://www.buzzfeed.com", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);
  console.log($.text());
  $('.card--article').each(function( index ) {
    var title = $(this).find('h2').text().trim();
    var author = $(this).find('.xs-hide>a>span.xs-text-6').text().trim();
    var link  = $(this).find('a.link-gray').attr('href');
    console.log(title);
    console.log(author);
    console.log(link);
    fs.appendFileSync('buzzfeed.txt', title + '\n' + author + '\n' + link + '\n');
  });

});