import { PrismaClient } from "@prisma/client";

export class UserRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async registerUser({ username, password }) {
        try {
            return await this.prisma.user.create({
                data: {
                    username,
                    password,
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }  

    async getUserById( id ) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllUser() {
        return await this.prisma.user.findMany();
    }
}