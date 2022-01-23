# crypto-impact

Cambridge hackathon project for measuring the environmental impact of cryptocurrencies.

This project won the Blackrock hackathon challenge for "sustainable investing" at Hack Cambridge Atlas on 22-23 Jan
2022.

The team of developers consisted of [mrbrianevans](https://github.com/mrbrianevans),
[LvlAndFarm](https://github.com/LvlAndFarm) and [zs351](https://github.com/zs351).

Devpost submission can be viewed at https://devpost.com/software/realtime-crypto-environment.

## Inspiration

Help crypto investors understand the true environmental cost of their alternative asset trading.

## What it does

Online tool that calculates the amount of energy consumed mining transactions to a specific bitcoin wallet.

## How we built it

Hosted on [Google Cloud Run](https://cloud.google.com/run) and accessible from https://cryptoimpact.tech.

Full stack web app written in Typescript. React UI and NodeJS backend. Frontend is compiled to static files, and the
express web server runs on the serverless Google Cloud Run. The web server is built using Docker.

## Challenges we ran into

Rate limited on Blockchain.com API. Had to change API provider half way through project

## Accomplishments that we're proud of

Successfully tracing the energy consumption for any arbitrary wallet. Being able to pivot to a new API.

## What we learned

The true cost of transferring bitcoin.

## Feature ideas

Add support for viewing multiple wallets at the same time, because many crypto investors keep more than one wallet.

---

## How to run the code

### Developing locally

Node and `npm` are required to run this project.

Install Node: https://nodejs.org/en/ (includes npm)

To run frontend:

```bash
cd website
npm install
npm run dev
```

To run backend:

```bash
cd server
npm install
npm run dev
```

### Deployment

To deploy this repository, a Dockerfile is included which builds the container and has an entrypoint set.

To run the web server in production mode without Docker, in `server` and `website`, run

```powershell
npm run ci
npm run build
```

And then run `npm run start` in `server` to start serving on `localhost:$PORT` or `localhost:5000`.

This can also be achieved by running `npm run build && npm run start` in the root directory of the project.