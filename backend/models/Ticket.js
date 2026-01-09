import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Company from "./Company.js";
import User from "./User.js";

const Ticket = sequelize.define("Ticket", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    passenger_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pasagjer"
    },
    seat: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    travel_date: {
        type: DataTypes.DATEONLY, // or DATE if it includes time, inferred as DATE based on usage
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    }
}, {
    tableName: "tickets",
    timestamps: false,
});

export default Ticket;
