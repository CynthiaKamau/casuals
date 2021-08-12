const sequelize = require("../dbconfig");
const Sequelize = require('sequelize');
const Joi = require("joi");
const { User} = require('./User');

const Client = sequelize.sequelize.define(
    'clients',
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
            unique: "clients_username_unique"
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
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
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
        tableName: 'clients',
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
                name: "clients_user_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            },
            {
                name: "clients_username_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "username"},
                ]

            }
        ]
    }
);

function validateClient(client) {
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

    return schema.validate(client);
}

Client.belongsTo(User, {foreign_key : 'user_id'});

exports.Client = Client;
exports.validateClient = validateClient;
