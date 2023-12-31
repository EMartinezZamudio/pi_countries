const axios = require("axios");
const { Country } = require("../db");

const saveDataCountries = async () => {
  const { data } = await axios("http://localhost:5000/countries");

  const promises = data.map((country) => {
    const {
      translations,
      continents,
      capital,
      subregion,
      area,
      population,
      flags,
      cca3,
    } = country;

    let capitalNombre;
    if (Array.isArray(capital)) {
      capitalNombre = capital[0];
    }

    const newCountry = {
      id: cca3,
      name: translations.spa.common,
      continente: continents[0],
      capital: capitalNombre,
      subregion,
      area,
      poblacion: population,
      imagen: flags.svg,
    };

    return Country.create(newCountry);
  });

  return Promise.all(promises).then(() => {
    return "informacion guardada en la base de datos";
  });
};

module.exports = saveDataCountries;
