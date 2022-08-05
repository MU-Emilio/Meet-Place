const { getCategoryInformation } = require("../models/CategoryClass");

controller = {};

controller.categoryDetails = async (req, res) => {
  const categotyId = req.params.categoryId;

  try {
    const category = await getCategoryInformation(categotyId);

    res.send(category);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

module.exports = controller;
