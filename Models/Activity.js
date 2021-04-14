const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    username : String,
    userid : String,
    title : String,
    activity : String,
    time : String,
    pin : Boolean
});

const Activity = mongoose.model("activity",ActivitySchema);

module.exports = Activity;