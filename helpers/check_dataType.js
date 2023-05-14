const mongoose = require("mongoose");

const checkDataType = {
  isNumber: (data) => {
    return !isNaN(data) && !isNaN(parseFloat(data));
  },
  isValidObjectId: (id) => {
    const ObjectId = mongoose.Types.ObjectId;
    if (ObjectId.isValid(id)) {
      if (String(new ObjectId(id)) === id) return true;
      return false;
    }
    return false;
  },
};

module.exports = checkDataType;