/* eslint-disable no-alert, no-console */
'use strict';
const pm2 = require('pm2');
const pmx = require('pmx');
const bunyan = require('./bunyan');
const os = require('os');
const hostname = os.hostname();

const conf = pmx.initModule();

var Gelf = require('gelf');
var gelf = new Gelf({
    graylogPort: conf.graylogPort,
    graylogHostname: conf.graylogHostname,
    connection: conf.connection,
    maxChunkSizeWan: conf.maxChunkSizeWan,
    maxChunkSizeLan: conf.maxChunkSizeLan,
});

function logToGelf(log) {
  if (log.process.name !== 'pm2-bunyan-gelf') {
    var message = bunyan(JSON.parse(log.data));
    gelf.emit('gelf.log', message);
  }
}

pm2.Client.launchBus(function(err, bus) {
  if (err) return console.error('PM2 Loggly:', err);

  console.log('PM2 BUNYAN GELF Connector: Bus connected, sending logs to ' + conf.graylogHostname + ':' + conf.graylogPort);

  bus.on('log:out', logToGelf);

  bus.on('log:err', logToGelf);

  bus.on('reconnect attempt', function() {
    console.log('PM2 GELF Connector: Bus reconnecting');
  });

  bus.on('close', function() {
    console.log('PM2 GELF Connector: Bus closed');
    pm2.disconnectBus();
  });
});
