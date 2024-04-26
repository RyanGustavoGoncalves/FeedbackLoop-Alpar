import { UserRepository } from "../repositories/user.repository.js";

export class UserController {
    constructor() {
        this.repository = new UserRepository();
    }

    registerUser = async (req, res) => {
        const task = req.body;
        try {
            const newTask = await this.repository.registerUser(task);
            console.log(newTask);
            return res.status(201).json(newTask);
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