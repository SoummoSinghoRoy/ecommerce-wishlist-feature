## *E-Commerce Site Wishlist & Product Suggestion Feature API Service Documentation*

### Introduction

Welcome to the API documentation for the e-commerce wishlist management & product suggestion feature api service. This API allows you to manage user products wishlist & relevant product suggestion in the application. This is providing optimized wishlist & relevant products suggestion features solution.

> **Technology & Tools**: Express js, mongodb with typescript supported.

**Server listen URI(localhost)**: `"localhost:8552"`

**Example of usage**: `"server-listen-uri/api-endpoint"`

### *Authentication Endpoints*

> **signup**

- **Endpoint: `"/api/auth/signup"`**  
- **Method:** POST
- **Description:** Creates a new user account. But user should be valid because here apply user validity checking functionality by **`signupValidation`** function.
- **Body parameters:**
  - **username** (string, required): The user name of the user.
  - **email** (string, required): The email address of the user.
  - **password** (string, required): The password for the user account and minimum length 6 & maximum length 10.
- **Example request**

```
{
  "username": "sandy",
  "email": "sandybe0@gmail.com",
  "password": "12345678"
}
```

- **Example response**

```
{
  "status": 200,
  "message": "User successfully created",
  "data": {
      "id": "665f6b996838577cd2a6cc6e",
      "username": "sandy",
      "email": "sandybe0@gmail.com"
  }
}
```

> **login**

- **Endpoint: `"/api/auth/login"`**  
- **Method:** POST
- **Description:** Login with user account. Here apply validation for checking user validity by **`logInValidation`** function.
- **Body parameters:**
  - **email** (string, required): The email address of the user.
  - **password** (string, required): The valid password for the user account.
- **Example request**

```
{
  "email": "sandybe0@gmail.com",
  "password": "12345678"
}
```

- **Example response**

```
{
  "status": 200,
  "message": "Successfully loggedin",
  "isAuthenticated": true,
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWY2Yjk5NjgzODU3N2NkMmE2Y2M2ZSIsInVzZXJuYW1lIjoic2FuZHkiLCJlbWFpbCI6InNhbmR5YmUwQGdtYWlsLmNvbSIsImlhdCI6MTcxNzUyOTcxNywiZXhwIjoxNzE3NTcyOTE3fQ.7TWeGjL_vJuPD4busj-KpmMlUZl3ySvM-PhJohGwV-Y",
  "data": {
      "id": "665f6b996838577cd2a6cc6e",
      "username": "sandy"
  }
}
```

> **logout**

- **Endpoint: `"/api/auth/logout"`**  
- **Method:** POST
- **Request headers:** Yes
  - header key: `authorization`
  - value: `token`
- **Description:** Logout from api service or server.
- **Example header request**

```
{
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5........",
}
```

- **Example response**

```
{
  "status": 200,
  "message": "Successfully loggedout",
  "isAuthenticated": false
}
```

### *Product Endpoints*

> **fetch-products**

- **Endpoint: `"/api/product/all"`***(recommended to fetch products first by this api call)* 
- **Method:** GET
- **Description:** Fetch all products.
  - **Note**: Since here using local database server, products are initially retrieved from an external API and stored in product DB. Subsequent calls to the external API are avoided. This api calling handle by **`fetchProductsExtarnally`** function. 
- **Request headers:** No
- **Example response**

