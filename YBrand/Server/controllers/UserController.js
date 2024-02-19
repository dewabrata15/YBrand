const express = require('express');
const { User } = require('../models/index');
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')


class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: "EmailIsRequired" }
            }
            if (!password) {
                throw { name: "PasswordIsRequired" }
            }
            const user = await User.findOne({
                where: { email: email }
            })
            if (!user) {
                throw { name: 'UserNotExist' }
            }
            const isPasswordValid = comparePassword(password, user.password)
            if (!isPasswordValid) {
                throw { name: 'PasswordInvalid' }
            }
            const access_token = signToken(user)
            res.status(200).json({ access_token, email })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async addUser(req, res, next) {
        try {
            const {email, password, role, phoneNumber, address } = req.body
            const user = await User.create({email, password, role, phoneNumber, address })
            console.log(user)

            res.status(201).json({
                id: user.id,
                password: user.password,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                address: user.address
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

   
}

module.exports = UserController