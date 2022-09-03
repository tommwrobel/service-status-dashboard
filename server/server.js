const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const axios = require('axios').default;
const axiosLogger = require('axios-logger')
const yaml = require('js-yaml');
const {parseEnvsConfig} = require("./utls/envsConfigParser");

const app = express();
const PORT = process.env.PORT || 8080;
let envsConfig = null

axios.interceptors.request.use(axiosLogger.requestLogger)
axios.interceptors.response.use(axiosLogger.responseLogger);

app.use(cors());
app.use(express.static(__dirname + '/dist'));

app.post('/api/envs-config', bodyParser.text(), (req, res) => {
    const jsonConfig = yaml.load(req.body)
    envsConfig = parseEnvsConfig(jsonConfig)
    res.json(envsConfig)
})

app.get('/api/envs-config', (req, res) => {
    if (envsConfig) {
        return envsConfig;
    } else {
        const configYaml = yaml.load(fs.readFileSync(__dirname + '/services-config.yaml', 'utf8'));
        const parsedConfig = parseEnvsConfig(configYaml)
        res.json(parsedConfig)
    }
})

app.post('/api/send-request', bodyParser.json(), (req, res) => {
    const url = req.body.url || ''
    axios.get(url, {timeout: 5000})
        .then(response => res.json({success: true, body: response.data}))
        .catch(error => res.json({success: false, error}))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



