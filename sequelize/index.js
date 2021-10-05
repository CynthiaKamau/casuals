const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
require("dotenv").config();

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const port = process.env.DB_PORT;
const db_server = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
	host: db_server,
	port: port,
	dialect: "postgres",
});

const modelDefiners = [
	require('./models/user.model'),
	require('./models/client.model'),
	require('./models/worker.model'),
    require('./models/job.model'),
    require('./models/role.model'),
    require('./models/job_rating.model'),
    require('./models/skill.model'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;