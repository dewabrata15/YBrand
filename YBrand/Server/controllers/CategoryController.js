const express = require('express')
const { Category } = require('../models/index')

class CategoryController {
    static async listCategory(req, res, next) {
        try {
            const data = await Category.findAll()
            res.status(200).json({ message: `Successfully get the data`, data })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getCategoryById(req, res, next) {
        const { id } = req.params
        try {
            const data = await Category.findByPk(id)
            if (data === null) {
                throw { name: "ErrorNotFound" }
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static async createCategory(req, res, next) {
        try {
            const data = await Category.create(req.body)
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async updateCategoryById(req, res, next) {
        const { id } = req.params
        try {
            const data = await Category.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            await Category.update(req.body, {
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: `Successfully Update Product with Id ${id}` })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = CategoryController