const axios = require("axios");

const fetchCars = async () => {
  try {
    const response = await axios.get(process.env.API_URL);
    return response.data;
  } catch (error) {
    console.error("Error in fetching cars:", error);
  }
};

module.exports = { fetchCars };
