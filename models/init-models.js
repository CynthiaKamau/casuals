var DataTypes = require("sequelize").DataTypes;
var _clients = require("./clients");
var _job_ratings = require("./job_ratings");
var _jobs = require("./jobs");
var _roles = require("./roles");
var _skills = require("./skills");
var _users = require("./users");
var _workers = require("./workers");

function initModels(sequelize) {
  var clients = _clients(sequelize, DataTypes);
  var job_ratings = _job_ratings(sequelize, DataTypes);
  var jobs = _jobs(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var skills = _skills(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var workers = _workers(sequelize, DataTypes);

  job_ratings.belongsTo(jobs, { as: "job", foreignKey: "job_id"});
  jobs.hasMany(job_ratings, { as: "job_ratings", foreignKey: "job_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  clients.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(clients, { as: "clients", foreignKey: "created_by"});
  clients.belongsTo(users, { as: "deleted_by_user", foreignKey: "deleted_by"});
  users.hasMany(clients, { as: "deleted_by_clients", foreignKey: "deleted_by"});
  clients.belongsTo(users, { as: "restored_by_user", foreignKey: "restored_by"});
  users.hasMany(clients, { as: "restored_by_clients", foreignKey: "restored_by"});
  clients.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(clients, { as: "updated_by_clients", foreignKey: "updated_by"});
  clients.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(clients, { as: "user_clients", foreignKey: "user_id"});
  job_ratings.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(job_ratings, { as: "job_ratings", foreignKey: "created_by"});
  job_ratings.belongsTo(users, { as: "deleted_by_user", foreignKey: "deleted_by"});
  users.hasMany(job_ratings, { as: "deleted_by_job_ratings", foreignKey: "deleted_by"});
  job_ratings.belongsTo(users, { as: "restored_by_user", foreignKey: "restored_by"});
  users.hasMany(job_ratings, { as: "restored_by_job_ratings", foreignKey: "restored_by"});
  job_ratings.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(job_ratings, { as: "updated_by_job_ratings", foreignKey: "updated_by"});
  job_ratings.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(job_ratings, { as: "user_job_ratings", foreignKey: "user_id"});
  jobs.belongsTo(users, { as: "client", foreignKey: "client_id"});
  users.hasMany(jobs, { as: "jobs", foreignKey: "client_id"});
  jobs.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(jobs, { as: "created_by_jobs", foreignKey: "created_by"});
  jobs.belongsTo(users, { as: "deleted_by_user", foreignKey: "deleted_by"});
  users.hasMany(jobs, { as: "deleted_by_jobs", foreignKey: "deleted_by"});
  jobs.belongsTo(users, { as: "restored_by_user", foreignKey: "restored_by"});
  users.hasMany(jobs, { as: "restored_by_jobs", foreignKey: "restored_by"});
  jobs.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(jobs, { as: "updated_by_jobs", foreignKey: "updated_by"});
  jobs.belongsTo(users, { as: "worker", foreignKey: "worker_id"});
  users.hasMany(jobs, { as: "worker_jobs", foreignKey: "worker_id"});
  users.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(users, { as: "users", foreignKey: "created_by"});
  users.belongsTo(users, { as: "deleted_by_user", foreignKey: "deleted_by"});
  users.hasMany(users, { as: "deleted_by_users", foreignKey: "deleted_by"});
  users.belongsTo(users, { as: "restored_by_user", foreignKey: "restored_by"});
  users.hasMany(users, { as: "restored_by_users", foreignKey: "restored_by"});
  users.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(users, { as: "updated_by_users", foreignKey: "updated_by"});
  workers.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(workers, { as: "workers", foreignKey: "created_by"});
  workers.belongsTo(users, { as: "deleted_by_user", foreignKey: "deleted_by"});
  users.hasMany(workers, { as: "deleted_by_workers", foreignKey: "deleted_by"});
  workers.belongsTo(users, { as: "restored_by_user", foreignKey: "restored_by"});
  users.hasMany(workers, { as: "restored_by_workers", foreignKey: "restored_by"});
  workers.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(workers, { as: "updated_by_workers", foreignKey: "updated_by"});
  workers.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(workers, { as: "user_workers", foreignKey: "user_id"});

  return {
    clients,
    job_ratings,
    jobs,
    roles,
    skills,
    users,
    workers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
