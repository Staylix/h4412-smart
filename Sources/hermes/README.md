# h4412-smart hermes: Server
SMART project - 2019

![logo](https://i.imgur.com/1UYavpo.png)

[Trello 🐕](https://trello.com/b/0CWH3OC0/smart)

# Techs

- [**N**odeJS](https://nodejs.org)
- [**E**xpressJS](https://expressjs.com)
- [**M**ongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)

# Setup

## [Install NodeJS (including npm) on Linux (Ubuntu)](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)

> Only one time for all the projects!

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## [Clone the repo](https://github.com/Staylix/hermes)

```bash
git clone https://github.com/Staylix/hermes.git
```

## Install dependencies

```bash
cd hermes/
sudo npm install
```

## [Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo mkdir -p /data/db
```

## [Install Postman](https://www.getpostman.com/downloads/)

For API development.

# Start

## Start MongoDB server

```bash
sudo mongod
```

Default port is: 27017

## Start Node server

```bash
npm start
```

Default port is: 3003

# Build

```bash
npm run build
```

# Switch to remote database

To switch to the remote database, comment and uncomment the 6 lines at the begining of the `/src/main.ts` file.