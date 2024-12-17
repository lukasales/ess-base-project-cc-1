# Architecture Pattern

The base project was created to give a quick "start" to the discipline's team projects. But, at the same time, we didn't want to give up a certain level of organization that helps to develop features safely and makes it easier to create tests.

## Table of Contents

1. [Separation into modules](#layered-architecture)
2. [Shared](#shared)
3. [Navigation](#navigation)
4. [Conclusion](#conclusion)

---

# Separation into modules

The idea here is that each flow or important part of the project is separated into modules. Let's imagine that you have an authentication section, where you can create an account, log in or even recover a password. We can consider this case as an authentication module.

## Components

The interface components that can be reused in other parts of the module in question would be created in the "components" folder. For example, a modal with terms of use that appears both in the login process and in account creation. Therefore, this modal would be located in the "autenticacao" module, inside the "components" folder.

## Pages

The pages would be where the "full screens" would go. For example, a login page would have inputs, buttons, and other components needed for that specific functionality.

## Context

The context is made up of a series of files that we will try to explain in parts. In general, this is where we concentrate our application's business logic, such as functions to make requests to the back-end and module state management, among other aspects.

To manage state, we will be using React's useReducer. Consequently, we will use actions logic to determine what changes should be made to the state.

### types.ts

As the name suggests, this is a type definition file. Here, we define the data types for the state, that is, the attributes that the state must have, and the types of actions, which basically define which actions can be used to manipulate the state.

### reducer.ts

In this file, we have the reducer function, which receives an action and the current state, and makes the necessary changes to the state based on that action.

### service.ts

The service file is where we concentrate the functions responsible for executing the business logic actions. These service functions are called from pages and components when needed.

### index.tsx

In this file, we create our provider (provider) using React Context. With it, we can share the state and services (services) throughout the application or in specific parts. If you have questions about Context, I recommend consulting the official React [documentation](https://react.dev/learn/passing-data-deeply-with-context).

# Shared

The "shared" folder is the representation of a module that contains information that can be reused in other modules. For example, it can include a generic button component that can be used in different parts of the application.

# Navigation

To navigate the application, we use the **react-router-dom** package, and its configuration is done in the **App.tsx** file. There's not much to explain here, it's simply the use of React in conjunction with the most popular navigation library.

# Conclusion

Certainly, there are more details about the functionalities that are used in the project. However, the **Home** module example case already covers many aspects, including testing. The base project is designed to make it easy, not to limit your preferences. What needs to be emphasized is that the main idea is the architecture used, which clearly distributes code responsibilities, thus facilitating maintenance and testing.
1. [Layered architecture](#layered-architecture)
2. [What is the Model for?](#what-is-the-model-for)
3. [Dependency Injection](#dependency-injection)
4. [Database](#database)
5. [Routes](#routes)
6. [Conclusion](#conclusion)

---

# Layered architecture

Layered architecture is a software design approach where the software is separated into different layers (functional areas), each with a specific role and responsibility. In a typical layered architecture, you will find the following layers:

## Entities Layer

This layer represents the business data and the rules or logic that govern access to and updates of this data. These are typically the business objects (like Users, Products, Orders, etc.) and are independent of any specific technological choice (database, external services, etc.). They just contain data and methods to manipulate this data.

## Repository Layer

This layer acts as a bridge between the entities (business data) and the database. It is responsible for all database operations like create, read, update, and delete (CRUD). It basically interacts with your database or any other storage system.

## Service Layer

This layer contains the business logic of your application. It uses the repository layer to persist or retrieve the business data, performs necessary processing and passes the data to the controller. The service layer acts as an intermediary between the web layer (controllers) and the data access layer (repositories).

## Controller Layer

This layer is responsible for handling user requests and controlling the flow of the application. It interacts with the service layer to perform business operations and sends back the responses to the client. In a web application, these are typically the endpoints of your API.

The layered architecture approach helps in separating concerns, making the software solution scalable, and also promotes high cohesion and low coupling. This design pattern is beneficial because it aligns with the Single Responsibility Principle (SRP), which is a key aspect of SOLID principles in software design and architecture. Each layer has a specific role and does not need to concern itself with the responsibilities of any other layer. This makes each layer independently modifiable and testable, leading to a software design that is easier to maintain and expand.

---

# What is the Model for?

Models here are not absolutely essential, but are primarily used as a final representation of returned data. Unlike entities, which we can think of as a direct representation of a database table in code, we use models to represent what we could return in an endpoint.
For example, when retrieving a user from the database, we might not want to return its password. In this case, the model could represent a user excluding the password field.

But we can follow for example the idea of [​​DTOs](https://www.okta.com/identity-101/dto/), which would also be a good idea.
Feel free to explore alternatives for representing these data operations.

# Dependency Injection

Is a design pattern that allows a system to be more flexible, testable, and modular. It's a form of Inversion of Control (IoC) which means that the control is inverted - instead of an object controlling its own dependencies, it's controlled by an outside party.

In our case, we came up with a "homemade" solution that, overall, works very well. We use the Injector class, which is in charge of controlling our application's dependencies through its methods: registerService, getService, registerRepository and getRepository. The use of this class can be seen in the index.ts file, located in the **src/di folder**.

# Database

The idea of ​​a base project may seem complex when it proposes to cover many possibilities of use. Considering a practical and simple case, in this base project we are using the idea of ​​a "database" at runtime. In the **src/database/index.ts** file, we can observe the implementation of a simple interface for a database, where each "table" would be a set of key-values. Please don't see this as a limiter. If you prefer, you can choose to use a real database, be it SQL or NoSQL. By maintaining a similar level of project organization, the benefits will be the same.

To manipulate our database with base methods, we have a class called BaseRepository. This will be extended by other repositories, thus allowing the inheritance of these methods and the reuse of our code's logic.

# Routes

Worth mentioning is our backend routes/endpoints definition file located at **src/routes/index.ts**. Its idea is simple: for each new controller, you can configure it inside 'export default' using **'app.use'**.

```
export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
  app.use(
    prefix,
    new ExampleController(router, di.getService(ExampleService)).router
  );
};

```

There is already an example in the file and the approach would be the same for all controllers. Thus, the controllers and their endpoints are registered and recognized in the application.

# Conclusion

Certainly, there are more details about the functionalities that are used in the project. However, the **Test** example case already covers many aspects, including testing. The base project is designed to make it easy, not to limit your preferences. What needs to be emphasized is that the main idea is the architecture used, which clearly distributes code responsibilities, thus facilitating maintenance and testing.
