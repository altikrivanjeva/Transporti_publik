import sequelize from "../db.js";
import User from "./User.js";
import Company from "./Company.js";
import Ticket from "./Ticket.js";
import Stop from "./Stop.js";
import Contact from "./Contact.js";
import StudentDiscount from "./StudentDiscount.js";
import ClientLinjat from "./ClientLinjat.js";

// Define Associations
Ticket.belongsTo(Company, { foreignKey: 'company_id' });
Company.hasMany(Ticket, { foreignKey: 'company_id' });

Ticket.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Ticket, { foreignKey: 'user_id' });

export {
    sequelize,
    User,
    Company,
    Ticket,
    Stop,
    Contact,
    StudentDiscount,
    ClientLinjat
};
