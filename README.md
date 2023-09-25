# DELT-Fitness (E-Commerce Website): 

An application that allows a buyer to purchase `Protein Powder & Nutritional Supplements` products over the internet rather than at a local fitness store.

## Why

Online shopping has become become connivent and generating more income for business owners; Known a form of electronic commerce which allows consumers to directly buy goods or services from a seller over the Internet using a web browser or a mobile app. E-commerce platforms like Shopify and WooCommerce provide a number of services to businesses of all sizes. **Through an e-commerce website, a business can process orders, accept payments, manage shipping and logistics, and provide customer service**.

## User Story

```md
AS user managing an internet supplement company
I WANT an e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

```md
AS fitness enthusiast interested in only the best supplements
I WANT want to be able buy supplements online
SO THAT I compete against other extreme fitness competitors
```
## Table of Contents

- [Preview](#preview)
- [Demonstration](#demonstration)
- [Features](#features)
- [Installation](#installation)
- [Testing](#testing)
- [Associations](#associations)
- [License](#license)
- [Contribute](#contribute)
- [Collaboration](#collaboration)
- [Resources](#resources)



## Preview 
Click on image below to visit page:

[![A image thumbnail shows the application in heroku](./assets/images/heroku-preview-image.png)](https://delt-fitness-e-commerce-36c3e8da33f5.herokuapp.com/)


## Features

`CREATE user account`

`LOGIN to Account`

`EDIT Account details`

`ADD items to cart`

`VIEW all in cart`

`REMOVE items from cart`

## Installation
```
npm install and node server.js to run
```

## Raw Link
https://delt-fitness-e-commerce-36c3e8da33f5.herokuapp.com/

## Testing

> **Important**: `Insomnia` was for testing the application's GET routes some models

The following image shows the application's GET route to return all products being tested in Insomnia:

![In Insomnia, the user tests “GET All Products.”](./assets/images/insomnia-get-products.png)

The following image shows the application's GET route to return all categories being tested in Insomnia:

![In Insomnia, the user tests “GET Categories”](./assets/images/insomnia-get-categories.png)


### Associations

* `Category`

  * `id`

    * Integer.
  
    * Doesn't allow null values.
  
    * Set as primary key.
  
    * Uses auto increment.

  * `category_name`
  
    * String.
  
    * Doesn't allow null values.

* `Order`

  * `id`

    * Integer.

    * Doesn't allow null values.

    * Set as primary key.

    * Uses auto increment.

  * `product_id`

    * Integer.

    * References the `Product` model's `id`.

  * `user_id`

    * Integer.

    * References the `User` model's `id`.

* `Product`

  * `id`
  
    * Integer.
  
    * Doesn't allow null values.
  
    * Set as primary key.
  
    * Uses auto increment.

  * `product_name`
  
    * String.
  
    * Doesn't allow null values.
  * `product_description`
  
    * String.
  
    * Doesn't allow null values.

  * `price`
  
    * Decimal.
  
    * Doesn't allow null values.
  
    * Validates that the value is a decimal.
  * `image`
  
    * String.
  
    * Doesn't allow null values.

  * `stock`
  
    * Integer.
  
    * Doesn't allow null values.
  
    * Set a default value of `10`.
  
    * Validates that the value is numeric.

  * `category_id`
  
    * Integer.
  
    * References the `Category` model's `id`.

* `ProductTag`

  * `id`

    * Integer.

    * Doesn't allow null values.

    * Set as primary key.

    * Uses auto increment.

  * `product_id`

    * Integer.

    * References the `Product` model's `id`.

  * `tag_id`

    * Integer.

    * References the `Tag` model's `id`.

* `Tag`

  * `id`
  
    * Integer.
  
    * Doesn't allow null values.
  
    * Set as primary key.
  
    * Uses auto increment.

  * `tag_name`
  
    * String.

* `User`

  * `id`
  
    * Integer.
  
    * Doesn't allow null values.
  
    * Set as primary key.
  
    * Uses auto increment.

  * `email`
  
    * String.
  
    * Doesn't allow null values.

    * Unique
  
    * Validates that the value is email.

  * `phone`
  
    * String.
  
    * Doesn't allow null values.

  * `email`
  
    * String.
  
    * Doesn't allow null values.
  
    * Validates that the value length greater than 6.

### Associations/Relationship

* `Product` belongs to `Category`, and `Category` has many `Product` models, as a category can have multiple products but a product can only belong to one category.

* `Product` belongs to many `Tag` models, and `Tag` belongs to many `Product` models. Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model.

* `Order` belongs to `User`, and `User` has many `Order` models, as a user can have multiple orders but a order can only belong to one user.

* `Order` belongs to `Product`, and `Product` has many `Order` models, as a product can have multiple orders but a order can only belong to one product.

## License

This project license is under the [MIT](https://opensource.org/licenses/MIT)

## Contribute

Git fork. Pull request

## Collaboration

eliabn, daniel, tyson, luan

## Resources

* [MySQL2](https://www.npmjs.com/package/mysql2)

* [Sequelize](https://www.npmjs.com/package/sequelize)

* [dotenv](https://www.npmjs.com/package/dotenv)

* [Express.js Demo](https://expressjs.com/en/starter/hello-world.html)

* [Express.js basic-routing](https://expressjs.com/en/starter/basic-routing.html)

* [Serving static files in Express](https://expressjs.com/en/starter/static-files.html)

* [Express.js – app.delete() Method](https://www.tutorialspoint.com/express-js-app-delete-method)

* [express-handlebars](https://www.npmjs.com/package/express-handlebars)

* [express-session](https://www.npmjs.com/package/express-session)

* [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
