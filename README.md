# Profile Pilot

An application that allows users to generate public URLs that they can share with friends. The shared URL's will take users to that profile page which will
display a username, profile photo, and answers to a questionaire that user filled out on signup.

# Table of Contents

- [Profile Pilot](#profile-pilot)
  - [Features](#features)
  - [Demonstration](#demonstration)
  - [How to Install and Run the Project](#how-to-install-and-run-the-project)
  - [Technical Decisions](#technical-decisions)
  - [Technical problems and Known Applciation Bugs](#technical-problems-and-known-applciation-bugs)
  - [Successes and Reflection](#successes-and-reflection)

## Features

- [x] Allow users to login with a third-party service like Google, Facebook, Twitter, etc.
- [x] Presents user with questionaire of at least 3 questions at signup. Questions can be anything the developer would like.
- [x] Allow users to share a public URL that displays the user's username, profile photo, and their answers to the questionaire:

## Demonstration

![ezgif com-video-to-gif (3)](https://user-images.githubusercontent.com/49503056/222808860-553e329b-05cf-454a-a2a6-cb4f435d8f79.gif)

## How to Install and Run the Project

To install the project clone the repo on your local machine.

```basch
git clone https://github.com/Mattwwilson34/profile-pilot.git
```

Then run install the project dependencies with npm.

```
npm install
```

Then start up the development server with vite.

```
npm run dev
```

Once the deverlopment server is running you can view the application in your browser of choice at the URL

```
http://localhost:5173/
```

Testing for the application is handled with Jest.

```
npm run test
```

Linting for the application is handled with Eslint.

```
npm run lint
```

Formating for the application is handled with Prettier.

```
npm run format
```

## Technical Decisions

**_Backend_**

- **_Firebase_**: I chose to Firebase as my backend due to the requirements of the project. The need to login and authenticate users
  with a third party service means that Google Firestore was a perfect choice. It provides me a quick and secure way of authenticating my users as well
  as persisting their login state and saving their data to the Firestore. Addtionally, since I will need to deploy this application
  Firebase provides another benefit with its cloud hosting services and convient CLI depoloyment tools.

**_Frontend_**

- **_Build tool_**
  - **_Vite_**: Provides fast build times and hot module reload reducing the time it takes to see code changes reflected in the browser during development.
    It is also a new build tool that I am experimenting with so it gives me another oppurtunity to further my understanding of the tech.
- **_Framework_**

  - **_React_**: Most of my frontend developement experience has been using React. It is what I am most comfotable with and also what I belive will allow
    me to write production quality code with the least friction

- **_Language_** -**_TypeScript_**: TypeScript is a superset of JavaScript that provides static typing to catch common errors at compile time rather than runtime,
  IDE support with improved code completion, syntax highlighting, and error checking, and it is also a language I am working on improving my skills in.
- **_Material UI_**:a popular open-source React component library that provides a set of pre-built UI components that follow Google's Material Design
  guidelines. I chose this because it allows me to quickly build high-quality, visually appealing user interfaces without having to spend a lot of time on
  design or styling.

- **_Jest_**: Jest is my testing framework of choice for React application mainly because it is currently the only testing library I have experience with.

- **_ESLing/Prettier_**: My formatting and style tools of choice will be ESLint and Prettier. They are very popular tools with great documention and
  will help me to write cleaner, more consistent, and more maintainable code.

  ## Technical problems and Known Applciation Bugs

  While building the project, I encountered some technical difficulties, particularly with Google Authentication and providing that data via a React context provider. I spent a significant amount of time building out the AuthContextProvider component to manage my application's user authorization state, ensuring that it had 100% test coverage. However, I ran into issues when I needed to keep my users' state up-to-date with the Firebase Firestore DB.

  The Google auth listener recommended by Firebase documentation provides only a static user object that is not coupled with the application's Firestore. Therefore, when I saved a user's survey data to the user document in Firestore, the Google auth listener was not triggered, and I had no access to this updated user information in the application.

  To address this problem, I leveraged React Query in the root route of my application. Initially, I tried using one of my database functions, which takes a user ID and returns a user document, but I encountered an issue where my Google auth context provider would always render with an initial state of undefined before re-rendering with the actual user Authentication object. As a result, React Query passed an incorrect document ID parameter to my database function, resulting in an error being thrown and no user data being available.

  After trying to refactor the authentication context without success, I opted to perform a complete refactor of the root route. Instead of using the Firebase Firestore database, I chose to use local storage as it is a synchronous operation. By adding local storage functionality to the application, I was able to resolve the bug that had prevented me from using react query to retrieve user information from the Firestore database.

  I believe that the bug was likely caused by my own error in implementing the auth context, so I plan to review best practices for Firebase auth context in future applications.

  **_Bugs:_**

  **_Browser_**

  - The Firebase GoogleAuth signinWithRedirect method has an existing bug with the Safari web browser. Unfortunately, this means that the user is not persisted in the Firebase auth provider, and I am unable to persist a user's login state as the application is currently written.
    - To resolve this issue, one solution would be to refactor the application to use the signinWithPopup method, which the Google documentation suggests as an alternative until the bug is fixed on their end.

  **_URL_**

  - Currently, when the application is loaded without being logged in, the URL that the user is taken to is /survey. Although the correct component and functionality are present, the URL is not correct.

  ## Successes and Reflection

  **_Successes:_**

  - [x] Implemented continuous integration and deployment pipelines to cover the entire development life cycle of my application.
  - [x] Enhanced my unit testing proficiency using the Jest testing framework, particularly in mocking external dependencies such as React Query and React Context Providers.
  - [x] Applyed TypeScript methodologies throughout the life cycle of my application to enhance my TypeScript skills.
  - [x] Leveraged continuous integration practices for code formatting with Prettier, enforcing code style with ESLint, and achieving test coverage using the Jest testing framework to safeguard the main branch of my application.

  **_Reflection:_**

  Overall, this project proved to be an excellent learning experience for me. It helped me to significantly improve my confidence and skill set in application testing, and provided me with valuable insights into the challenges of ensuring comprehensive test coverage before committing to a repository. Additionally, while encountering some off-context issues, I was able to delve deeper into how React handles these issues and gained a lot of knowledge in this area. However, there is still much more to learn in this field.

  Moving forward, I plan to seek guidance from an experienced React developer, particularly one who has more extensive experience with context providers and user authentication in an industrial setting. This will enable me to develop more scalable applications and continue to expand my knowledge in this area.
