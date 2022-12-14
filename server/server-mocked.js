const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(function(req,res,next){setTimeout(next, getRandomInt(1200))});

app.get('/api/envs-config', (req, res) => {
  res.json(getConfig())
})

app.post('/api/send-request', bodyParser.json(), (req, res) => {
  const url = req.body.url || ''
  const response = url.indexOf('health') > -1 ? getHealth() : getInfo()
  res.json(response)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function getConfig() {
  return {
    "envs": [
      {
        "name": "environment1",
        "configUrl": "https://bitbucket.org/exampleai/environments/src/main/qa/qa-environment1",
        "services": [
          {
            "name": "file-manager",
            "branch": "develop",
            "appUrl": "https://file-manager.qa-environment1example.com",
            "appHealthUrl": "https://file-manager.qa-environment1example.com/meta/health",
            "appInfoUrl": "https://file-manager.qa-environment1example.com/meta/info",
            "repositoryUrl": "https://bitbucket.org/exampleai/file-manager/commits/branch/develop",
            "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/file-manager",
            "swaggerUrl": "https://file-manager.qa-environment1example.com/swagger-ui/index.html#"
          },
          {
            "name": "payment-gateway",
            "branch": "master",
            "appUrl": "https://payment-gateway.qa-environment1example-payroll-02example.com",
            "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/meta/health",
            "appInfoUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
            "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
            "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
            "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
          },
          {
            "name": "onboarding",
            "branch": "master",
            "appUrl": "https://payment-gateway.qa-environment1example-onboarding-02example.com",
            "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/me3ta/health",
            "appInfoUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
            "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
            "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
            "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
          },
          {
            "name": "notification-api",
            "branch": "master",
            "appUrl": "https://payment-gateway.qa-notification-02example.com",
            "appHealthUrl": "https://payment-gateway.qa-payroll-02exa1mple.com/meta/health",
            "appInfoUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
            "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
            "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
            "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
          },
          {
            "name": "document-manager",
            "branch": "master",
            "appUrl": "https://payment-gateway.qa-payroll-document.com",
            "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/4meta/health",
            "appInfoUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
            "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
            "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
            "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
          },
          {
            "name": "card-management-system",
            "branch": "master",
            "appUrl": "https://payment-gateway.qa-payroll-card.com",
            "appHealthUrl": "https://payment-gateway.qa-payrol5l-02example.com/meta/health",
            "appInfoUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
            "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
            "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
            "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
          },
        ]
      },
      {
        "name": "qa-environment2",
        "configUrl": "https://bitbucket.org/exampleai/environments/src/main/qa/qa-environment2",
        "services": [
          {
            "name": "payment-gateway",
            "branch": "master",
            "appUrl": "https://payment-gateway.qa-environment2-payroll-02example.com",
            "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/1meta/health",
            "appInfoUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
            "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
            "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
            "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
          },
          {
            "name": "file-manager",
            "branch": "develop",
            "appUrl": "https://file-manager.qa-payroll-02example.com",
            "appHealthUrl": "https://file-manager.qa-payroll-02example.com/meta/health",
            "appInfoUrl": "https://file-manager.qa-payroll-02example.com/meta/info",
            "repositoryUrl": "https://bitbucket.org/exampleai/file-manager/commits/branch/develop",
            "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/file-manager",
            "swaggerUrl": "https://file-manager.qa-payroll-02example.com/swagger-ui/index.html#"
          }
        ]
      },
      {
        "name": "qa-environment3",
        "configUrl": "https://bitbucket.org/exampleai/environments/src/main/qa/qa-environment3",
        "services": [
          {
            "name": "payment-gateway",
            "branch": "master",
            "appUrl": "https://payment-gateway.qa-environment3example.com",
            "appHealthUrl": "https://payment-gateway.qa-environment3example.com/meta/health",
            "appInfoUrl": "https://payment-gateway.qa-environment3example.com/meta/info",
            "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
            "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
            "swaggerUrl": "https://payment-gateway.qa-environment3example.com/swagger-ui/index.html#"
          }
        ]
      }
    ]
  }
}

function getHealth() {
  const ok = {
    success: true, body: {
      "status": "UP",
      "groups": [
        "liveness",
        "readiness"
      ]
    }
  }
  const error = {success: false, error: {"message": "service unavailable"}}
  return getRandomItem([ok, error])
}

function getInfo() {
  const ok = {
    success: true, body: {
      "git": {
        "branch": getRandomItem(["develop", "master","feature","bugfix","release"], [4, 2, 2, 1, 4]),
        "commit": {
          "id": "ee88" + Math.floor(Math.random() * 10000),
          "time": new Date().toISOString()
        }
      },
      "build": {
        "artifact": "application",
        "name": "application",
        "time": "2022-08-29T11:41:54.530Z",
        "version": "1.0-SNAPSHOT",
        "group": "com.example"
      }
    }
  }
  const error = {success: false, error: {"message": "service unavailable"}}
  return getRandomItem([ok, error], [5, 1])
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getRandomItem = (arr, probs) => {
  if (probs && probs.length === arr.length) {
    const randomNumber = getRandomInt(10000);
    const sumOfProbs = probs.reduce((x, y, index) => x + y, 0);
    let weights = [];

    for (let i = 0; i < probs.length; i++) {
      const prevElem = i > 0 ? weights[i - 1] : 0;
      const resultElement = (10000 / sumOfProbs * probs[i]) + prevElem;
      weights.push(resultElement);
    }

    return arr.find((element, index) => {
      const min = index > 0 ? weights[index - 1] : 0;
      return (min < randomNumber && weights[index] > randomNumber);
    });
  }
  return arr[getRandomInt(arr.length)];

}


