const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      released: {
        type: DataTypes.DATEONLY,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      parent_platforms: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      image:{
        type: DataTypes.STRING,
        
      },
      createdInDb:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

    },
    { timestamps: false }
  );
};
