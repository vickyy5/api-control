import { Request } from 'express-validator/src/base';
import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: await hashPassword(req.body.password),
        role: req.body.role,
        typeDependency: req.body.typeDependency,
        dependency: {
          connect: { id: req.body.id },
        },
      },
    });
    return res.json({ token: 'Usuario Creado :)', user });
  } catch (error) {
    throw new Error(error)
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    return res.json({ users });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (req: Request, res) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: req.body.id
      }
    });
    return res.json({ result: true, user: deleteUser });
  } catch (error) {
    throw new Error(error);
  }
}

export const updateUser = async (req: Request, res) => {
  try {
    if(req.params === undefined) return
    const updateUser = await prisma.user.update({
      where: {
        id: req.params.id
      },
      data: {
        ...req.body
      }
    });
    return res.json({ user: updateUser });
  } catch (error) {
    
  }
}

export const pong = async (req, res) => {
  res.json({ data: 'pong' });
};

export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid || isValid === null) {
      return res
        .status(400)
        .json({ message: 'Usuario o contraseña incorrectos' });
    }
    const token = createJWT(user);
    delete user?.password;
    return res.json({ token: token, user });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'Usuario o contraseña incorrectos' });
  }
};
