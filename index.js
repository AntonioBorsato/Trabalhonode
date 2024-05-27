const express = require("express");
const { router: userRouter } = require("./routes/user");
const { router: contatoRouter } = require("./routes/contatos");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Ola mundo");
});

server.use(userRouter);
server.use(contatoRouter);

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando no http://localhost:${port}`);
});
