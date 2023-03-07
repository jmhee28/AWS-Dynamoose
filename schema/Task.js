const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      //hashKey: boolean
      //You can set this to true to overwrite what the hashKey for the Model will be. By default the hashKey will be the first key in the Schema object.
      // hashKey is commonly called a partition key in the AWS documentation.
      //partionkey  :https://aws.amazon.com/ko/blogs/database/choosing-the-right-dynamodb-partition-key/
      hashKey: true,
    },
    title: {
        type: String,
        required: true
    },
    description: String,
  },
  {
    timestamps: {
        "createdAt": {
            "created_at": {
                "type": {
                    "value": Date,
                    "settings": {
                        "storage": "iso" // 년-월-일의 형태, Z or +00:00 : UTC기준시를 나타내는 표시
                    
                    }
                }
            }
        },
        "updatedAt": {
            "updated": {
                "type": {
                    "value": Date,
                    "settings": {
                        "storage": "iso"
                    }
                }
            }
        }
    } //it will use the default attribute names of createdAt & updatedAt.
  }
);

//dynodb table name
const TasksModel = dynamoose.model("Dynamoose-Table", schema, {
//   create: true,
  throughput: "ON_DEMAND",
});
module.exports = { TasksModel };
