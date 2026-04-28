const moongose = require("mongoose");

const schema = new moongose.Schema(
    {
        name: String
    }
);

const City = moongose.model("City", schema, "cities");
module.exports = City