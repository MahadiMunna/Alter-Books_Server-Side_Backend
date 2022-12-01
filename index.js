const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    res.send('Alter books server is running')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vivqooe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        const writerCollection = client.db('alterBooks').collection('writers');

        app.get('/writers',async(req,res)=>{
            const query = {};
            const writers = await writerCollection.find(query).toArray();
            res.send(writers);
        })

    }finally{

    }
}
run().catch(console.log)




app.listen(port,()=>console.log(`Alter books serve running on ${port}`))