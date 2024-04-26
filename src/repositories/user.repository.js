import { PrismaClient } from "@prisma/client";

export class UserRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async registerUser({ username, password }) {
        return await this.prisma.user.create({
            data:
            {
                username,
                password
            }
        })
    }

    async getAllUser() {
        return await this.prisma.user.findMany();
    }
}