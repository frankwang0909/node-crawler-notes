var fs = require('fs');

var Crawler = require("crawler");

var c = new Crawler({
    encoding:null,
    jQuery:false,// set false to suppress warning message.
    callback:function(err, res, done){
        if(err){
            console.error(err.stack);
        }else{
            fs.createWriteStream(res.options.filename).write(res.body);
        }
	    
        done();
    }
});

c.queue({
    uri:"https://www.zhihu.com/search?type=content&q=nodejs",
    filename:"nodejs.txt"
});