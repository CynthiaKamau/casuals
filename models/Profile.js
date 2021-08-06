const sequelize = require("../db_config");
const Sequelize = require('sequelize');
const Joi = require("joi");

const Profile = sequelize.sequelize.define(
    'profiles',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(191),
            allowNull: true
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
        restored_at: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'profiles',
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
                name: "profiles_user_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            },
            {
                name: "profiles_facility_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "facility_id"},
                ]
            },
            {
                name: "profiles_cadre_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "cadre_id"},
                ]
            },
            {
                name: "profiles_department_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "department_id"},
                ]
            },
            {
                name: "profiles_licence_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "licence_id"},
                ]
            },
        ]
    }
);

function validateProfile(profile) {
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

    return schema.validate(profile);
}

exports.Profile = Profile;
exports.validateProfile = validateProfile;