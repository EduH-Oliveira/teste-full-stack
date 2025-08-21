import { Request, Response } from "express";
import { database } from "../database";
import { User } from "../entities/User";

const userRepository = database.getRepository(User);

export const listUsers = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.query;

        const query = userRepository.createQueryBuilder("user");

        if (name) {
            query.andWhere("user.name LIKE :name", { name: `%${name}%` });
        }

        if (email) {
            query.andWhere("user.email LIKE :email", { email: `%${email}%` });
        }

        const users = await query.getMany();

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
         const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid or missing user id" });
    }

    const user = await userRepository.findOneBy({ id: Number(req.params.id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = userRepository.create(req.body);
        const savedUser = await userRepository.save(newUser);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findOneBy({ id: Number(req.params.id) });
        if (!user) return res.status(404).json({ message: "User not found" });

        userRepository.merge(user, req.body);
        const updatedUser = await userRepository.save(user);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userRepository.delete(req.params.id);
        if (result.affected === 0) return res.status(404).json({ message: "Usuario não encontrado" });

        res.json({ message: "Usuario deletado com Sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar usuario", error });
    }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ message: "Query parameter é obrigatorio" });
    }

    const users = await userRepository
      .createQueryBuilder("user")
      .where("user.name LIKE :query", { query: `%${query}%` })
      .orWhere("user.email LIKE :query", { query: `%${query}%` })
      .limit(10)
      .getMany();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao procurar usuario", error });
  }
};
