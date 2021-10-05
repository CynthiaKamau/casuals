const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('skill', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'skills',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "skills_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
