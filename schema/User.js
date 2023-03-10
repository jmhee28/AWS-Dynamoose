const dynamoose = require("dynamoose");
const userSchema = new dynamoose.Schema(
    {
        id: {
            type: String,
            hashKey: true
        },
        email: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            rangeKey: true
        }
    }
);

const UsersModel = dynamoose.model("UserTable", userSchema, {
    throughput: "ON_DEMAND",
});

module.exports = { UsersModel };