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