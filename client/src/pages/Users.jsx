import {
useEffect,
useState
}
from "react";

import {
Link
}
from "react-router-dom";

import API
from "../services/api";

function Users(){

const [
users,
setUsers
]=
useState([]);

const [
loading,
setLoading
]=
useState(true);

useEffect(()=>{

fetchUsers();

},[]);

const fetchUsers =
async()=>{

try{

const res =
await API.get(
"/users"
);

setUsers(
res.data
);

}
catch(error){

console.log(
error
);

}
finally{

setLoading(
false
);

}

};

if(
loading
){

return(

<div
className="container"
>

<p>

Loading users...

</p>

</div>

);

}

return(

<div
className="container"
>

<h1>

Users

</h1>

{

users.length > 0

?

users.map(

(user)=>(

<div
className="card"
key={
user._id
}
>

<Link
to={`/users/${user._id}`}
style={{
textDecoration:"none",
color:"inherit"
}}
>

<img

src={
user.profilePic
||

"https://placehold.co/80"
}

alt="profile"

width="80"

height="80"

/>

<h3>

{
user.username
}

</h3>

</Link>

</div>

)

)

:

<p>

No users found

</p>

}

</div>

);

}

export default Users;