// import gql from "graphql";
// import Product from "../models/productSchema.js";
// import products from "../data/products.js";
// import { ApolloServer } from "apollo-server-express";

// export const typeDefs = gql`
//   type Product {
//     id: String!
//     title: String!
//     pictureURL: [String]!
//     price: Number!
//     description: String
//     stock: Number!
//     rating: Number!
//     category: String!
//     branch: String!
//   }

//   type Query {
//     totalCount: Int!
//     getProducts: [Product]!
//   }
// `;

// export const resolvers = {
//   Query: {
//     totalCount: () => products.length,
//     getProducts: () => products,
//   },
// };

// const graphqlServer = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
