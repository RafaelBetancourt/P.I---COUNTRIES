const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {

    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      set(id) {
        this.setDataValue('id', id.toUpperCase())
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(name) {
        this.setDataValue('name', name.toUpperCase())
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      set(continent) {
        this.setDataValue('continent', continent.toUpperCase())
      }
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.INTEGER
    },
    population: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamp: false
  });
};


