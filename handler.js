"use strict"
const cors = require('cors')
const cp =  require('child_process')
const fs = require('fs')

module.exports = async (config) => {
  const routing = new Routing(config.app);
  routing.configure();
  routing.bind(routing.handle);
}

class Routing {
  constructor(app) {
    this.app = app;
  }

  configure() {
    const bodyParser = require('body-parser')
    this.app.use(cors())
    this.app.use(bodyParser.text({ type : "*/*" }));
    this.app.disable('x-powered-by');          
  }

  bind(route) {
    this.app.post('/*', route);
    this.app.get('/*', route);
    this.app.patch('/*', route);
    this.app.put('/*', route);
    this.app.delete('/*', route);
  }

  async handle(req, res) {
    if (req.body && typeof req.body === 'string') {
      fs.writeFileSync('/tmp/code.r', req.body, 'utf8')
      const spawn = cp.spawnSync('r', ['/tmp/code.r']) 
      res.send(spawn.output.toString())
    }
    else {
      res.send(`No code found.`)
    }
  }
}