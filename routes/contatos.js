const express = require("express");
const router = express.Router();
const { saveContato, findContato, updateContato, deleteContato } = require("../db/contato");
const { auth } = require("../middleware/auth");
const { z } = require("zod");

const contatosSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

router.get("/contatos", auth, async (req, res) => {
  const contatos = await findContato(req.user);
  res.json({ contatos });
});

router.post("/contatos", auth, async (req, res) => {
  try {
    const { name, phone, email } = contatosSchema.parse(req.body);
    const contato = await saveContato(name, phone, email, req.user);
    res.json({ contato });
  } catch (error) {
    if (error instanceof z.ZodError) res.status(400).json(error);
    console.log(error);
    res.status(500).send();
  }
});

router.put("/contatos/:id", auth, async (req, res) => {
  try {
    const { name, phone, email } = contatosSchema.parse(req.body);
    const contato = await updateContato(parseInt(req.params.id), { name, phone, email });
    res.json({ contato });
  } catch (error) {
    if (error instanceof z.ZodError) res.status(400).json(error);
    console.log(error);
    res.status(500).send();
  }
});

router.delete("/contatos/:id", auth, async (req, res) => {
  try {
    const contato = await deleteContato(parseInt(req.params.id));
    res.json({ contato });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = {
  router,
};
