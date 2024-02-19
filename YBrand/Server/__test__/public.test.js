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


    await Product.bulkCreate([
        {
            name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "250000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        },
        {
            name: "Kemeja Katun Modal Kerah Tegak Lengan Pendek",
            description: "Kemeja Pria dari bahan katun ultra-long yang lembut dengan tampilan kasual.",
            price: "599000",
            stock: 20,
            imgUrl: "hhttps://image.uniqlo.com/UQ/ST3/id/imagesgoods/468914/item/idgoods_57_468914.jpg?width=750",
            categoryId: 4,
            authorId: 1
        },
        {
            name: "T-Shirt Katun Washed Garis Kerah Bulat Lengan Panjang",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "240000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "Kemeja Katun",
            description: "Kemeja Pria dari bahan katun ultra-long yang lembut dengan tampilan kasual.",
            price: "399000",
            stock: 20,
            imgUrl: "hhttps://image.uniqlo.com/UQ/ST3/id/imagesgoods/468914/item/idgoods_57_468914.jpg?width=750",
            categoryId: 4,
            authorId: 1
        },
        {
            name: "T-Shirt Katun",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "199000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "Kemeja Katun Modal Kerah",
            description: "Kemeja Pria dari bahan katun ultra-long yang lembut dengan tampilan kasual.",
            price: "399000",
            stock: 20,
            imgUrl: "hhttps://image.uniqlo.com/UQ/ST3/id/imagesgoods/468914/item/idgoods_57_468914.jpg?width=750",
            categoryId: 4,
            authorId: 1
        },
        {
            name: "T-Shirt Oversize ",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "250000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        },
        {
            name: "T-Shirt Katun Washed",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "299000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "Kemeja Katun Modal Kerah",
            description: "Kemeja Pria dari bahan katun ultra-long yang lembut dengan tampilan kasual.",
            price: "499000",
            stock: 20,
            imgUrl: "hhttps://image.uniqlo.com/UQ/ST3/id/imagesgoods/468914/item/idgoods_57_468914.jpg?width=750",
            categoryId: 4,
            authorId: 1
        },
        {
            name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "255000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        },
        {
            name: "T-Shirt Lengan Panjang",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "180000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "Kemeja Katun Modal Kerah Tegak Lengan Pendek",
            description: "Kemeja Pria dari bahan katun ultra-long yang lembut dengan tampilan kasual.",
            price: "390000",
            stock: 20,
            imgUrl: "hhttps://image.uniqlo.com/UQ/ST3/id/imagesgoods/468914/item/idgoods_57_468914.jpg?width=750",
            categoryId: 4,
            authorId: 1
        },
        {
            name: "T-Shirt Garis Kerah Bulat Lengan Panjang",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "189000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "T-Shirt Oversize Lengan 1/2",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "200000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        },
        {
            name: "T-Shirt Katun Washed Garis Kerah Bulat Lengan Panjang",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "300000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "Kemeja Lengan Pendek",
            description: "Kemeja Pria dari bahan katun ultra-long yang lembut dengan tampilan kasual.",
            price: "199000",
            stock: 20,
            imgUrl: "hhttps://image.uniqlo.com/UQ/ST3/id/imagesgoods/468914/item/idgoods_57_468914.jpg?width=750",
            categoryId: 4,
            authorId: 1
        },
        {
            name: "T-Shirt Garis Kerah Bulat Lengan Panjang",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "299000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "T-Shirt Garis Kerah Bulat Lengan Pendek",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "399000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "T-Shirt Katun Washed Garis Kerah Bulat Lengan Panjang",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "299000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "T-Shirt Oversize Merah",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "200000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        },
        {
            name: "T-Shirt Katun Washed Garis Kerah Bulat Lengan Pendek",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "100000",
            stock: 99,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            categoryId: 1,
            authorId: 1
        },
        {
            name: "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
            description: "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            price: "350000",
            stock: 50,
            imgUrl: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            categoryId: 2,
            authorId: 1
        },

    ])
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

describe('GET /publics/products', () => {
    test('should be able to get list products for public successfully', async () => {
        const response = await request(app).get('/publics/products')

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
    test('should be able to get filtered list products for public successfully', async () => {
        const response = await request(app).get('/publics/products?filter[categoryId]=1')
        console.log(response.body, '<<<<<');
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
    test('should be able to get paged&limited list products for public successfully', async () => {
        const response = await request(app).get('/publics/products?page=1&limit=3')
        console.log(response.body, '<<<<<');
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
})

describe('GET pub/products/:id', () => {
    test('should be able to get product for public by id', async () => {
        const response = await request(app)
            .get('/publics/products/5')

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
    test('should NOT be able to get product for public by id with undefined id', async () => {
        const response = await request(app)
            .get('/publics/products/99')

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("message", "Error not found")
    })
})


