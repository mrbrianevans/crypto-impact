import express from 'express'


const app = express()


app.get('calculateTransactionCost', (req, res)=>{

  // work out energy cost of wallet address

  res.status(200)
})

app.listen(5000, ()=>console.log('http://localhost:5000'))