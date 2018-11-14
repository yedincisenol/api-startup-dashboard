# api-startup-web-app

#Installation with Docker

Create containers

```
docker-compose  up -d
```

Customize configuration
```
cp config.example.js config.js
```

Install depencies
```
docker-compose web run dev sudo npm install
```

Create build
```
docker-compose exec dev bash -c "sudo npm run build"
```

This project is client for [Laravel Api Startup Projects](https://github.com/yedincisenol/laravel-api-startup).

Live demo at [dashboard.api-startup.yedincisenol.com](http://dashboard.api-startup.yedincisenol.com).

To start:

```bash
$ cp config.example.js config.js
```
> edit config.js for your api server

```bash
$ npm install
```

To develop:

```bash
$ npm run dev
```

To build for production:

```bash
$ npm run build
```

To lint you code:

```bash
$ npm run lint
```


---

## Next?
- Protect Api Credentials


Thanks for [VuePack](https://github.com/egoist/vuepack).
