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

describe('GET /categories', () => {
    test('should be able to get list category successfully', async () => {
        const response = await request(app).get('/categories')
            .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body.data[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("name", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("updatedAt", expect.any(String))

    })
    test('should NOT be able to get list category successfully without token', async () => {
        const response = await request(app).get('/categories')

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Invalid Token")

    })
    test('should NOT be able to get list category successfully with incorrect token', async () => {
        const response = await request(app).get('/categories')
            .set("Authorization", `Bearer asdasdads`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Invalid Token")

    })
})

describe('POST /categories', () => {
    test('should be able to create product', async () => {
        const category = {
            name: "Jeans",
        }
        const response = await request(app).post('/categories')
            .set("Authorization", `Bearer ${access_token}`)
            .send(category)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("name", expect.any(String))
    })
    test('should NOT be able to create product without authorization token', async () => {
        const category = {
            name: "Jeans",
        }
        const response = await request(app).post('/categories')
            .send(category)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to create product with incorrect token', async () => {
        const category = {
            name: "Jeans",
        }
        const response = await request(app).post('/categories')
            .set("Authorization", `Bearer asdadasda`)
            .send(category)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
    test('should NOT be able to create product without product name', async () => {
        const category = {
            name: "",
        }
        const response = await request(app).post('/categories')
            .set("Authorization", `Bearer ${access_token}`)
            .send(category)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Category Name is required")
    })
})




