import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const StudentDiscount = sequelize.define("StudentDiscount", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "student_discounts",
    timestamps: false,
});

export default StudentDiscount;
