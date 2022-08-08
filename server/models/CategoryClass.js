const { BadRequestError } = require("../utils/error");
const Parse = require("../utils/parse_config");

class CategoryClass {
  static async getCategoryInformation(categoryId) {
    try {
      const Category = Parse.Object.extend("Category");
      const query = new Parse.Query(Category);

      query.equalTo("objectId", categoryId);

      const categoryResult = await query.first();

      return categoryResult;
    } catch (error) {
      throw new BadRequestError(error.message, 404);
    }
  }
}

module.exports = CategoryClass;
