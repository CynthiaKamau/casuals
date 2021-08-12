const sequelize = require("../dbconfig");
const Datatypes = require('sequelize');
const Joi = require("joi");
const { User } = require('./User');

const Worker = sequelize.sequelize.define(
    'workers',
    {
        id: {
            autoIncrement: true,
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Datatypes.STRING(191),
            allowNull: true,
            unique: "workers_username_unique"

        },
        gender: {
            type: Datatypes.ENUM('MALE', 'FEMALE', 'TRANS-GENDER', 'OTHER'),
            allowNull: true
        },
        dob: {
            type: Datatypes.DATEONLY,
            allowNull: true
        },
        citizenship: {
            type: Datatypes.STRING(191),
            allowNull: true
        },
        address: {
            type: Datatypes.STRING(191),
            allowNull: true
        },
        profile_photo: {
            type: Datatypes.STRING(191),
            allowNull: true
        },
        skills: {
            type: Datatypes.STRING(191),
            allowNull: true
        },
        rate: {
            type: Datatypes.INTEGER,
            allowNull: true
        },
        user_id: {
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
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
        created_at: {
            type: Datatypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: Datatypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: Datatypes.DATE,
            allowNull: true
        },
        restored_at: {
            type: Datatypes.DATE,
            allowNull: true
        }
    },
    {
        Datatypes,
        tableName: 'workers',
        timestamps: true,
        paranoid: true,
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
                name: "workers_user_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            },
            {
                name: "workers_username_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "username"},
                ]

            }
        ]
    }
);

function validateWorker(Worker) {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(191)
            .required(),
        gender: Joi.string()
            .required(),
        dob: Joi.date()
            .required(),
        citizenship: Joi.string()
            .required(),
        address: Joi.string()
            .required(),
        user_id: Joi.number()
            .required()
    });

    return schema.validate(Worker);
}

Worker.belongsTo(User, {foreign_key : 'user_id'});
exports.Worker = Worker;
exports.validateWorker = validateWorker;