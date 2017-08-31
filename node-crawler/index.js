

var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 10,
   // rateLimit: 1000, // `maxConnections` will be forced to 1
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());

            // access variables from previous request/response session
            if (res.options.parameter1) {
                console.log(res.options);
                console.log(res.options.parameter1);
            }
        }
        done();
    }
});

// Queue just one URL, with default callback
c.queue('http://www.amazon.com');

// Queue a list of URLs
c.queue(['http://www.qq.com/','http://www.yahoo.com']);

// Queue URLs with custom callbacks & parameters
c.queue([{
    uri: 'https://slimerjs.org/',
    jQuery: false,

    // The global callback won't be called
    callback: function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            console.log('Grabbed', res.body.length, 'bytes');
        }
        done();
    }
}]);

// Queue some HTML code directly without grabbing (mostly for tests)
c.queue([{
    html: '<p>This is a <strong>test</strong></p>'
}]);


c.queue({
    uri:"http://www.baidu.com",
    parameter1:"value1",
    parameter2:"value2",
    parameter3:"value3"
});

