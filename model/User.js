const { sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../dbconfig');
const Joi = require("joi");

const User = sequelize.define('users',
{
    id: {
        autoincrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    first_name : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    middle_name : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    last_name : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(191),
        allowNull: true,
        unique: "users_email_unique"
    },
    msisdn: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: "users_msisdn_unique"
    },
    role_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    },
    email_verified_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING(191),
        allowNull: true
    },
    remember_token: {
        type: Sequelize.STRING(100),
        allowNull: true
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
            name: "users_msisdn_unique",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "msisdn"},
            ]
        },
        {
            name: "users_nckid_unique",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "nckid"},
            ]
        },
        {
            name: "users_role_id_foreign",
            using: "BTREE",
            fields: [
                {name: "role_id"},
            ]
        }
    ]
}        

);

exports.User = User;

