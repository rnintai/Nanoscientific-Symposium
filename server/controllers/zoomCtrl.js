// const { europeConnection } = require("../dbConfig");
const axios = require("axios");
const path = require("path");
const jwt = require("jsonwebtoken");

const payload = {
  iss: process.env.ZOOM_API_KEY,
  exp: new Date().getTime() + 5000,
};

const token = jwt.sign(payload, process.env.ZOOM_API_SECRET);

const europeCtrl = {
  getWebinars: async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.zoom.us/v2/users/event@nanoscientific.org/webinars",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.status(200).json({
        result: response.data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err,
      });
    }
  },
};
module.exports = europeCtrl;
