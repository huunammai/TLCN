var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;
//var user = require('..models/user');
//var bcrypt   = require('bcrypt-nodejs');

//user schema
var UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    username:{
        type: String,
        index: true
    },
    password:{
        type: String
    }
    
  
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
  newUser.save(callback);
};

//userSchema.methods.generateHash = function(user) {
  //  return bcrypt.hashSync(user, bcrypt.genSaltSync(8), null);
//};

// checking if password is valid
//serSchema.methods.validuser = function(user) {
    //return bcrypt.compareSync(user, this.local.user);
//};

// create the model for users and expose it to our app
//module.exports = mongoose.model('User', userSchema);

