const express = require('express');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app =  express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`)

  p2pServer.syncChains();

  res.redirect('/blocks');
});

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();