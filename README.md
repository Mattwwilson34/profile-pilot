# Profile Pilot

An application that allows users to generate public URLs that they can share with friends. The shared URL's will take users to that profile page which will
display a username, profile photo, and answers to a questionaire that user filled out on signup.

## Features
* [ ] Allow users to login with a third-party service like Google, Facebook, Twitter, etc.
* [ ] Presents user with questionaire of at least 3 questions at signup. Questions can be anything the developer would like.
* [ ] Allow users to share a public URL that displays the user's username, profile photo, and their answers to the questionaire

## Technical Decisions

***Backend***
  - ***Firebase***: I chose to Firebase as my backend due to the requirements of the project. The need to login and authenticate users
  with a third party service means that Google Firestore was a perfect choice. It provides me a quick and secure way of authenticating my users as well
  as persisting their login state and saving their data to the Firestore. Addtionally, since I will need to deploy this application 
  Firebase provides another benefit with its cloud hosting services and convient CLI depoloyment tools.

***Frontend***
- ***Build tool***
  - ***Vite***: Provides fast build times and hot module reload reducing the time it takes to see code changes reflected in the browser during development.
    It is also a new build tool that I am experimenting with so it gives me another oppurtunity to further my understanding of the tech.
    
- ***Framework***
  - ***React***: Most of my frontend developement experience has been using React. It is what I am most comfotable with and also what I belive will allow
  me to write production quality code with the least friction

- ***Language***
  -***TypeScript***: TypeScript is a superset of JavaScript that provides static typing to catch common errors at compile time rather than runtime,
  IDE support with improved code completion, syntax highlighting, and error checking, and it is also a language I am working on improving my skills in.
  
- ***Material UI***:a popular open-source React component library that provides a set of pre-built UI components that follow Google's Material Design 
guidelines. I chose this because it allows me to quickly build high-quality, visually appealing user interfaces without having to spend a lot of time on 
design or styling.

- ***Jest***: Jest is my testing framework of choice for React application mainly because it is currently the only testing library I have experience with.

- ***ESLing/Prettier***: My formatting and style tools of choice will be ESLint and Prettier. They are very popular tools with great documention and
will help me to write cleaner, more consistent, and more maintainable code.
  
  
