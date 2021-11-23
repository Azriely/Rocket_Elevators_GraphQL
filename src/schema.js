//Dependencies
const { buildSchema } = require("graphql");

//POSTGRES
const {Client} = require('pg')
const client = new Client({
    host: 'codeboxx-postgresql.cq6zrczewpu2.us-east-1.rds.amazonaws.com',
    user: 'codeboxx',
    password: 'Codeboxx1!',
    database: 'dominhannguyen'
});
client.connect(function(error){
    if (!!error) {
        console.log("Can't connect to PSQL database.")
    } else {
        console.log("Connected to PSQL database.")
    }
});

//MYSQL
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'codeboxx.cq6zrczewpu2.us-east-1.rds.amazonaws.com',
    user: 'codeboxx'  ,
    password: 'Codeboxx1!',
    database: 'dominhannguyen'  

});
connection.connect(function(error){
    if (!!error) {
        console.log("Can't connect to mySQL database.");
    } else {
        console.log("Connected to mySQL database.");
    }
});


//Schema creation
const schema = buildSchema(`
    type Query {
        users: [User!]!,
        user(id: Int!): User!
    }

    type User {
        id: ID!
        name: String!
        email: String
        posts: [Post!]
    }

    type Post {
        id: ID!
        title: String!
        published: Boolean!
        link: String
    }
`);

module.exports = schema;