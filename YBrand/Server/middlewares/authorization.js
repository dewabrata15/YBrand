const { Product } = require('../models/index')

const authorizationUpdateStaff = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (req.user.role === "Staff" && req.user.id === product.authorId) {
            next()
        } else if (req.user.role === "Admin") {
            next()
        } else {
            throw { name: "ForbiddenAccess" }
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const authorizationAdmin = async (req, res, next) => {
    try {
    
        if (req.user.role === "Admin") {
            next()
        } else {
            throw { name: "ForbiddenAccess" }
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}


module.exports = { 
    authorizationUpdateStaff, 
    authorizationAdmin 
}