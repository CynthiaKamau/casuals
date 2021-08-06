const sequelize = require("../dbconfig");
const Sequelize = require("sequelize");
const Joi = require("joi");

const Jobs = sequelize.sequelize.define(
    'jobs',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(191),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(191),
            allowNull: false
        },
        location: {
            type: Sequelize.STRING(191),
            allowNull: false
        },
        preferance: {
            type: Sequelize.STRING(191),
            allowNull: true
        },
        date_added: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        validity: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        client_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        worker_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        ratings: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        created_by: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        },
        updated_by: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        },
        deleted_by: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        },
        restored_by: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        },
        restored_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'jobs',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "jobs_client_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            },
            {
                name: "jobs_worker_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            }
        ]
    }
);

function validateJob(job) {
    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .max(191)
            .required(),
        description: Joi.string()
            .min(3)
            .max(250)
            .required(),
        location: Joi.string()
            .required(),
        date_added: Joi.date()
            .required(),
        validity: Joi.date()
            .required(),
        client_id: Joi.number()
            .required(),
        worker_id: Joi.number()
            .required()
    });

    return schema.validate(job);
}

exports.Jobs = Jobs;
exports.validateJob = validateJob;