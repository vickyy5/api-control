import prisma from '../db';

export const createDependency = async (req, res) => {
  const created = await prisma.dependecy.create({
    data: {
      name: req.body.name,
    },
  });

  return res.json({ data: created });
};

export const getDependcy = async (req, res) => {
  const dep = await prisma.dependecy.findUnique({
    where: {
      name: req.body.name,
    },
    include: {
      work: true,
      users: true,
    },
  });

  return res.json({ data: dep });
};

export const updateDependency = async (req, res) => {
  const updated = await prisma.dependecy.update({
    where: {
      id: req.body.id,
    },
    data: {
      name: req.body.name,
    },
  });

  return res.json({ data: updated });
};

export const deleteDependency = async (req, res) => {
  const deleted = await prisma.dependecy.delete({
    where: {
      id: req.body.id,
    },
  });

  return res.json({ data: deleted });
};
