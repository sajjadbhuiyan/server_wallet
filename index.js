const express = require('express');

const { MongoClient, Compressor } = require('mongodb');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zl5hq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        // console.log('database connocet wow wow');
        const database = client.db('wallet');
        const productsCollection = database.collection('products');

        //GET product API
        app.get('/products', async(req, res) =>{
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('Waller server is Runnig');
});

app.listen(port, ()=>{
    console.log('listening to port', port);
});