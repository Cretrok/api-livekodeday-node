const express = require('express');

const app = express();

app.get('/',(req, res) => {
  res.json({
    success: true,
    message: "Hola Mundo desde Node en Express"
  })
})

app.post('/',(req, res) => {
  res.json({
    success: true,
    message: "Hola Mundo con el metodo post"
  })
})

app.listen(8080, () =>{
  console.log("server is linstening");
})
