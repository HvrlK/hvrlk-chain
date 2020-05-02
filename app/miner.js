const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet'); 

class Miner {
  constructor(blockchian, transactionPool, wallet, p2pServer) {
    this.blockchian = blockchian;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    validTransactions.push(
      Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
    );
    const block = this.blockchian.addBlock(validTransactions);
    this.p2pServer.syncChains()
    this.transactionPool.clear()
    this.p2pServer.broadcastClearTransactions();

    return block;
  }
}

module.exports = Miner;