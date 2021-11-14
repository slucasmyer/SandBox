const ProductModel = require('../models/products');
//const { Op } = require('sequelize');


class ProductController {

    async create(req, res) {
        try {
            const { body } = req;
            const data = await ProductModel.findAll({});
            body.id = data.length + 1;
            body.isPublished = false;
            const response = await ProductModel.create(body);
            res.status(201).json(response);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const data = await ProductModel.findAll({});
            res.status(201).json(data);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateById (req, res) {
        res.status(405).json({ message: "Not allowed" });
    }

    async patchById (req, res) {
        const { id } = req.params;
        const { body } = req;
        const data = await ProductModel.findOne({where: {id}});
        if (!data) {
            res.status(404).send();
            return;
        }
        const { price, mrp, stock } = data;
        if(mrp < 5 && stock == 0) {
            res.status(422).send([]);
        } else if (mrp < price) {
            res.status(422).send([]);
        } else if (stock == 0) {
            res.status(422).send([]);
        } else {
            await ProductModel.update({isPublished: true}, {where: {id}});
        }
    }
}

module.exports = new ProductController();