import { PrismaClient } from "@prisma/client";

export class UserRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createTask({ name, checked }) {
        const task = await this.prisma.task.create({
            data: {
                name,
                checked,
            }
        });
        return task;
    }
    

    async getTasks() {
        const tasks = await this.prisma.task.findMany();
        return tasks;
    }

    async updateTask({ id, name, checked }) {
        const task = await this.prisma.task.update({
            where: {
                id: id,
            },
            data: {
                name,
                checked,
            }
        });

        return task;
    }

    async deleteTask(id) {
        await this.prisma.task.delete({
            where: {
                id,
            }
        })
    }
}