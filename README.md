# Invoice API

## Tech Stack

`Express, TypeScript, TypeORM, PostgreSQL`

## Contributors:
![GitHub Contributors Image](https://contrib.rocks/image?repo=josepernia8/invoice-api)

## Installation

Run `npm i` to install dependencies

## Running the project

- Prerequisite: `Installation` section of this project

- Use docker to run the project (`docker-compose up -d`)

- This starts your app in development mode, rebuilding assets on file changes. By default the app will be running on: `http://localhost:4000/`

- If you want to do everything in Docker, feel free to uncomment line `12` on `docker-compose.yml` to get a `node_modules` volume before running `docker-compose up -d`
- You could also spin up the node app with `npm run dev` and just use the `db` service

## Test/Interaction
Use postman collection: `Invoice_API.postman_collection.json`

## Folder structure
```
src
  └─── entity
  └─── migration
  └─── routes
  └─── services
     │   invoice.ts (most operations with the ORM that we need)
     │   populateDB.ts (run some queries to fill DB with users/clients/items)
     │   index.ts
  └─── types
  └─── utils
│   app.ts
│   data-source.ts
│   index.ts
│   Invoice_API.postman_collection.json (use this to test the API!)
│   README.md (this file)
│   index.ts
│   ...
