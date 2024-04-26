import { UserRepository } from "../repositories/user.repository.js";

export class UserController {
    constructor() {
        this.repository = new UserRepository();
    }

    registerUser = async (req, res) => {
        const task = req.body;
        const newTask = await this.repository.registerUser(task)
        console.log(newTask);
        return res.json(newTask);
    }

    getAllUser = async (req, res) => {
        const allTask = await this.repository.getAllUser();
        console.log(allTask);
        return res.json(allTask);
    }
}