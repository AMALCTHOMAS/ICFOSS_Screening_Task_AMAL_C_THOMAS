const User = require("../Models/User");
const bcrypt = require("bcrypt");


const mongoose = require('mongoose');

const dashboard = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            firstname: user.firstname,
            lastname: user.lastname
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};


const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        if (!email || !oldPassword || !newPassword) {
            return res.status(400).send('All fields are required');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send('Incorrect old password');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.send({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    dashboard,
    changePassword
}