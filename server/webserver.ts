import express from 'express'


const app = express()


app.get('/', (req, res)=>{
  res.status(200).send('Crypto Impact API')
})

app.get('calculateTransactionCost', (req, res)=>{
  const { walletAddress } = req.query // url will be like /calculateTransactionCost?walletAddress=alsdkfj
  // work out energy cost of wallet address
  res.status(200)
})

app.listen(5000, ()=>console.log('API web server listening on http://localhost:5000'))