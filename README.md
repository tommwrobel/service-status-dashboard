Development

1. Start mocked server:
```
cd server
npm install
npm run dev
```

2. Start frontend app
``` 
cd client
npm install
npm run
```

Running app
1. Build image
```docker build . -t dashbaord```

2. Run app
```docker run -d -p 80:8080 --name dashboard dashboard```

Deploy process:
1. Copy image tag from build: `https://jenkins.tools.v2.symmetrical.ai/job/qa-builds/job/service-status-dashboard/`
2. Update and commit newTag to image tag here: `https://bitbucket.org/symmetricalai/environments/src/main/dev/service-status-dashboard/kustomization.yaml`
3. Wait up to 3min for automatic deploy. App url: `https://service-status-dashboard.dev.v2.symmetrical.ai/`
