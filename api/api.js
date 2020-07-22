"use strict";
const express = require('express');
const request = require('request');
const sleep = require('system-sleep');
const fs = require('fs');
const pandacoinApi = require('pandacoin-api');
const deviantcoinApi = require('deviantcoin-api');
const lynxApi = require('lynx-api');
const blocknetApi = require('blocknet-api');
const cypherfunkApi = require('cypherfunk-api');
var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.set('content-type', 'application/json')
  next();
});

app.get('/', (req, res) => {
  res.redirect('https://cryptodepot.org/multiwallet/')
});

// Coin API
var pandacoin = {
  host: 'server1.cryptodepot.org', // RPC Address
  port: 10001, // RPC port
  user: 'pandacoinuser', // RPC Username
  pass: '' // RPC Password
};

var cypherfunk = {
  host: 'cryptodepot.org', // RPC Address
  port: 20001, // RPC port
  user: 'Cypherfunkrpc', // RPC Username
  pass: '' // RPC Password
};

var deviantcoin = {
  host: 'localhost', // RPC Address
  port: 9000, // RPC Port
  user: 'nservuser001', // RPC Username
  pass: '' // RPC Password
};

var lynx = {
    host: 'localhost', // RPC Address
    port: 9002, // RPC Port
    user: 'mintcoinrpc', // RPC Username
    pass: '' // RPC Password
  };

var blocknet = {
    host: 'localhost', // RPC Address
    port: 9004, // RPC Port
    user: 'blocknetrpc', // RPC Username
    pass: '' // RPC Password
  };

pandacoinApi.setWalletDetails(pandacoin);
pandacoinApi.setAccess('only', ['getinfo', 'sendrawtransaction']);
app.use('/c/pandacoin', pandacoinApi.app);

cypherfunkApi.setWalletDetails(cypherfunk);
cypherfunkApi.setAccess('only', ['getinfo', 'sendrawtransaction']);
app.use('/c/cypherfunk', cypherfunkApi.app);

deviantcoinApi.setWalletDetails(deviantcoin);
deviantcoinApi.setAccess('only', ['getinfo', 'sendrawtransaction']);
app.use('/c/deviantcoin', deviantcoinApi.app);

blocknetApi.setWalletDetails(blocknet);
blocknetApi.setAccess('only', ['getwalletinfo','getblockchaininfo', 'sendrawtransaction']);
app.use('/c/blocknet', blocknetApi.app);

lynxApi.setWalletDetails(lynx);
lynxApi.setAccess('only', ['getwalletinfo','getblockchaininfo', 'sendrawtransaction']);
app.use('/c/lynx', lynxApi.app);

// Chainz API Balance, List Unspent & Broadcast
app.get('/chainz/balance/:coinname/:address', (req, res) => {
  request(
    { url: 'https://chainz.cryptoid.info/' + req.params.coinname + '/api.dws?q=getbalance&key=1a9c92c7492b&a='+ req.params.address+ ''},
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }
      res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
    )
  });
  app.get('/chainz/listunspent/:coinname/:address', (req, res) => {
    request(
      { url: 'https://chainz.cryptoid.info/' + req.params.coinname +'/api.dws?q=unspent&key=1a9c92c7492b&active='+ req.params.address+ ''},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error });
        }
        res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
    )
  });

// CoinExplorer API Balance, ListUnspent
  app.get('/coinexplorer/balance/:coinname/:address', (req, res) => {
    request(
      { url: 'https://www.coinexplorer.net/api/v1/' + req.params.coinname +'/address/balance?address='+ req.params.address+ ''},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error });
        }
        res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
    )
  });

  app.get('/coinexplorer/listunspent/:coinname/:address', (req, res) => {
    html="";
    request(
      { url: 'https://www.coinexplorer.net/api/v1/'+ req.params.coinname +'/address/unspent?address=' + req.params.address + ''},
      (error, response, body) => {
        var results = new Array();
        JSON.parse(body).result.forEach(obj => {
          sleep(2*1000);
          Object.entries(obj).forEach(([key, value]) => {
            if(key==='txid') {
            request(
              { url: 'https://www.coinexplorer.net/api/v1/'+ req.params.coinname +'/transaction?txid=' + value + ''},
              (error, response, body) => {
                if (error || response.statusCode !== 200) {
                  return res.status(500).json({ type: 'error', message: error });
                }
                results.push(JSON.stringify(JSON.parse(body)));
              }
            )
          }
          });
        });
        sleep(3*1000);
        res.send(results, null, 2);
      }
    )
  });

  /* Chain.so Listunspent https://chain.so/api/v2/get_tx_unspent/"+network+"/"
  */

  // AIASCoin broadCast
  app.get('/aiascoin/broadcast/:txhex', (req, res) => {
    request.post({
    url: 'https://www.aiaschain.com/api/sendrawtransaction',
    body: {rawtx: req.params.txhex},
    json: true
  }, function(error, response, body){
    res.send(body.raw);
  });
});

