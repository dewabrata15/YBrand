'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      });
      Product.belongsTo(models.User, {
        foreignKey: 'authorId'
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product name is required",
        },
        notNull: {
          msg: "Product name is required",
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description name is required",
        },
        notNull: {
          msg: "Description name is required",
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price is required",
        },
        notNull: {
          msg: "Price is required",
        },
        min: {
          args: [0],
          msg: 'Price must be at least 0',
        },
      }
    },
    stock: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category Id is required",
        },
        notEmpty: {
          msg: "Category Id is required",
        },
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Author Id is required",
        },
        notEmpty: {
          msg: "Author Id is required",
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};