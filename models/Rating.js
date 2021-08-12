const sequelize = require("../dbconfig");
const Datatypes = require('sequelize');

const Rating = sequelize.sequelize.define(
    'job_ratings',
    {
        id: {
            autoIncrement: true,
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        job_id: {
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'jobs',
                key: 'id'
            }
        },
        rating: {
            type: Datatypes.INTEGER,
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
    },{
        sequelize,
        tableName: 'job_ratings',
        timestamps: false,
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
                name: "ratings_job_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "job_id"},
                ]
            },
            {
                name: "ratings_user_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            },
        ]

    }
);

exports.Rating = Rating;