//Dependencies
var express = require("express");
var { graphqlHTTP } = require("express-graphql");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull, //TODO: Can't get NonNull to work yet, so not being used atm.
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");

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

//Type creation
const InterventionType = new GraphQLObjectType({
  name: "Intervention",
  description: "This is an intervention",
  fields: () => ({
    id: { type: GraphQLInt },
    employee_id: { type: GraphQLString },
    battery_id: { type: GraphQLString },
    column_id: { type: GraphQLString },
    elevator_id: { type: GraphQLString },
    intervention_start_time: { type: GraphQLDateTime },
    intervention_end_time: { type: GraphQLDateTime },
    result: { type: GraphQLString },
    report: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const AddressType = new GraphQLObjectType({
  name: "Address",
  description: "This is an address",
  fields: () => ({
    id: { type: GraphQLInt },
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
    id: { type: GraphQLInt },
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

const BuildingDetailType = new GraphQLObjectType({
  name: "BuildingDetails",
  description: "This is the building details",
  fields: () => ({
    id: { type: GraphQLInt },
    information_key: { type: GraphQLString },
    value: { type: GraphQLString },
    building_id: { type: GraphQLInt },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  description: "This is a customer",
  fields: () => ({
    id: { type: GraphQLInt },
    company_name: { type: GraphQLString },
    company_contact_name: { type: GraphQLString },
    contact_phone: { type: GraphQLString },
    contact_email: { type: GraphQLString },
    company_description: { type: GraphQLString },
    service_tech_name: { type: GraphQLString },
    service_tech_phone: { type: GraphQLString },
    service_tech_email: { type: GraphQLString },
    address_id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
  }),
});

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  description: "This is an employee",
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    title: { type: GraphQLString },
    email: { type: GraphQLString },
    user_id: { type: GraphQLInt },
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
        employee_id: { type: GraphQLString },
        battery_id: { type: GraphQLString },
        column_id: { type: GraphQLString },
        elevator_id: { type: GraphQLString },
        intervention_start_time: { type: GraphQLDateTime },
        intervention_end_time: { type: GraphQLDateTime },
        result: { type: GraphQLString },
        report: { type: GraphQLString },
        status: { type: GraphQLString },
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
      },
      resolve: (parent, args) =>
        addresses.find((address) => address.id === args.id),
    },
    building: {
      type: BuildingType,
      description: "A building",
      args: {
        id: { type: GraphQLInt },
        admin_name: { type: GraphQLString },
        admin_email: { type: GraphQLString },
        admin_phone_numer: { type: GraphQLString },
        tech_full_name: { type: GraphQLString },
        tech_email: { type: GraphQLString },
        tech_phone_number: { type: GraphQLString },
        address_id: { type: GraphQLInt },
        customer_id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        buildings.find((building) => building.id === args.id),
    },
    buildings: {
      type: new GraphQLList(BuildingType),
      description: "List of all buildings",
      resolve: () => buildings,
    },
    buildingDetail: {
      type: BuildingDetailType,
      description: "Building details",
      args: {
        id: { type: GraphQLInt },
        information_key: { type: GraphQLString },
        value: { type: GraphQLString },
        building_id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        buildingDetails.find((buildingDetail) => buildingDetail.id === args.id),
    },
    buildingDetails: {
      type: new GraphQLList(BuildingDetailType),
      description: "List of all building details",
      resolve: () => buildingDetails,
    },
    customer: {
      type: CustomerType,
      description: "A customer",
      args: {
        id: { type: GraphQLInt },
        company_name: { type: GraphQLString },
        company_contact_name: { type: GraphQLString },
        contact_phone: { type: GraphQLString },
        contact_email: { type: GraphQLString },
        company_description: { type: GraphQLString },
        service_tech_name: { type: GraphQLString },
        service_tech_phone: { type: GraphQLString },
        service_tech_email: { type: GraphQLString },
        address_id: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        customers.find((customer) => customer.id === args.id),
    },
    customers: {
      type: new GraphQLList(CustomerType),
      description: "List of all customers",
      resolve: () => customers,
    },
    employee: {
      type: EmployeeType,
      description: "An employee",
      args: {
        id: { type: GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        title: { type: GraphQLString },
        email: { type: GraphQLString },
        user_id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        employees.find((employee) => employee.id === args.id),
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      description: "List of all employees",
      resolve: () => employees,
    },
  }),
});

//Schema creation
const schema = new GraphQLSchema({
  query: RootQueryType,
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
