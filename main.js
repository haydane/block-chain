const express = require('express');
const bdps = require('body-parser');
const app = express();

app.use(bdps.json());

const blockChainRouter = require('./routes/blockChainRouter');
app.use('/',blockChainRouter);

app.listen(3000,()=>{
    console.log('server is listening on port 3000');
});