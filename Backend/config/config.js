require("dotenv").config({ path: "./config/.env" });
module.exports = {
  development: {
    username: process.env.DATABASEUSERNAME,
    password: process.env.DATABASEPASSWORD,
    database: "database_development_groupomania",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASEUSERNAME,
    password: process.env.DATABASEPASSWORD,
    database: "database_test_groupomania",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASEUSERNAME,
    password: process.env.DATABASEPASSWORD,
    database: "database_production_groupomania",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
