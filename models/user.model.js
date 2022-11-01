var mongoose = require("mongoose");
var validator = require("validator");
var bcrypt = require("bcrypt");
var userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please tell us your name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "enter your password"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//check email is taken
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};
userSchema.pre("save", async function (next) {
  //  Salt & Hashing Password
  //const y = bcrypt.genSaltSync(10);
  const x = bcrypt.hashSync(this.password, 10);
  this.password = x;
  next();
});
var userModel = mongoose.model("User", userSchema);
module.exports = userModel;
