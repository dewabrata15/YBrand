const request = require('supertest')
const app = require('../app')
const { Product, User, Category } = require('../models/index');
const { signToken, verifyToken } = require('../helpers/jwt')

let access_token
let access_token_staff

beforeAll(async () => {
    let user1 = await User.create({
        email: "rocket@yaahoo.com",
        password: "password2",
        role: "Admin",
        phoneNumber: "1111112",
        address: "bandung2",
    })
    access_token = signToken(user1)

    let user2 = await User.create({
        email: "bagas@yaahoo.com",
        password: "password25",
        role: "Staff",
        phoneNumber: "0010101",
        address: "jakarta",
    })
    access_token_staff = signToken(user2)

    await Category.create({
        name: "Dress"
    })
    await Category.create({
        name: "T-Shirt"
    })
    await Category.create({
        name: "Polo"
    })
    await Category.create({
        name: "Shirt"
    })
    await Category.create({
        name: "Pants"
    })

    await Product.create({
        name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
        description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
        price: "250000",
        stock: 50,
        imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
        categoryId: 2,
        authorId: 1
    })
    await Product.create({
        name: "Kemeja Katun Modal Kerah Tegak Lengan Pendek",
        description: "Kemeja Pria dari bahan katun ultra-long yang lembut dengan tampilan kasual.",
        price: "399000",
        stock: 20,
        imgUrl: "hhttps://image.uniqlo.com/UQ/ST3/id/imagesgoods/468914/item/idgoods_57_468914.jpg?width=750",
        categoryId: 4,
        authorId: 1
    })
})

afterAll(async () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
    await Product.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
    await Category.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})