// Qtum Listunspent, Balance, broadCastTitleapp.get('/qtum/balance/:address', (req, res) => {
  app.get('/qtum/balance/:address', (req, res) => {
      request(
        { url: 'https://explorer.qtum.org/insight-api/addr/'+ req.params.address +'/balance'},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error });
          }
          res.send(JSON.stringify(JSON.parse(body), null, 2));
        })
    });

  app.get('/qtum/listunspent/:address', (req, res) => {
    request(
      { url: 'https://explorer.qtum.org/insight-api/addr/'+ req.params.address +'/utxo'},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error });
        }
        res.send(JSON.stringify(JSON.parse(body), null, 2));
      })
  });

  app.get('/qtum/broadcast/:txhex', (req, res) => {
    request.post({
      url: 'https://explorer.qtum.org/insight-api/tx/send',
      body: {rawtx: req.params.txhex},
      json: true
    }, function(error, response, body){
      res.send(body);
    });
  });

// Viacoin Listunspent, Balance & Broadcast API
  app.get('/viacoin/balance/:address', (req, res) => {
      request(
        { url: 'https://explorer.viacoin.org/api/addr/'+ req.params.address +'/balance'},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error });
          }
          res.send(JSON.stringify(JSON.parse(body), null, 2));
        }
      )
    });

  app.get('/viacoin/listunspent/:address', (req, res) => {
    request(
      { url: 'https://explorer.viacoin.org/api/addr/'+ req.params.address +'/utxo'},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error });
        }
        res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
    )
  });

  app.get('/viacoin/broadcast/:txhex', (req, res) => {
    request.post({
      url: 'https://explorer.viacoin.org/api/tx/send',
      body: {rawtx: req.params.txhex},
      json: true
    }, function(error, response, body){
      res.send(body);
    });
  });

// Auroracoin Listunspent, Balance & Broadcast API
  app.get('/auroracoin/balance/:address', (req, res) => {
      request(
        { url: 'http://insight.auroracoin.is/api/addr/'+ req.params.address +'/balance'},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error });
          }
          res.send(JSON.stringify(JSON.parse(body), null, 2));

        }
      )
    });

  app.get('/auroracoin/listunspent/:address', (req, res) => {
    request(
      { url: 'http://insight.auroracoin.is/api/addr/'+ req.params.address +'/utxo'},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error });
        }
        res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
    )
  });

  app.get('/aurora/broadcast/:txhex', (req, res) => {
    request.post({
      url: 'http://insight.auroracoin.is/api/tx/send',
      body: {rawtx: req.params.txhex},
      json: true
    }, function(error, response, body){
      res.send(body);
    });
  });

// Axe Listunspent, Balance & Broadcast API
  app.get('/axecore/balance/:address', (req, res) => {
      request(
        { url: 'https://insight.axecore.net/insight-api/addr/'+ req.params.address +'/balance'},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error });
          }
          res.send(JSON.stringify(JSON.parse(body), null, 2));
        }
      )
    });

  app.get('/axecore/listunspent/:address', (req, res) => {
    request(
      { url: 'https://insight.axecore.net/insight-api/addr/'+ req.params.address +'/utxo'},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error });
        }
        res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
    )
  });

  app.get('/axecore/broadcast/:txhex', (req, res) => {
    request.post({
      url: 'https://insight.axecore.net/insight-api/tx/send',
      body: {rawtx: req.params.txhex},
      json: true
    }, function(error, response, body){
      res.send(body);
    });
  });
// Pirate Chain Listunspent, Balance & Broadcast API
  app.get('/piratechain/balance/:address', (req, res) => {
      request(
        { url: 'https://explorer.pirate.black/insight-api-komodo/addr/'+ req.params.address +'/balance'},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error });
          }
          res.send(JSON.stringify(JSON.parse(body), null, 2));
        }
      )
    });

  app.get('/piratechain/listunspent/:address', (req, res) => {
    request(
      { url: 'https://explorer.pirate.black/insight-api-komodo/addr/'+ req.params.address +'/utxo'},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error });
        }
        res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
    )
  });

  app.get('/piratechain/broadcast/:txhex', (req, res) => {
    request.post({
      url: 'https://explorer.pirate.black/insight-api-komodo/tx/send',
      body: {rawtx: req.params.txhex},
      json: true
    }, function(error, response, body){
      res.send(body);
    });
  });

