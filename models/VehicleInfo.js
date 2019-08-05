const mongoose = require("mongoose");
// const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


//Do we want to trim example trim: true,

const vehicleSchema = new Schema({
    //location name
  locname: {
  
      type: String,
      unique: true,
      required: [true, "location name is required"]
  },
  //person of contact
  poc: {
      
      type: String,
      unique: false,
      required: [true, "person of contact is required"]
  },
  //person of contact phone number
  pocphone: {
    type: String,
    unique: true,
    required: [true, "person of contact phone number is required"]
  },
  //vehicle information
  vehicleinfo: {
    type: String,
    unique: true,
    required: [true, "vehicle information is required"]
  },
  //spaces
  spaces: {
  type: String,
  unique: true,
  required: [true, "spaces is required"]
},
  // comments
  comments: {
  type: String,
  unique: true,
  required: [true, "comment is required"]
},

claimit: {
  type: Boolean,
  default: false
},

  admin: {
    type: Boolean,
    unique: false,
    required: true,
    default: false
},
  createdAt: {
      type: Date,
      default: Date.now()
  }
});

// usersSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// }

// usersSchema.methods.validPassword = function(password, encrypted) {
//     return bcrypt.compareSync(password, encrypted);
// }

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
