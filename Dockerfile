FROM rocker/verse

# install R package dependencies
RUN apt-get update && apt-get install -y \
    gcc gsl-bin libblas-dev \
    curl \
    ## etc....
    ## clean up
    && apt-get clean \ 
    && rm -rf /var/lib/apt/lists/ \ 
    && rm -rf /tmp/downloaded_packages/ /tmp/*.rds

# Install packages from CRAN and GitHub
RUN install2.r --error \ 
    -r 'http://cran.rstudio.com' \
    googleAuthR googleAnalyticsR bigQueryR \
    ## clean up
    && rm -rf /tmp/downloaded_packages/ /tmp/*.rds

# Install node stuff
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN apt install nodejs
WORKDIR /home/node
COPY package.json package-lock*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]