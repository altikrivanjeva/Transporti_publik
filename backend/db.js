import { Sequelize } from "sequelize";

const sequelize = new Sequelize("transporti_publik", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Set to true to see SQL queries in console
});

export default sequelize;
