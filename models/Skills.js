const sequelize = require("../db_config");
const Sequelize = require('sequelize');

const Skills = sequelize.sequelize.define(
    'skills',
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(191),
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 1
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
        }
    },
    {
        sequelize,
        tableName: 'skills',
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
        ]
    }
);

exports.Skills = Skills;