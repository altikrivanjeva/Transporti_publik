import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const ClientLinjat = sequelize.define("client_linjat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  emri: DataTypes.STRING,
  mbiemri: DataTypes.STRING,
  linja: DataTypes.STRING,
  stops: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
  email: DataTypes.STRING
}, {
  tableName: "client_linjat",     // <<-- emri i tabelës në phpMyAdmin
  freezeTableName: true,          // <<-- mos i shto 's' në fund
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false
});

export default ClientLinjat;
