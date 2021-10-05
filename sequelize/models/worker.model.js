const DataTypes = require('sequelize');
const Joi = require("joi");

module.exports = (sequelize) => {
  sequelize.define('worker',{
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user.models',
        key: 'id'
      }
    },
    profile_photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    citizenship: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    skills: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rate: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    restored_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user.models',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user.models',
        key: 'id'
      }
    },
    deleted_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user.models',
        key: 'id'
      }
    },
    restored_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user.models',
        key: 'id'
      }
    }
  }, {
  sequelize,
  tableName: 'workers',
  schema: 'public',
  timestamps: false,
  underscored: true,
  indexes: [
    {
      name: "worker_profiles_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
})
}

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

exports.validateWorker = validateWorker;