describe('GET /products', () => {
    test('should be able to get list products successfully', async () => {
        const response = await request(app).get('/products')
            .set("Authorization", `Bearer ${access_token}`)

        console.log(response.body, "<<<<<<<<<<<<<"); // cek error "response.body"
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body.data[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("name", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("description", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("price", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("stock", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("updatedAt", expect.any(String))

    })
    test('should NOT be able to get list products successfully without token', async () => {
        const response = await request(app).get('/products')

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Invalid Token")

    })
    test('should NOT be able to get list products successfully with incorrect token', async () => {
        const response = await request(app).get('/products')
            .set("Authorization", `Bearer asdasdads`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Invalid Token")

    })

})

describe('POST /products', () => {
    test('should be able to create product', async () => {
        const product = {
        name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
        description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
        price: "250000",
        stock: 50,
        imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
        categoryId: 2,
        authorId: 1
        }
        const response = await request(app).post('/products')
            .set("Authorization", `Bearer ${access_token}`)
            .send(product)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("description", expect.any(String))
        expect(response.body).toHaveProperty("price", expect.any(Number))
        expect(response.body).toHaveProperty("stock", expect.any(Number))
        expect(response.body).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body).toHaveProperty("authorId", expect.any(Number))
        expect(response.body).toHaveProperty("createdAt", expect.any(String))
        expect(response.body).toHaveProperty("updatedAt", expect.any(String))
    })

    test('should NOT be able to create product without authorization token', async () => {
        const product = {
            name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "250000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        }
        const response = await request(app).post('/products')
            .send(product)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to create product without product name', async () => {
        const product = {
            name: "",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "250000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        }
        const response = await request(app).post('/products')
            .set("Authorization", `Bearer ${access_token}`)
            .send(product)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Product name is required")
    })
    test('should NOT be able to create product without description name', async () => {
        const product = {
            name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
            description: "",
            price: "250000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        }
        const response = await request(app).post('/products')
            .set("Authorization", `Bearer ${access_token}`)
            .send(product)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Description name is required")
    })
    test('should NOT be able to create product without price', async () => {
        const product = {
            name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        }
        const response = await request(app).post('/products')
            .set("Authorization", `Bearer ${access_token}`)
            .send(product)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Price is required")
    })
    test('should NOT be able to create product with price below 0', async () => {
        const product = {
            name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "-1",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        }
        const response = await request(app).post('/products')
            .set("Authorization", `Bearer ${access_token}`)
            .send(product)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Price must be at least 0")
    })
    test('should NOT be able to create product without categoryId', async () => {
        const product = {
            name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "250000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            authorId: 1
        }
        const response = await request(app).post('/products')
            .set("Authorization", `Bearer ${access_token}`)
            .send(product)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Product.categoryId cannot be null")
    })
})

describe('GET /products/:id', () => {
    test('should be able to get product by id', async () => {
        const response = await request(app)
            .get('/products/1')
            .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("description", expect.any(String))
        expect(response.body).toHaveProperty("price", expect.any(Number))
        expect(response.body).toHaveProperty("stock", expect.any(Number))
        expect(response.body).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body).toHaveProperty("authorId", expect.any(Number))
        expect(response.body).toHaveProperty("createdAt", expect.any(String))
        expect(response.body).toHaveProperty("updatedAt", expect.any(String))
    })
    test('should NOT be able to get product by id without authorization token', async () => {
        const response = await request(app)
            .get('/products/1')

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to get product by id with incorrect token', async () => {
        const response = await request(app)
            .get('/products/1')
            .set("Authorization", `Bearer 123asea`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to get product by id with undefined id', async () => {
        const response = await request(app)
            .get('/products/10')
            .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Error not found")
    })
})

describe('PUT /products/:id', () => {
    test('should be able to update product by id', async () => {
        const product = {
            name: "T-Shirt Oversize Garis",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "250000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        }
        const response = await request(app)
            .put('/products/1')
            .set("Authorization", `Bearer ${access_token}`)
            .send(product)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body.data).toHaveProperty("id", expect.any(Number))
        expect(response.body.data).toHaveProperty("name", expect.any(String))
        expect(response.body.data).toHaveProperty("description", expect.any(String))
        expect(response.body.data).toHaveProperty("price", expect.any(Number))
        expect(response.body.data).toHaveProperty("stock", expect.any(Number))
        expect(response.body.data).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.data).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body.data).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.data).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.data).toHaveProperty("updatedAt", expect.any(String))
    })
    test('should NOT be able to update product by id without authorization token', async () => {
        const response = await request(app)
            .put('/products/1')

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to update product by id with incorrect token', async () => {
        const response = await request(app)
            .put('/products/1')
            .set("Authorization", `Bearer 123asea`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to update product by id with undefined id', async () => {
        const response = await request(app)
            .put('/products/10')
            .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Error not found")
    })
    test('should NOT be able to update product by id without access', async () => {
        const response = await request(app)
            .put('/products/1')
            .set("Authorization", `Bearer ${access_token_staff}`)

        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Forbidden Access')
    })
})

describe('DELETE /products/:id', () => {
    test('should be able to delete product by id', async () => {
        const response = await request(app)
            .delete('/products/1')
            .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Successfully Deleted Product with Id 1')
    })
    test('should NOT be able to delete product by id without authorization token', async () => {
        const response = await request(app)
            .delete('/products/1')

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to delete product by id with incorrect token', async () => {
        const response = await request(app)
            .delete('/products/1')
            .set("Authorization", `Bearer 123asea`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to delete product by id with undefined id', async () => {
        const response = await request(app)
            .delete('/products/10')
            .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Error not found")
    })
    test('should NOT be able to delete product by id without access', async () => {
        const response = await request(app)
            .delete('/products/1')
            .set("Authorization", `Bearer ${access_token_staff}`)

        expect(response.status).toBe(500)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Internal Server Error')
    })
})

const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, "./testImage/testing1.jpeg");
const imageBuffer = fs.readFileSync(filePath);
describe('PATCH /products/:id', () => {
    test('should be able to update & upload image product by id', async () => {
        const response = await request(app)
            .patch('/products/2/image-url')
            .set("Authorization", `Bearer ${access_token}`)
            .attach("imgUrl", imageBuffer, "testing1.jpeg")

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Successfully Upload Image')
    })
    test('should NOT be able to update & upload image product by id without authorization token', async () => {
        const response = await request(app)
            .patch('/products/2/image-url')
            .attach("imgUrl", imageBuffer, "testing1.jpeg")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to update & upload image product by id with incorrect token', async () => {
        const response = await request(app)
            .patch('/products/2/image-url')
            .set("Authorization", `Bearer asdadsasda`)
            .attach("imgUrl", imageBuffer, "testing1.jpeg")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to update & upload image product by id with undefined id', async () => {
        const response = await request(app)
            .patch('/products/15/image-url')
            .set("Authorization", `Bearer ${access_token}`)
            .attach("imgUrl", imageBuffer, "testing1.jpeg")

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Error not found')
    })
    test('should NOT be able to update product by id without access', async () => {
        const response = await request(app)
            .patch('/products/2/image-url')
            .set("Authorization", `Bearer ${access_token_staff}`)
            .attach("imgUrl", imageBuffer, "testing1.jpeg")

        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Forbidden Access')
    })
})

