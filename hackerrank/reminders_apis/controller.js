const ReminderModel = require('../models/reminders');
const { Op } = require('sequelize');


class ReminderController {

    async createReminder(req, res) {
        try {
            const { body } = req;
            const data = await ReminderModel.findAll({});
            body.id = data.length + 1;
            body.isPublished = false;
            const response = await ReminderModel.create(body);
            res.status(201).json(response);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAllReminders(req, res) {
        const { user, after } = req.query;
        let data = [];
        if (user && after) {
            data = await ReminderModel.findAll({ where : { [Op.and]: [{date: { [Op.gte] : new Date(Number(after)).toISOString()} }, { user }] } });
        } else if (user) {
            data = await ReminderModel.findAll({ where : { user } });
        } else if (after) {
            data = await ReminderModel.findAll({ where : { date : { [Op.gte] :  new Date(Number(after)).toISOString() } } });
        } else{
            data = await ReminderModel.findAll({});
        }
        res.status(200).json(data);
    }

    async getReminderBy(req, res) {
        const { id } = req.params;
        const data = await ReminderModel.findOne({ id });
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send("ID not found");
        }
    }

    async updateReminderById(req, res) {
        res.status(405).json({ message: "Not allowed" });
    }


}

module.exports = new ReminderController();