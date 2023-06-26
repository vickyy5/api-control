import prisma from '../db';

export const createDependency = async (req, res) => {
  try {
    const created = await prisma.dependecy.create({
      data: {
        name: req.body.name,
        sector: req.body.sector,
      },
    });

    return res.json({ data: created });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getDependency = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getDependencies = async (req, res) => {
  try {
    const dep = await prisma.dependecy.findMany({});
    return res.json({ data: dep });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateDependency = async (req, res) => {
  try {
    const updated = await prisma.dependecy.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
      },
    });
    return res.json({ data: updated });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteDependency = async (req, res) => {
  try {
    const deleted = await prisma.dependecy.delete({
      where: {
        id: req.body.id,
      },
    });

    return res.json({ data: deleted });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
