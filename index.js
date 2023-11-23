const { ApolloServer } = require("apollo-server");
// Import the GraphQL schema from the schema.graphql file
const { importSchema } = require("graphql-import"); 
// Import the custom EtherDataSource 
const EtherDataSource = require("./datasource/ethDatasource");
// Import the schema
const typeDefs = importSchema("./schema.graphql"); 

require("dotenv").config();

// Resolvers map the GraphQL queries to the EtherDataSource methods
const resolvers = {
 Query: {
   etherBalanceByAddress: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.etherBalanceByAddress(),

   totalSupplyOfEther: (root, _args, { dataSources }) =>  
     dataSources.ethDataSource.totalSupplyOfEther(),

   latestEthereumPrice: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.getLatestEthereumPrice(),

   blockConfirmationTime: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.getBlockConfirmationTime(),
 },
};


// Create ApolloServer instance
const server = new ApolloServer({
 typeDefs,
 resolvers,
 dataSources: () => ({
   // Instantiate the EtherDataSource
   ethDataSource: new EtherDataSource(),  
 }), 
});

// Set timeout to 0 to disable timeouts
server.timeout = 0;
// Start the server
server.listen("9000").then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`);
});