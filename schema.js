//Dependencies
var express = require("express");
var { graphqlHTTP } = require("express-graphql");
const {
  buildSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
} = require("graphql");

const app = express();
const PORT = process.env.PORT || 3000;

//POSTGRES
const { Client } = require("pg");
const client = new Client({
  host: "codeboxx-postgresql.cq6zrczewpu2.us-east-1.rds.amazonaws.com",
  user: "codeboxx",
  password: "Codeboxx1!",
  database: "dominhannguyen",
});
client.connect(function (error) {
  if (!!error) {
    console.log("Can't connect to PSQL database.");
  } else {
    console.log("Connected to PSQL database.");
  }
});

//MYSQL
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "codeboxx.cq6zrczewpu2.us-east-1.rds.amazonaws.com",
  user: "codeboxx",
  password: "Codeboxx1!",
  database: "dominhannguyen",
});
connection.connect(function (error) {
  if (!!error) {
    console.log("Can't connect to mySQL database.");
  } else {
    console.log("Connected to mySQL database.");
  }
});

//Schema creation
const schema = new GraphQLSchema({
  query: RootQueryType,
});

export default schema;

//Type creation
const InterventionType = new GraphQLObjectType({
  name: "Intervention",
  description: "This is an intervention",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    startIntervention: { type: GraphQLNonNull(GraphQLInt) },
    endIntervention: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const AddressType = new GraphQLObjectType({
  name: "Address",
  description: "This is an address",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    address_type: { type: GraphQLString },
    status: { type: GraphQLString },
    entity: { type: GraphQLString },
    number_and_street: { type: GraphQLString },
    suite_and_apartment: { type: GraphQLString },
    city: { type: GraphQLString },
    postal_code: { type: GraphQLString },
    country: { type: GraphQLString },
    notes: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
  }),
});

const BuildingType = new GraphQLObjectType({
  name: "Building",
  description: "This is a building",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    admin_name: { type: GraphQLString },
    admin_email: { type: GraphQLString },
    admin_phone_numer: { type: GraphQLString },
    tech_full_name: { type: GraphQLString },
    tech_email: { type: GraphQLString },
    tech_phone_number: { type: GraphQLString },
    address_id: { type: GraphQLInt },
    customer_id: { type: GraphQLInt },
  }),
});

const BuildingDetailsType = new GraphQLObjectType({
  name: "Building Details",
  description: "This is the building details",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    information_key: { type: GraphQLString },
    value: { type: GraphQLString },
    building_id: { type: GraphQLInt },
  }),
});
//Queries
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    intervention: {
      type: InterventionType,
      description: "An intervention",
      args: {
        id: { type: GraphQLInt },
        startIntervention: { type: GraphQLInt },
        endIntervention: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        interventions.find((intervention) => intervention.id === args.id),
    },
    interventions: {
      type: new GraphQLList(InterventionType),
      description: "List of All Interventions",
      resolve: () => interventions,
    },
    addresses: {
      type: new GraphQLList(AddressType),
      description: "List of All Addresses",
      resolve: () => addresses,
    },
    address: {
      type: AddressType,
      description: "An Address",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        addresses.find((address) => address.id === args.id),
    },
  }),
});

//Express Server
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Server is running");
});
