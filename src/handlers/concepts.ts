import prisma from '../db';

export const createConcept = async (req, res) => {
  const created = await prisma.concept.create({
    data: {
      name: req.body.name,
      ref: req.body.ref,
      cant: req.body.cant,
      price: req.body.price,
      total: req.body.cant * req.body.price,
      Catalogo: {
        connect: {
          id: req.body.catId,
        },
      },
    },
  });

  return res.json({ data: created });
};

export const getConcept = async (req, res) => {
  const concept = await prisma.concept.findUnique({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ data: concept });
};

export const updateConcept = async (req, res) => {
  const updated = await prisma.concept.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      ref: req.body.ref,
      cant: req.body.cant,
      price: req.body.price,
      total: req.body.cant * req.body.price,
    },
  });

  return res.json({ data: updated });
};

export const deleteConcept = async (req, res) => {
  const deleted = await prisma.concept.delete({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ data: deleted });
};
