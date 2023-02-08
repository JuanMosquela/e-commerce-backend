import Product from "../models/productSchema.js";
import { gql, ApolloServer } from "apollo-server";

const typeDefinitions = gql`
  type Product {
    id: String!
    title: String!
    pictureURL: [String]!
    price: String!
    description: String
    stock: String!
    rating: String!
    category: String!
    branch: String!
  }

  type Query {
    totalCount: Int!
    getProducts: [Product]!
    getProductById(id: String): Product
  }
`;

const resolversFunctions = {
  Query: {
    totalCount: async () => await Product.countDocuments(),
    getProducts: async () => await Product.find({}),
    getProductById: async (_, { id }) => await Product.findById(id),
  },
};

const graphqlServer = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers: resolversFunctions,
});

export default graphqlServer;
