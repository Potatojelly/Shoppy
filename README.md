# Yoon's Shoppy

This is a simple online shopping mall site built with React and Firebase. With this application, users can easily log in using their Google accounts, browse a diverse range of products, add desired items to their carts, and effortlessly adjust the number of products in the cart. Moreover, the site includes an admin page, empowering administrators to upload and manage new products easily.

___Please note that ordering functionality is not implemented___

## Table of Contents

1. [Screen Shots/Demo](#screenshot)
2. [Usage](#usage)
3. [Technology Stack](#tech-stack)
4. [Reflection](#reflection)

## Screenshots <a name="screenshot"></a>

### Main Page
![mainPage](https://github.com/Potatojelly/Shoppy/assets/108857524/ad84a8d7-b502-4827-ba35-bad1d65fc3c5)

### Product Detail Page
![productDetail](https://github.com/Potatojelly/Shoppy/assets/108857524/0e61a7b7-4a71-417b-95d2-ddb7c6fbc391)

### My Cart Page
![MyCartPage](https://github.com/Potatojelly/Shoppy/assets/108857524/8b7c048a-ee2d-4768-aa98-3f89021ca222)


### Administration Page
![ezgif com-video-to-gif](https://github.com/Potatojelly/Shoppy/assets/108857524/a88d1d07-17f9-434e-895a-e4a9146e3560)
![ezgif com-video-to2-gif](https://github.com/Potatojelly/Shoppy/assets/108857524/f09b4da1-3408-496e-90c8-59400f293e88)




Demo:https://bucolic-medovik-9bf9fe.netlify.app

## Usage <a name="usage"></a>

* Browse Products: Explore a wide selection of products available in the shopping mall. Each product is presented with detailed information, including images, descriptions, and prices. 

* Add Products to Cart: Users can easily add desired products to their cart. The cart ensures the number of items added aligns with the available stock.

* Cart Management: On the cart page, users can directly adjust the quantity of each product, increasing or decreasing the number of items as needed. Additionally, they have the option to remove products from the cart altogether.

* Total Price Calculation: The website automatically calculates and displays the total price of the items in the cart, giving users an overview of their current shopping cost.

* Admin Functionality: Administrators can add new products to the shopping mall's inventory.

## Technology stack <a name="tech-stack"></a>
The Yoon's Shoppy project is built using the following technologies:

* Frontend: React, JS, tailwind CSS
* Debugging Tools: React Developer Tools extension 
* Additional Libraries: React Query, React Router

* Backend: Firebase API, Cloudinary 
  Service: Authentication and Realtime Database

## Reflection <a name="reflection"></a>

### Context for the Project

This project aims to enhance my understanding of React Router, React Query, the process of implementing authentication, and how to perform CRUD operations on the front end by making requests to the back end (firebase). 

### Objective

React Query: Utilize the React Query library to synchronize the updated or newly added product data from Firebase.

React Router: Utilize the React Router to restrict access to the cart and new product registration pages for non-logged-in users and non-administrators.  

API Integration: Integrate the Firebase Authentication and Realtime Database API to implement user authentication and fetch user and product data functionality.  

### Challenges and Learning Experiences

Throughout the development of Yoon's Shoppy project, I encountered several challenges that provided valuable learning experiences. 

1. Preventing unauthorized users from accessing restricted pages 

I encountered a security problem: unauthorized users can access restricted cart and administration pages. To solve this problem, I added logic to check if the current user is authorized so that only authorized users can access restricted pages and prevent them access to those pages using URL history when they log out by using Navigate replace functionality which helps not to leave URL history.

2. Redirecting to the main page problem when hitting the refresh button

I encountered a bug where users were redirected to the main page when hitting refresh, regardless of their current page. The issue arose because fetching user authorization information took some time, and during rerendering, the code mistakenly redirected users to the main page, assuming they were unauthorized. To resolve this, I implemented a loading status that displays nothing until the user information is fetched. Once the data is available, the exact page where the user was browsing is shown.

3. Wrong knowledge about useMutation functionality in ReactQuery

I encountered a bug where data synchronization with the server failed when adding a new product. The cause was I thought the onSucceed option was called after the callback function execution was finished. However, the OnSucceed option is called immediately after the function to add a new product is called. Since the onSucceed option is called as soon as the adding a new product function is called, the invalidateQueires, which is passed to as a callback function for onSucceed option, don't call new data from the server; The function to add a new product is executed asynchronously after finishing executing invalidQueires. To solve this problem, I used the then function to call the callback function synchronously after the data is successfully added, ensuring proper data synchronization with the server.

