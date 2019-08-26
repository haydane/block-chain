const express = require('express');
const router = express.Router();
const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(index,timestamp,data,previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2017","Genesis Block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

router.get('/',(req,res) => {
    let coin = new BlockChain();
    coin.addBlock(new Block(1,"10/01/2019",{amount: 4}));
    coin.addBlock(new Block(2,"13/01/2019",{amount: 7}));
    coin.addBlock(new Block(2,"16/01/2019",{amount: 10}));
    coin.addBlock(new Block(2,"19/02/2019",{amount: 30}));
    res.status(200).json({
        body: {
            data: coin
        }
    });
});

module.exports = router;