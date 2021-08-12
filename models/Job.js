const sequelize = require("../dbconfig");
const Datatypes= require("sequelize");
const Joi = require("joi");
const { Rating } = require("./Rating");

const Job = sequelize.sequelize.define(
    'jobs',
    {
        id: {
            autoIncrement: true,
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Datatypes.STRING(191),
            allowNull: false
        },
        description: {
            type: Datatypes.STRING(191),
            allowNull: false
        },
        location: {
            type: Datatypes.STRING(191),
            allowNull: false
        },
        preferance: {
            type: Datatypes.STRING(191),
            allowNull: true
        },
        date_added: {
            type: Datatypes.DATEONLY,
            allowNull: false
        },
        validity: {
            type: Datatypes.DATEONLY,
            allowNull: false
        },
        client_id: {
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        worker_id: {
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        status: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        created_by: {
            type: Datatypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        updated_by: {
            type: Datatypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        deleted_by: {
            type: Datatypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        restored_by: {
            type: Datatypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        restored_at: {
            type: Datatypes.DATE,
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
        worker_id: Joi.number(),
    }).unknown(true);

    return schema.validate(job);
}

Job.hasOne(Rating, { foreign_key : 'job_id'});

exports.Job = Job;
exports.validateJob = validateJob;