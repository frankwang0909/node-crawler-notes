var fs = require('fs');

var Crawler = require("crawler");

var datas = [];
var c = new Crawler({
    encoding:null,
    // jQuery:false,// set false to suppress warning message.
    callback:function(err, res, done){
        if(err){
            console.error(err.stack);
        }else{
            var $ = res.$;
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
            json.title = $('.title_wrapper').find('h1').text().trim().slice(0,-7);
            json.release = $('#titleYear').text().trim().slice(1,5);
            json.rating =  $('.ratingValue').find('span[itemprop="ratingValue"]').text().trim();
            datas.push(json);
            console.log(datas);
        }

        // To write to the system we will use the built in 'fs' library.
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  output.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function

        fs.writeFile('output.json', JSON.stringify(datas, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the output.json file');
        });
	    
        done();
    }
});

c.queue([
    "http://www.imdb.com/title/tt0364725/",
    "http://www.imdb.com/title/tt1229340/",
    "http://www.imdb.com/title/tt0196229/",
    "http://www.imdb.com/title/tt0196228/",
    "http://www.imdb.com/title/tt0445934/"
]);