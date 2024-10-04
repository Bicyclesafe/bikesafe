# pyoravarkauksien_ehkaisemis_yhteiso.
Helsingin yliopiston Ohjelmistotuotantoprojektin harjoitustyö 2024. Harjoitustyön aiheena on toteuttaa ohjelmistoratkaisu pyörävarkauksien ehkäisemiseen.

[![Deployment pipeline](https://github.com/Bicyclesafe/bikesafe/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Bicyclesafe/bikesafe/actions/workflows/pipeline.yml)

## Documentation

- [DoD](https://github.com/Bicyclesafe/bikesafe/blob/main/documentation/dod.md)
- [Practices](https://github.com/Bicyclesafe/bikesafe/blob/main/documentation/practices.md)
- [Testing](https://github.com/Bicyclesafe/bikesafe/blob/main/documentation/testing.md)
- [Database](https://github.com/Bicyclesafe/bikesafe/blob/main/documentation/database.md)

## Installation

1. Navigate to **server** directory and install dependencies by using the following command:

```bash
npm install
```
2. Set **DATABASE_URL** and **TEST_DATABASE_URL** in **.env** file

```bash
DATABASE_URL = your_database_url
TEST_DATABASE_URL = your_test_database_url
```

3. Run the server with the following command:

```bash
npm run dev
```

4. Navigate to **client** directory and install dependencies by using the following command:

```bash
npm install
```
5. Run the client with the following command:

```bash
npm run dev
```
6. Open the client in the following url:

```bash
http://localhost:5174/
```
