pm2-bunyan-gelf
=================

Library for redirect your [PM2](http://pm2.io) logs to a [GELF](http://docs.graylog.org/en/latest/pages/gelf.html) input stream

* Heavily based on [https://github.com/cliv/pm2-gelf](https://github.com/cliv/pm2-gelf)
* Uses [https://github.com/robertkowalski/gelf-node](https://github.com/robertkowalski/gelf-node) to output to GELF

## Installation

Requires PM2.

```sh
  pm2 install pm2-bunyan-gelf
```

## Configuration

This module has multiple configuration variables, all fed into gelf-node

- "graylogPort": The UDP port to send gelf messages to (Default: 12201)
- "graylogHostname": The hostname of the GELF input (Default: '127.0.0.1')
- "connection": Lan or Wan - The connection type (Default: 'wan')
- "maxChunkSizeWan": The largest chunk to send via WAN (Default: 1420)
- "maxChunkSizeLan": The largest chunk to sent via LAN (Default: 8154)


After having installed the module:

```sh
  pm2 set pm2-bunyan-gelf:<param> <value>
```

Examples:

```sh
  pm2 set pm2-bunyan-gelf:graylogHostname example.com
  pm2 set pm2-bunyan-gelf:graylogPort 12345
```