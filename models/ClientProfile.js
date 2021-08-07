const sequelize = require("../dbconfig");
const Sequelize = require('sequelize');
const Joi = require("joi");

const ClientProfile = sequelize.sequelize.define(
    'client_profiles',
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
            unique: "client_profiles_username_unique"
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
        restored_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'client_profiles',
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
                name: "client_profiles_user_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            },
            {
                name: "client_profiles_username_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "username"},
                ]

            }
        ]
    }
);

function validateClientProfile(client) {
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

exports.ClientProfile = ClientProfile;
exports.validateClientProfile = validateClientProfile;