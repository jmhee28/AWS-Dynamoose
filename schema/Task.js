const dynamoose = require("dynamoose");

const taskSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    createdAt: {
      rangeKey:true,
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
    description: String,
    user:{
      type: Object,
      "schema":{
        email: {
          type: String,
          required: true
        },
        name : String,
        
      }, 
      index:{
        name: "userIndex",
        rangeKey: "email",
        global: true
      }
    },
    comments:{
      type: Array,
      "schema":[{
        type : Object,
        "schema":{
          commentBody: String,
          useremail: String,
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
      }], 
    }
  },
  

);

//dynodb table name
const TasksModel = dynamoose.model("Dynamoose-Table", taskSchema, {
  throughput: "ON_DEMAND",
});


module.exports = { TasksModel };
