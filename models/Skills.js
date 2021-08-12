const sequelize = require("../dbconfig");
const Datatypes = require('sequelize');

const Skills = sequelize.sequelize.define(
    'skills',
    {
        id: {
            autoIncrement: true,
            type: Datatypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Datatypes.STRING(191),
            allowNull: false
        },
        status: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
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