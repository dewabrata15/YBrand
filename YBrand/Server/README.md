[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13302584&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# Branded Things API Documentation

## Endpoints :

List of available endpoints:

<!-- Users Endpoints -->
- `GET /`  <HOME>
- `POST /login`
- `POST /register`
<!-- Pub Products Endpoints -->
- `GET /publics/products`
- `GET /publics/products/:id`
<!-- Products Endpoints -->
- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `PATCH /products/:id/image-url`
<!-- Category Endpoints -->
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

&nbsp;

## 1. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 2. POST /users

- Description:
  This endpoint allows an admin user to create new user. Only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email form should be an E-mail"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password must be at least 5 characters long"
}

```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
OR
{
  "message": "This Email is already exist"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 3. GET /pub/products

Description:

- Get all products from database for public

Request:

- query:

```json
{
  "search": "string"
}
OR
{
  "filter": "number"
}
OR
{
  "sort": "string"
}
OR
{
  "sort": "-string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully get the data"
},
[
   {
     "id": 1,
            "name": "T-Shirt Oversize Garis Kerah Bulat Lengan 1/2",
            "description": "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            "price": 250000,
            "stock": 50,
            "imgUrl": "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465492/item/goods_03_465492.jpg?width=750",
            "categoryId": 2,
            "authorId": 3,
            "createdAt": "2024-01-04T11:18:45.752Z",
            "updatedAt": "2024-01-04T11:18:45.752Z"
        },
        {
            "id": 2,
            "name": "Kemeja Katun Modal Kerah Tegak Lengan Pendek",
            "description": "Kemeja Pria dari bahan katun ultra-long yang lembut dengan tampilan kasual.",
            "price": 399000,
            "stock": 20,
            "imgUrl": "hhttps://image.uniqlo.com/UQ/ST3/id/imagesgoods/468914/item/idgoods_57_468914.jpg?width=750",
            "categoryId": 4,
            "authorId": 3,
            "createdAt": "2024-01-04T11:18:45.752Z",
            "updatedAt": "2024-01-04T11:18:45.752Z"
        },
        {
            "id": 3,
            "name": "Rompi Bulu Domba",
            "description": "Rompi terbuat dari desain jahitan dengan efek bahan flis. Kerah berdiri dan kerung lengan. Saku di pinggul tertutup kampuh di samping. Bagian bawah mudah disesuaikan dengan karet elastis di samping. Penutup depan ritsleting.",
            "price": 600000,
            "stock": 40,
            "imgUrl": "https://static.zara.net/photos///2023/I/0/2/p/0993/300/800/2/w/1024/0993300800_2_1_1.jpg?ts=1693558919231",
            "categoryId": 3,
            "authorId": 3,
            "createdAt": "2024-01-05T09:02:28.738Z",
            "updatedAt": "2024-01-05T09:02:28.738Z"
    }
  ...,
]
```

&nbsp;

## 4. GET /pub/products/:id

Description:

- Get products by id for public

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
            "name": "Kemeja Katun Modal Kerah Tegak Lengan Pendek",
            "description": "Kemeja Pria dari bahan katun ultra-long yang lembut dengan tampilan kasual.",
            "price": 399000,
            "stock": 20,
            "imgUrl": "hhttps://image.uniqlo.com/UQ/ST3/id/imagesgoods/468914/item/idgoods_57_468914.jpg?width=750",
            "categoryId": 4,
            "authorId": 3,
            "createdAt": "2024-01-04T11:18:45.752Z",
            "updatedAt": "2024-01-04T11:18:45.752Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

## 5. GET /products

Description:

- Get all products with password hidden from database, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully get the data"
},
[
        {
            "id": 1,
            "name": "T-Shirt Katun Washed Garis Kerah Bulat Lengan Panjang",
            "description": "T-shirt Pria berbahan 100% katun yang lembut dan tahan lama. Potongan oversized yang mudah dipadupadankan.",
            "price": 199000,
            "stock": 99,
            "imageUrl": "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462130/item/idgoods_01_462130.jpg?width=750",
            "categoryId": 1,
            "authorId": 3,
            "createdAt": "2023-11-27T14:53:16.469Z",
            "updatedAt": "2023-11-27T14:53:16.469Z",
            "User": {
                "id": 3,
                "username": "test789",
                "email": "jkrink2@accuweather.com",
                "role": "Admin",
                "phoneNumber": "5765031803",
                "address": "4 Sunbrook Junction",
                "createdAt": "2023-11-27T14:53:16.457Z",
                "updatedAt": "2023-11-27T14:53:16.457Z"
            }
        }
  ...,
]
```

&nbsp;

## 6. POST /products

- Description:
  This endpoint allows an admin user to create new product. Only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imageUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "createdAt": "integer",
  "updatedAt": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 4,
            "name": "Rompi Bulu Domba",
            "description": "Rompi terbuat dari desain jahitan dengan efek bahan flis. Kerah berdiri dan kerung lengan. Saku di pinggul tertutup kampuh di samping. Bagian bawah mudah disesuaikan dengan karet elastis di samping. Penutup depan ritsleting.",
            "price": 600000,
            "stock": 40,
            "imgUrl": "https://static.zara.net/photos///2023/I/0/2/p/0993/300/800/2/w/1024/0993300800_2_1_1.jpg?ts=1693558919231",
            "categoryId": 3,
            "authorId": 3,
            "createdAt": "2024-01-05T09:03:09.696Z",
            "updatedAt": "2024-01-05T09:03:09.696Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Product name is required"
}
OR
{
  "message": "Description name is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Price must be at least 0"
}
OR
{
  "message": "Category Id is required"
}
OR
{
  "message": "Author Id is required"
}

```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 7. GET /products/:id

Description:

- Get products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 5,
            "name": "KEMEJA POLO JACQUARD BERGARIS",
            "description": "Kemeja polo dari rajutan dijahit dengan benang hasil campuran katun. Kerah lapel dengan penutup depan ritsleting. Lengan pendek.",
            "price": 525000,
            "stock": 43,
            "imgUrl": "https://static.zara.net/photos///2023/I/0/2/p/4331/311/712/2/w/1024/4331311712_1_1_1.jpg?ts=1693997418541",
            "categoryId": 3,
            "authorId": 3,
            "createdAt": "2024-01-05T09:05:42.702Z",
            "updatedAt": "2024-01-05T09:05:42.702Z"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

## 8. PUT /products/:id

Description:

- Update products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully Update Product with Id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

## 9. DELETE /products/:id

Description:

- Delete products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully Deleted Product with Id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

## 10. PATCH /products/:id/image-url

Description:

- Delete products by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully Upload Image"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

## 11. GET /categories

Description:

- Get all categories from database, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully get the data"
},
[
    {
       "id": 4,
    "name": "Shirt",
    "createdAt": "2024-01-04T11:18:45.560Z",
    "updatedAt": "2024-01-04T11:18:45.560Z"
    }
  ...,
]
```

&nbsp;

## 12. POST /categories

- Description:
  This endpoint allows an admin user to create new categories. Only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 5,
  "name": "Socks",
  "updatedAt": "2023-11-30T16:17:54.598Z",
  "createdAt": "2023-11-30T16:17:54.598Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Category Name is required"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 13. PUT /categories/:id

Description:

- Update categories by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully Update Categories with Id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

## 14. DELETE /categories/:id

Description:

- Delete categories by id, only users with admin privileges can access this feature.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully Deleted Categories with Id ${id}"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error not found"
}
```

&nbsp;

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
