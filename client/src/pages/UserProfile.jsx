import {
useEffect,
useState
}
from "react";

import {
useParams
}
from "react-router-dom";

import API
from "../services/api";

function UserProfile(){

const {
id
}
=
useParams();

const [
user,
setUser
]=
useState(
null
);

const fetchUser =
async()=>{

const res =
await API.get(
`/users/${id}`
);

setUser(
res.data
);

};

useEffect(()=>{

fetchUser();

},[]);

const follow =
async()=>{

await API.post(
`/users/follow/${id}`
);

fetchUser();

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

<div
className=
"container"
>

<img

src={
user.profilePic
||

"https://placehold.co/120"
}

width="120"

/>

<h1>

{
user.username
}

</h1>

<button
onClick={
follow
}
>

Follow /
Unfollow

</button>

<p>

Followers:

{
user.followers.length
}

</p>

</div>

);

}

export default UserProfile;