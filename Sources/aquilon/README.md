# h4412-smart aquilon: Client
SMART project - 2019

![logo](https://i.imgur.com/1UYavpo.png)

[Trello 🐕](https://trello.com/b/0CWH3OC0/smart)

# Techs

- [React Native](https://facebook.github.io/react-native)
- [Expo](https://expo.io/)
- [React Redux](https://react-redux.js.org/)
- [Axios](https://www.npmjs.com/package/axios)

# Setup

## [Install NodeJS (including npm) on Linux (Ubuntu)](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)

> Only one time for all the projects!

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## [Clone the repo](https://github.com/Staylix/aquilon)

```bash
git clone https://github.com/Staylix/aquilon.git
```

## Install dependencies

```bash
cd aquilon/
sudo npm install
```

## [Install the Expo app on your phone](https://expo.io/tools#client)

# Start

## Configure backend IP
Edit `conf.js` and change `URL` value to your backend IP
```javascript
const URL = 'http://10.43.7.198:3003';
export default URL;
```

## Start Expo server

```bash
expo start
```

Default port is: 19002

## Launch the app on your phone
Install the Expo App on your phone (Android or iOS).  
Scan the QR-code.

# Build
Make sure you set the right IP in `conf.js`
```bash
expo build:android
```
* Follow indications (create account, and wait for ~5 minutes while building in
  the cloud).  
* Download APK  
* Run It
