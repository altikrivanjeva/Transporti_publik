import { User } from "../models/index.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role']
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Gabim gjatë marrjes së userave!", error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: "Useri u fshi me sukses!" });
        } else {
            res.status(404).json({ message: "Useri nuk u gjet!" });
        }
    } catch (err) {
        res.status(500).json({ message: "Gabim gjatë fshirjes!", error: err.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    try {
        const [updated] = await User.update(
            { username, email, role },
            { where: { id } }
        );
        if (updated) {
            res.json({ message: "Useri u përditësua me sukses!" });
        } else {
            res.status(404).json({ message: "Useri nuk u gjet!" });
        }
    } catch (err) {
        res.status(500).json({ message: "Gabim gjatë përditësimit!", error: err.message });
    }
};
