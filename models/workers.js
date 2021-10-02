const sequelize = require("../dbconfig");
const DataTypes = require('sequelize');
const Joi = require("joi");
const { User } = require('./users');
const { Job } = require('./jobs');

const Worker = sequelize.sequelize.define(
  'workers',
  {
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
        model: 'users',
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
        model: 'users',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    deleted_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    restored_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
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
  }
);

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

Worker.belongsTo(User, { foreignKey : 'user_id'});
Worker.hasMany(Job, { foreignKey: 'worker_id', as: 'jobs'});

exports.Worker = Worker;
exports.validateWorker = validateWorker;



