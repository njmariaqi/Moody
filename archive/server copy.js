const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require('path');
const resolvers = require('./schemas/resolvers');
const typeDefs = require('./schemas/typeDefs');
const { authMiddleware } = require("./utils/auth");
const db = require('./config/connection');
const { createProxyMiddleware } = require('http-proxy-middleware');

async function startServer(typeDefs, resolvers, authMiddleware) {
  const PORT = process.env.PORT || 3001;
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  // app.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000',
  //     changeOrigin: true,
  //   })
  // );
  server.applyMiddleware({ app });
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('/api/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startServer(typeDefs, resolvers, authMiddleware);



