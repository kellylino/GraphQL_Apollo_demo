# GraphQL Apollo Demo

## Project Overview

This project showcases a full-stack implementation of a GraphQL API using Apollo Client and Apollo Server.
The application demonstrates the power of GraphQL for handling complex data queries and interactions.
It highlights seamless communication between the frontend and backend while integrating a MongoDB database for persistent data management.

## Key Features

- **Backend Development**:
  - Built a GraphQL server with Apollo Server, including custom resolvers and schema definitions.
  - Implemented efficient data querying using MongoDB for database integration.

- **Frontend Integration**:
  - Utilized Apollo Client to fetch and display data dynamically in a React.js application.
  - Integrated query caching and dynamic updates to optimize user experience.

- **Database Handling**:
  - Designed and managed collections in MongoDB to support robust and flexible data querying.
  - Used mock data for testing before implementing MongoDB-based queries.

- **API Design**:
  - Developed a scalable API with support for flexible and granular data fetching through GraphQL queries and mutations.

## Technologies Used

 - React, Apollo Client, Apollo Server, GraphQL, MongoDB, JWT, Express.js.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd GraphQL_Apollo_demo

2. Install dependencies for both Apollo Server and Apollo Client:
   ```bash
   cd ApolloServer
   npm install
   cd ../ApolloClient
   npm install

3. Start the backend server:
   ```bash
   cd ApolloServer
   npm run dev

4. Start the frontend application:
   ```bash
   cd ../ApolloClient
   node index.js
