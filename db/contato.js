const { prisma } = require("./prisma");

const findContato = async (userId) => {
  return await prisma.contatos.findMany({
    where: {
      userId,
    },
  });
};

const saveContato = async (name, phone, email, userId) => {
  return await prisma.contatos.create({
    data: {
      name,
      phone,
      email,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const updateContato = async (id, data) => {
  return await prisma.contatos.update({
    where: { id },
    data,
  });
};

const deleteContato = async (id) => {
  return await prisma.contatos.delete({
    where: { id },
  });
};

module.exports = {
  findContato,
  saveContato,
  updateContato,
  deleteContato,
};
