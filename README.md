# Pl3b15c173 frontend

## Install

```
$ yarn install
```


## Config

```
$ cp -a src/config.js{-dist,}
```

Edit src/config.js to set API base URL.


## Run server

```
$ ./node_modules/.bin/webpack-dev-server --content-base=dist/
```


## Build for production

```
$ export NODE_ENV=production && ./node_modules/.bin/webpack
```