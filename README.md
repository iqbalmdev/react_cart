# React Cart App

This is a full-fledged e-commerce application built with React, Redux, and Material-UI. The app features a cart system, product listing, category management, and order processing. Users can add products to the cart, place orders, and manage products and categories.

## Features

### Home Page
- Displays a list of active categories.
- Clicking on a category navigates to the Product Listing Page.

### Product Listing Page
- Lists all active products within the selected category.
- Products can be added to the cart, with quantity controls based on stock limits.

### Item Description Page
- Displays detailed information about a product.
- Allows updating the quantity in the cart up to the available stock.

### Cart Page
- Displays all items in the cart.
- Shows a summary with total price, including product quantities.
- Allows the user to change product quantities.
- Users can place an order, which deducts product stock and generates an order ID.

### Orders Listing Page
- Displays a list of orders placed by the user.
- Shows product information, even if the product was deleted.

### Category Management
- Categories can be added, updated, or deleted.
- Categories can be toggled between active and inactive statuses.
- Inactive categories do not appear on the homepage but remain visible on the cart page for products already added.

### Admin Features
- Admin can create, update, and delete categories and products.
- Admin can view the total available stock and sales amount for each product/category.

---

## Setup & Installation

Follow these steps to get your development environment running.

### Prerequisites

You need Node.js installed on your system. You can download it from [here](https://nodejs.org/).

### Installation Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/iqbalmdev/react_cart.git
   cd my-react-cart
