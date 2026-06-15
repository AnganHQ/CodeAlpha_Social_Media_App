import {
useEffect,
useState
}
from "react";

import API
from "../services/api";

function Profile(){

const [
profilePic,
setProfilePic
]=
useState("");

const followUser = async () => {

try{

await API.post(
`/users/follow/${user._id}`
);

fetchProfile();

}
catch(error){

console.log(
error
);

}

};

const [
user,
setUser
]=
useState(
null
);

const [
posts,
setPosts
]=
useState(
[]
);

useEffect(
()=>{

fetchProfile();

},
[]
);

const fetchProfile =
async ()=>{

try{

const userRes =
await API.get(
"/auth/me"
);

setUser(
userRes.data
);

const postRes =
await API.get(
"/posts"
);

const myPosts =
postRes.data.filter(

(post)=>

post.author?._id
===

userRes.data._id

);

setPosts(
myPosts
);

}
catch(error){

console.log(
error
);

}

};

const updateProfilePic =
async ()=>{

try{

await API.put(

"/users/profile",

{

profilePic

}

);

fetchProfile();

alert(
"Profile updated"
);

}
catch(error){

console.log(
error
);

}

};

if(
!user
){

return(

<p>

Loading...

</p>

);

}

return(

<div>

<h1>

Profile

</h1>

<h2>

{
user.username
}

</h2>

<img

src={
user.profilePic
||

"https://placehold.co/120"
}

alt="profile"

width="120"

/>

<br/>

<input

type="text"

placeholder=
"Paste image URL"

value={
profilePic
}

onChange={
(e)=>

setProfilePic(
e.target.value
)

}

/>

<button

onClick={
updateProfilePic
}

>

Save Picture

</button>

<button
onClick={
followUser
}
>

Follow /
Unfollow

</button>

<p>

{
user.email
}

</p>

<p>

Followers:
{
user.followers.length
}

</p>

<p>

Following:
{
user.following.length
}

</p>

<hr/>

<h2>

My Posts

</h2>

{

posts.length
>

0

?

posts.map(

(post)=>(

<div
key={
post._id
}
>

<p>

{
post.content
}

</p>

<hr/>

</div>

)

)

:

<p>

No posts

</p>

}

</div>

);

}

export default Profile;