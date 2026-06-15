import {
useEffect,
useState
}
from "react";

import API
from "../services/api";

function Users(){

const [
users,
setUsers
]=
useState([]);

useEffect(()=>{

fetchUsers();

},[]);

const fetchUsers =
async()=>{

const res =
await API.get(
"/users"
);

setUsers(
res.data
);

};

return(

<div
className=
"container"
>

<h1>

Users

</h1>

{

users.map(

(user)=>(

<div
className=
"card"

key={
user._id
}
>

<img

src={
user.profilePic
||

"https://placehold.co/50"
}

width="50"

/>

<h3>

{
user.username
}

</h3>

</div>

)

)

}

</div>

);

}

export default Users;