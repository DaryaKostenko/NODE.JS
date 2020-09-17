import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('users', 'postgres', 'onelife111', {
    host: process.env.DB_HOST || "localhost",
    dialect: 'postgres',
    // storage: ":memory:"
});

