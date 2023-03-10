const dynamoose = require("dynamoose");

const boardSchema = new dynamoose.Schema(
    {
        categories: { //board, post, comment 중 하나
            type: String,
            hashKey: true,
        },
        id: {
            type: String,
            rangeKey: true,
            
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
        },
        userid: {
            type: String,
            index: {
              name: "userIndex",
              global: true
            }
          },
        upperid : String
    }
)
const BoardsModel = dynamoose.model("BoardTable", boardSchema, {
    throughput: "ON_DEMAND",
});


module.exports = { BoardsModel };