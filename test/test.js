var assert = require('assert');
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'http://localhost'

describe('Examples Tests', async function() {
  it('example1', async function() {
    const code = fs.readFileSync(path.join(__dirname, 'example1.R'), 'utf8')
    const res = await axios.post(`${HOST}:${PORT}`, code)
    return res.data.includes('[1] 4')
  });
});