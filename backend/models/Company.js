import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Company = sequelize.define("Company", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "bus_companies",
    timestamps: false,
});

export default Company;
