import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Stop = sequelize.define("Stop", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "stops",
    timestamps: false,
});

export default Stop;
