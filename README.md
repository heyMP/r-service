# r-service
Microservice for running r code.

## Usage

Start the docker container that is running the r-service on port 3000
```
docker run -p 3000:3000 heymp/r-service
```

Add an example R file
```
touch example.R
echo "a <- 2
b <- 2
print(a + b)" >> example.R
```

Curl the endpoint with r-code to process
```
curl -X POST --data-binary @example.R http://localhost:3000
```

You should see the following output
```
[1] 4
```

## Development

```
git clone https://github.com/heyMP/r-service.git
cd r-service
docker-compose up --build
``
