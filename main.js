const express = require('express');
const http = require('http');
const mongodb = require('mongodb');
const randomstring = require('randomstring');

const app = express();
const server = http.createServer(app);
app.use(express.text({type: '*/*'}))
app.use(express.static(__dirname));

let database;
(async () => {
    const mongoClient = mongodb.MongoClient;
    const db = await mongoClient.connect('mongodb+srv://bozyusuf3548:mongo.yusuf@carparkcluster.cqbhk0m.mongodb.net/Logs');
    database = db.db('Logs');
})();


function urlShorter(urlAddress){
    app.get('/r/:code', async (req, res) => {
        const code = req.params.code;
        const result = await database.collection('urls').findOne({ code });
        res.redirect(result.url);
    });

    app.post('/r', async (req, res) => {
        const url = req.body;
        const code = randomstring.generate(7);
        const obj = { url, code};
        await database.collection(urlAddress).insertOne(obj);
        res.send(obj);
        factory.create(1,url)
    });

}

function urlLonger(urlAddress){

}

function urlFactory(){
    this.create = (urlAddress,type) => {
        switch(type){
            case 1:
                return new urlShorter(urlAddress)
                break;
            case 2:
                return new urlLonger(urlAddress)
                break;
        }     
    }
}

const factory = new urlFactory();



server.listen(80);

