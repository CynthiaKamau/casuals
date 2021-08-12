const sequelize = require("../dbconfig");
const Datatypes = require('sequelize');
const Joi = require("joi");
const { Rating } = require("./Rating");

const User = sequelize.sequelize.define(
    'users',
    {
        id: {
            autoIncrement: true,
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: Datatypes.STRING(191),
            allowNull: false
        },
        middle_name: {
            type: Datatypes.STRING(191),
            allowNull: true
        },
        last_name: {
            type: Datatypes.STRING(191),
            allowNull: false
        },
        email: {
            type: Datatypes.STRING(191),
            allowNull: false,
            unique: "users_email_unique"
        },
        phone_number: {
            type: Datatypes.STRING(191),
            allowNull: false,
            unique: "users_phonenumber_unique"
        },
        role_id: {
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        status: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        email_verified_at: {
            type: Datatypes.DATE,
            allowNull: true
        },
        password: {
            type: Datatypes.STRING(191),
            allowNull: true
        },
        remember_token: {
            type: Datatypes.STRING(100),
            allowNull: true
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
        tableName: 'users',
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
                name: "users_email_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "email"},
                ]
            },
            {
                name: "users_phonenumber_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "phone_number"},
                ]
            },
            {
                name: "users_role_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "role_id"},
                ]
            },
        ],
    },
    
);

function registrationValidation(user) {
    const schema = Joi.object({
        first_name: Joi.string()
            .min(3)
            .max(20)
            .required(),
        middle_name: Joi.string()
            .min(3)
            .max(20),
        last_name: Joi.string()
            .min(3)
            .max(20)
            .required(),
        phone_number: Joi.string()
            .max(15)
            .min(10)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required(),
        role_id: Joi.number()
    }).unknown(true);

    return schema.validate(user);
}

function loginValidation(user) {
    const schema = Joi.object({
        phone_number: Joi.string()
            .max(15)
            .min(10)
            .required(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required(),
    }).unknown(true);

    return schema.validate(user);
}

User.hasMany(Rating, {foreignKey : 'user_id' }); 

exports.User = User;
exports.registrationValidation = registrationValidation
exports.loginValidation = loginValidation;