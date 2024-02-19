const express = require('express');
const { Product } = require('../models/index');
const { Op } = require ('sequelize')

class PubController {
    static async pubProductList(req, res, next) {
        try {
            const { search, filter, sort } = req.query;
            let options = {};
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            if (filter) {
                if (filter.categoryId === '') {
                    throw { name: 'invalidValue' }
                } else if (!Number(filter.categoryId)) {
                    throw { name: 'invalidValue' }
                } else {
                    let data = filter.categoryId.split(',').map(el => ({
                        [Op.eq]: el
                    }))
                    options.where = {
                        categoryId: {
                            [Op.or]: data
                        }
                    }
                }
            }
            if (sort !== '' && typeof sort !== 'undefined') {
                if (sort.charAt(0) !== '-') {
                    options.order = [[sort, 'ASC']];
                } else {
                    options.order = [[sort.replace('-', ''), 'DESC']];
                }
            }
            if (search) {
                options.where = {
                    name: {
                        [Op.iLike]: `%${search}%`,
                    },
                };
            }
            options.offset = offset;
            options.limit = limit;
            const countProduct = await Product.count()
            const totalPage = Math.ceil(countProduct / limit);
            const data = await Product.findAll(options)
            res.status(200).json({ message: `Successfully get the data`, data, pagination: { page, limit, countProduct, totalPage } })
        } catch (error) {
            next(error)
        }
    }

    static async pubProductById(req, res, next) {
        // console.log("testing aja")
        const { id } = req.params
        try {
            const data = await Product.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = PubController