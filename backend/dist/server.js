"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("./schema");
const context_1 = require("./context");
new graphql_yoga_1.GraphQLServer({ schema: schema_1.default, context: context_1.createContext() }).start(() => console.log(`🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql#5-using-the-graphql-api`));
