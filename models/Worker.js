const sequelize = require("../dbconfig");
const Sequelize = require('sequelize');
const Joi = require("joi");
const { User } = require('./User');

const Worker = sequelize.sequelize.define(
    'workers',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(191),
            allowNull: true,
            unique: "workers_username_unique"

        },
        gender: {
            type: Sequelize.ENUM('MALE', 'FEMALE', 'TRANS-GENDER', 'OTHER'),
            allowNull: true
        },
        dob: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        citizenship: {
            type: Sequelize.STRING(191),
            allowNull: true
        },
        address: {
            type: Sequelize.STRING(191),
            allowNull: true
        },
        profile_photo: {
            type: Sequelize.STRING(191),
            allowNull: true
        },
        skills: {
            type: Sequelize.STRING(191),
            allowNull: true
        },
        rate: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
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
        created_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        deleted_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        restored_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
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