// Blocknet Broadcast API
  app.get('/blocknet/broadcast/:txhex', (req, res) => {
        request.get({
          url: `https://api.cryptodepot.org/c/blocknet/sendrawtransaction?hex=${req.params.txhex}`,
          json: true
        }, function(error, response, body){
          res.send(body);
          });
      });

// Pandacoin Broadcast API
  app.get('/pandacoin/broadcast/:txhex', (req, res) => {
      request.get({
          url: `https://api.cryptodepot.org/c/pandacoin/sendrawtransaction?hex=${req.params.txhex}`,
          json: true
          }, function(error, response, body){
            res.send(body);
          });
      });

// Lynx Broadcast
  app.get('/lynx/broadcast/:txhex', (req, res) => {
        request.get({
          url: `https://api.cryptodepot.org/c/lynx/sendrawtransaction?hex=${req.params.txhex}`,
          json: true
        }, function(error, response, body){
          res.send(body);
          });
      });

// Dash Broadcast
  app.get('/dash/broadcast/:txhex', (req, res) => {
      request.post({
        url: 'https://insight.dash.org/insight-api/tx/send',
        body: {rawtx: req.params.txhex},
        json: true
      }, function(error, response, body){
        console.log(body.txid);
        res.send(body.txid);
      });
    });

// Syscoin broadCast
  app.get('/syscoin/broadcast/:txhex', (req, res) => {
        request.get({
          url: `https://sys1.bcfn.ca/api/v2/sendtx/${req.params.txhex}`,
          json: true
        }, function(error, response, body){
          res.send(body.result);
          });
      });

// DigitByte Broadcast
app.get('/digibyte/broadcast/:txhex', (req, res) => {
  request.post({
    url: 'https://digiexplorer.info/api/tx/send',
    body: {rawtx: req.params.txhex},
    json: true
  }, function(error, response, body){
    res.send(body);
  });
});

// Pandacoin Broadcast API
  app.get('/cypherfunk/broadcast/:txhex', (req, res) => {
      request.get({
          url: `https://api.cryptodepot.org/c/cypherfunk/sendrawtransaction?hex=${req.params.txhex}`,
          json: true
          }, function(error, response, body){
            console.log(body);
            res.send(body);
          });
      });

// chainso Listunspent &  Broadcast
app.get('/chainso/listunspent/:network/:address', (req, res) => {
  request.get({
    url: 'https://sochain.com/api/v2/get_tx_unspent/'+req.params.network+'/'+req.params.address,
    json: true
  }, function(error, response, body){
    res.send(body);
  });
});

app.get('/chainso/broadcast/:network/:txhex', (req, res) => {
    request.post({
    url: 'https://sochain.com/api/v2/send_tx/'+req.params.network+'',
    body: {"tx_hex":req.params.txhex},
    json: true
  }, function(error, response, body){
    if(body.status=="fail") {
      res.send(body.data.tx_hex);
    } else {
      res.send(body.data.txid);
    }
  });
});

// Komodo Listunspent, Balance & Broadcast
app.get('/komodo/balance/:address', (req, res) => {
  request(
    { url: 'https://kmdexplorer.io/insight-api-komodo/addr/'+ req.params.address +'/balance'},
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }
      res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
  )
});

app.get('/komodo/listunspent/:address', (req, res) => {
  request(
    { url: 'https://kmdexplorer.io/insight-api-komodo/addr/'+ req.params.address +'/utxo'},
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }
      res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
  )
});

app.get('/komodo/broadcast/:txhex', (req, res) => {
  request.post({
    url: 'https://kmdexplorer.io/insight-api-komodo/tx/send',
    body: {rawtx: req.params.txhex},
    json: true
  }, function(error, response, body){
    res.send(body);
    });
});

// peercoin broadCast
app.get('/peercoin/broadcast/:txhex', (req, res) => {
      request.get({
        url: `https://blockbook.peercoin.net/api/v2/sendtx/${req.params.txhex}`,
        json: true
      }, function(error, response, body){
        console.log(body);
        res.send(body);
        });
    });

//  Status Indication
  app.get('/status', (req, res) => {
    res.send('true');
  });

module.exports = app;
