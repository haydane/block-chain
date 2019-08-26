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
        return new Block(0,Date.now(),"Genesis Block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i = 1 ; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true;
        }
    }
}

router.get('/',(req,res) => {
    let coin = new BlockChain();
    coin.addBlock(new Block(1,Date.now(),{amount: 4}));
    coin.addBlock(new Block(2,Date.now(),{amount: 7}));
    coin.addBlock(new Block(2,Date.now(),{amount: 10}));
    coin.addBlock(new Block(2,Date.now(),{amount: 30}));
    // coin.chain[1].data = {amount: 400};
    console.log(`Is BlockChain valid?`, coin.isChainValid());
    res.status(200).json({
        body: coin
    });
});

module.exports = router;