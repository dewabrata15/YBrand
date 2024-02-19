const request = require("supertest") 
const app = require("../app") 
const routes = require("../routes/index")
const {User} = require("../models/index") 
const {hashPassword} = require("../helpers/bcrypt")
const {signToken} = require('../helpers/jwt')
const { sign } = require("jsonwebtoken")


let access_token

beforeAll(async () => { 
   let user =  await User.create(
        {
                email: "rocket@yaahoo.com",
                password: "password2",
                phoneNumber: "1111112",
                address: "bandung2",
        }
    )
    access_tokenn = signToken(user)
});

afterAll(async  () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
});

describe('Post /login', () => { 
    test('should return token, email, role', async () => { 
        const user = {
            "email": "rocket@yaahoo.com",
            "password": "password2",
        }
    
        const response = await request(app)
        .post("/login")
        .set("Authorization", `Bearer ${access_token}`)
        .send(user) 
        console.log(response.body, "<<<<<< ini body<"); 

        expect(response.status).toBe(200); 
        expect(response.body).toBeInstanceOf(Object); 
        expect(response.body).toHaveProperty("access_token",expect.any(String)); 
        expect(response.body).toHaveProperty("email",expect.any(String));
    });

    // test validate
    test('should return email undifined', async () => { 
        const invalidUser = {
            "email": "",
            "password": "password2",
        }
        const response = await request(app).post("/login")
        .set("Authorization", `Bearer ${access_token}`)
        .send(invalidUser)
        console.log(response.body, "<<<<< body");
        expect(response.status).toBe(400); 
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", `Email is required`);
    });

    test('should return password undifined', async () => { 
        const invalidUser = {
            "email": "rocket@yaahoo.com",
            "password": "",
        }
        const response = await request(app).post("/login")
        .set("Authorization", `Bearer ${access_token}`)
        .send(invalidUser)
        console.log(response.body, "<<<<<<ini body<");
        expect(response.status).toBe(400); 
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", `Password is required`);
    });

    test('should invalid email', async () => { 
        const invalidUser = {
            "email": "udinslebew@gmail.com", // wrong email
            "password": "password2",
        }
        const response = await request(app).post("/login")
        .set("Authorization", `Bearer ${access_token}`)
        .send(invalidUser)
        console.log(response.body, "test body");
        expect(response.status).toBe(401); // 401 - Unauthorized
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Email / Password");
    });

    test('should invalid password', async () => { // async
        const invalidUser = {
            "email": "rocket@yaahoo.com", // wrong email
            "password": "4321",
        }
        const response = await request(app).post("/login")
        .set("Authorization", `Bearer ${access_token}`)
        .send(invalidUser)
        console.log(response.body);
        expect(response.status).toBe(401); // 401 - Unauthorized
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Invalid Email / Password");
    });
});


// Register
describe('Post /register', () => { 
    test('should return email, phoneNumber,role, address', async () => { 
        const Newuser = {
                email: "tester@yahoo.com",
                password: "password23",
                phoneNumber: "111112",
                role: "Admin",
                address: "bandung2"
        }
        
        console.log(access_token, "<<<<<<< access token");
        const response = await request(app)
        .post('/register')
        .set('Authorization', `Bearer ${access_token}`)
        .send(Newuser) 
        console.log(response.body, "<<<<<<<<< body"); 

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object); 
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty('email', Newuser.email)
        expect(response.body).toHaveProperty('role', Newuser.role)
        expect(response.body).toHaveProperty('phoneNumber', Newuser.phoneNumber)
        expect(response.body).toHaveProperty('address', Newuser.address)
    });

    test('should not be able to create new user without email', async () => {
        const invalidUser = {
            email: "",
            password: "password23",
            phoneNumber: "1111112",
            role: "Admin",
            address: "bandung2"
        }
        const response = await request(app)
            .post('/register')
            .set('Authorization', `Bearer ${access_token}`)
            .send(invalidUser)
           
        console.log(response.body, "<<<<<<<<<<<<<"); 


        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is required')
    })
    test('should not be able to create new user without password', async () => {
        const invalidUser = {
            email: "tester@yaahoo.com",
            password: "",
            phoneNumber: "1111112",
            role: "Admin",
            address: "bandung2"
    }
        const response = await request(app)
            .post('/register')
            .set('Authorization', `Bearer ${access_token}`)
            .send(invalidUser)
            
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Password is required')
    })
    
    test('should not be able to create new user with existing email', async () => {
        const newUser = {
            email: "rocket@yaahoo.com",
            password: "password2",
            phoneNumber: "1111112",
            address: "bandung2",
        }
        const response = await request(app)
            .post('/register')
            .set('Authorization', `Bearer ${access_token}`)
            .send(newUser, access_token)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'This Email is already exist')
    })
    test('should not be able to create new user without email format', async () => {
        const newUser = {
            email: "rocket",
            password: "password2",
            phoneNumber: "1111112",
            address: "bandung2",
        }
        const response = await request(app)
            .post('/register')
            .set('Authorization', `Bearer ${access_token}`)
            .send(newUser, access_token)
            
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email form should be an E-mail')
    })

    test('should not be able to create without token', async () => {
        const newUser = {
            email: "rocket",
            phoneNumber: "1111112",
            address: "bandung2",
        }
        const response = await request(app)
            .post('/register')
            .send(newUser)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid Token')
    })
    test('should not be able to create user with random string token', async () => {
        const newUser = {
            email: "rocket",
            password: "password2",
            phoneNumber: "1111112",
            address: "bandung2",
        }
        console.log(access_token, "<<<<<<< access token");
        const response = await request(app)
            .post('/register')
            .set('Authorization', `Bearer qwertywe`)
            .send(newUser, `qwertywe`)

            console.log(response.body, "<<<<<<<<<<<<<");
           
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid Token')
    })
});
