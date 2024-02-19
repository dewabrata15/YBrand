const express = require('express')
const { Product, User } = require('../models/index')
const { v2: cloudinary } = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

class ProductsController {
    static async productList(req, res, next) {
        try {
            const data = await Product.findAll({
                include: {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
            })
            res.status(200).json({ message: `Successfully get the data`, data })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async createProduct(req, res, next) {
        try {
            const product = req.body
            product.authorId = req.user.id
            const data = await Product.create(product)
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async getProductById(req, res, next) {
        const { id } = req.params
        try {
            const data = await Product.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async updateProductById(req, res, next) {
        const { id } = req.params
        try {
            const data = await Product.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            await Product.update(req.body, {
                where: {
                    id: id
                }
            })
            
            res.status(200).json({ message: `Successfully Update Product with Id ${id}`, data })
        } catch (error) {
            next(error)
        }
    }
    static async deleteProductById(req, res, next) {
        const { id } = req.params
        try {
            const data = await Product.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            await Product.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: `Successfully Deleted Product with Id ${id}` })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async uploadProductImage(req, res, next) {
        try {
            const { id } = req.params
            const data = await Product.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            const bufferStr = req.file.buffer.toString("base64");
            const uploadData = `data:${req.file.mimetype};base64,${bufferStr}`;

            const uploadToCloud = await cloudinary.uploader.upload(uploadData, {
                public_id: req.file.originalname,
                folder: "testing1",
                resource_type: "auto"
            })
            await Product.update({ imgUrl: uploadToCloud.secure_url }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: "Successfully Upload Image" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductsController