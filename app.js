let express = require('express'),
    app = express(),
   
    PORT = process.env.PORT || 3300,
    path = require('path'),
    bodyParser = require('body-parser')

    var request = require('request');
    app.use(express.static("./public"))
   

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(path.resolve(__dirname + '/public/index.html'))
});


app.post('/', (req, res) => {
    let address = req.body.username;
    options = {
        url: `https://haveibeenpwned.com/api/breachedaccount/${address}`,
        headers:
        {
            'User-Agent': 'node-client'
        },
        json : true,
    }
    request.get(options, (err, res1, body) => {
                    
                        if (err) { return console.log(err); }
                             console.log(body);
                            // if(JSON.stringify(body)=="undefined")
                            // {
                            //     console.log("tested");
                            // }
                            if(body == undefined){
                                res.json("No");                                                                                                
                            }else{
                                
                                res.json(body);
                            }
                            
                        });
  
});


// app.get('*', (req, res) => {
// res.status(404)
// res.json({
//     error: 1,
//     msg: 'Invalid'
//     });
// });


app.listen(PORT, err => {
    if (err) return console.log(err)
    console.log(`server running at ${PORT}`)
});