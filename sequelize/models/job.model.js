const DataTypes = require("sequelize");
const Joi = require("joi");

module.exports = (sequelize) => {
  sequelize.define('job',{
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_added: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    validity: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    client_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user.models',
        key: 'id'
      }
    },
    worker_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user.models',
        key: 'id'
      }
    },
    preferance: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    location: {
      type: DataTypes.STRING(255),
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
    },
    restored_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
  sequelize,
  tableName: 'jobs',
  schema: 'public',
  timestamps: false,
  underscored: true,
  indexes: [
    {
      name: "jobs_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});
}

function validateJob(job) {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(191)
      .required(),
    description: Joi.string()
      .min(3)
      .max(250)
      .required(),
    location: Joi.string()
      .required(),
    date_added: Joi.date()
      .required(),
    validity: Joi.date()
      .required(),
    client_id: Joi.number()
      .required(),
    worker_id: Joi.number(),
  }).unknown(true);

  return schema.validate(job);
};

module.exports.validateJob = validateJob;

