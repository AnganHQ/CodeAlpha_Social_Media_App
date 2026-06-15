const User =
require(
"../models/User"
);



const followUser =
async (
req,
res
)=>{

try{

const targetUser =
await User.findById(
req.params.id
);

const currentUser =
await User.findById(
req.user._id
);

if(
!targetUser
){

return res
.status(404)
.json({

message:
"User not found"

});

}



const alreadyFollowing =

currentUser.following.includes(

targetUser._id

);



if(
alreadyFollowing
){

currentUser.following =
currentUser.following.filter(

(id)=>

id.toString()

!==

targetUser._id.toString()

);



targetUser.followers =
targetUser.followers.filter(

(id)=>

id.toString()

!==

currentUser._id.toString()

);

}
else{

currentUser.following.push(

targetUser._id

);

targetUser.followers.push(

currentUser._id

);

}



await currentUser.save();

await targetUser.save();



res.json({

message:

alreadyFollowing

?

"Unfollowed"

:

"Followed"

});



}
catch(error){

res
.status(500)
.json({

message:
error.message

});

}

};



const updateProfile =
async (
req,
res
)=>{

try{

const user =
await User.findById(
req.user._id
);



if(
!user
){

return res
.status(404)
.json({

message:
"User not found"

});

}



user.profilePic =
req.body.profilePic;



await user.save();



res.json({

message:
"Profile updated",

user

});



}
catch(error){

res
.status(500)
.json({

message:
error.message

});

}

};

const getUsers =
async (
req,
res
)=>{

try{

const users =
await User.find()

.select(

"username profilePic"

);

res.json(
users
);

}
catch(error){

res
.status(500)
.json({

message:
error.message

});

}

};

module.exports = {

followUser,

updateProfile,

getUsers

};