```
{
  "status": 200,
  "message": "Successfully retrieved",
  "data": {
    "products": [
        {
          "_id": "665f63e9d1c6fee257577dd1",
          "name": "Bald Eagle",
          "species": "Haliaeetus leucocephalus",
          "family": "Accipitridae",
          "habitat": "Forests, Coasts, and Lakes",
          "place_of_found": "North America",
          "diet": "Carnivore",
          "description": "The bald eagle is a powerful bird of prey known for its white head and tail feathers.",
          "wingspan_cm": 200,
          "weight_kg": 6.3,
          "image": "https://fakeimg.pl/500x500/cc7701",
          "__v": 0,
          "createdAt": "2024-06-04T18:58:49.126Z",
          "updatedAt": "2024-06-04T18:58:49.126Z"
        },
        {
          "_id": "665f63e9d1c6fee257577dd2",
          "name": "Peacock",
          "species": "Pavo cristatus",
          "family": "Phasianidae",
          "habitat": "Forests and Grasslands",
          "place_of_found": "India",
          "diet": "Omnivore",
          "description": "The peacock is a large and colorful bird known for its extravagant tail feathers.",
          "wingspan_cm": 160,
          "weight_kg": 4.5,
          "image": "https://fakeimg.pl/500x500/cc7702",
          "__v": 0,
          "createdAt": "2024-06-04T18:58:49.127Z",
          "updatedAt": "2024-06-04T18:58:49.127Z"
        },
        more records...
      ]
  }
}
```

> **create wishlist - product suggestion feature**

- **Endpoint: `"/api/product/wishlist/add/:itemId"`**  
- **Method:** POST
- **Description:** Add item in wishlist & suggestion some relevant products. Product suggestion functionality handle by **`suggestProduct`** function.
- **Request headers:** Yes
  - **header key**: `authorization`
  - **value**: `token`
- **Query parameters:**
  - **itemId**: `665f63e9d1c6fee257577dd1`
- **Example response**

```
{
  "status": 200,
  "message": "Item saved in wishlist",
  "data": {
      "wishlist": {
          "_id": "665f63e9d1c6fee257577dd1",
          "name": "Bald Eagle",
          "species": "Haliaeetus leucocephalus",
          "family": "Accipitridae",
          "habitat": "Forests, Coasts, and Lakes",
          "place_of_found": "North America",
          "diet": "Carnivore",
          "description": "The bald eagle is a powerful bird of prey known for its white head and tail feathers.",
          "wingspan_cm": 200,
          "weight_kg": 6.3,
          "image": "https://fakeimg.pl/500x500/cc7701",
          "__v": 0,
          "createdAt": "2024-06-04T18:58:49.126Z",
          "updatedAt": "2024-06-04T18:58:49.126Z"
      },
      "suggestedProducts": [
          {
            "_id": "665f63e9d1c6fee257577df0",
            "name": "Harpy Eagle",
            "species": "Harpia harpyja",
            "family": "Accipitridae",
            "habitat": "Tropical Rainforests",
            "place_of_found": "Central and South America",
            "diet": "Carnivore",
            "description": "The harpy eagle is a powerful and majestic bird of prey found in the dense tropical rainforests.",
            "weight_kg": 9.5,
            "height_cm": 110,
            "image": "https://fakeimg.pl/500x500/cc6636",
            "__v": 0,
            "createdAt": "2024-06-04T18:58:49.130Z",
            "updatedAt": "2024-06-04T18:58:49.130Z"
          },
        more relevant products...
      ]
  }
}
```

### *Functional Explaination*


> **fetchProductsExtarnally**(recommended to fetch products initially after new installation)

This function fetches demo products from an external API `"https://freetestapi.com/api/v1/birds"` and returns the retrieved data. It only executes if the product store is empty & storing retrieved data in product DB otherwise don't execute this function. In both cases (empty or existing products), it retrieves all products from the database and returns them.

> **suggestProduct**(parameter: userid, selectedItemId, queryValue)

- Input Parameters:
  - userid: Identifies the user for whom product suggestions are being generated.
  - selectedItemId: An item ID to exclude from suggestions
  - queryValue: A value to filter product for suggestion

In both cases (empty or existing wishlist), this function will execute.

- Work process:  
  - Query wishlist by authenticated user id & populate products.
  - Extract existing product id which helping to exclude product from suggesion.  
  - Combine previous product id & current selected id 
  - Finally, querying suggested products & returns.



## *Summary:*

This API service allows users to manage wishlist & quickly get back the relevant product. It supports authentication, external demo data fetch, wishlist management and facilitate retrieval of desired products.


*&copy; 2024 Swadip Singho Roy Soummo. All rights reserved.*

