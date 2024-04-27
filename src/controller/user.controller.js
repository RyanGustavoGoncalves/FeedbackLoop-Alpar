import { UserRepository } from "../repositories/user.repository.js";

export class UserController {
    constructor() {
        this.repository = new UserRepository();
    }

    registerUser = async (req, res) => {
        const user = req.body;
        try {
            const newUser = await this.repository.registerUser(user);
            console.log(newUser);
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    getAllUser = async (req, res) => {
        const allTask = await this.repository.getAllUser();
        console.log(allTask);
        return res.json(allTask);
    }
}