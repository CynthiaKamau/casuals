function applyExtraSetup(sequelize) {
	const { worker, client, user, job, role, job_rating } = sequelize.models;

    user.belongsTo(role, { as: "role", foreignKey: "role_id"});
    role.hasMany(user, { as: "user", foreignKey: "role_id"});

    client.belongsTo(user, { as: "user", foreignKey: "user_id"});
    user.hasMany(client, { as: "user_client", foreignKey: "user_id"});

    worker.belongsTo(user, { as: "user", foreignKey: "user_id"});
    user.hasMany(worker, { as: "user_worker", foreignKey: "user_id"});

    job_rating.belongsTo(user, { as: "user", foreignKey: "user_id"});
    user.hasMany(job_rating, { as: "user_job_rating", foreignKey: "user_id"});

    job.belongsTo(user, { as: "client", foreignKey: "client_id"});
    user.hasMany(job, { as: "job", foreignKey: "client_id"});

    job.belongsTo(user, { as: "worker", foreignKey: "worker_id"});
    user.hasMany(job, { as: "worker_job", foreignKey: "worker_id"});

}

module.exports = { applyExtraSetup };