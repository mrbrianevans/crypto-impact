import express, {Response} from 'express'
import cors from 'cors'
import {findEnergyCost} from "./costCalculator";
import {getAddress} from "./costApis";
import {ImpactResponse} from "common/types/ImpactResponse";


const app = express()
const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))
app.use(express.static('../website/dist')) // serve the website frontend

// url will be like /calculateTransactionCost?walletAddress=bc1q4un6jjfv2jygd8vq9c29vahwdz0amef2p5lx59
app.get('/calculateTransactionCost', async (req, res: Response<ImpactResponse>) => {
  const {walletAddress} = req.query
  console.log('Request with', {walletAddress})
  try {
    const address = await getAddress(walletAddress as string)
    // work out energy cost of wallet address
    const energyCost = await findEnergyCost(address, 0, 1,
        {costBreakDown: [], totalCostKwh: 0, totalCostTxs: 0, uncountedTxs: 0});
    res.status(200).json(energyCost)
  } catch (e) {
    res.status(500).send(e)
  }
})

const port = Number(process.env.PORT) || 5000
app.listen(port, () => console.log(`API web server listening on http://localhost:${port}`))