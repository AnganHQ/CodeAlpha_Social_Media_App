import { useState } from "react";
import API from "../services/api";

function Register() {

const [username, setUsername] =
useState("");

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const handleSubmit =
async (e) => {

e.preventDefault();

console.log("Register Clicked");

try {

const res =
await API.post(
"/auth/register",
{
username,
email,
password
}
);

alert(
res.data.message
);

} catch (error) {

alert(
error?.response?.data?.message
||
error.message
);

}

};

return (

<div>

<h1>
Register
</h1>

<form
onSubmit={
handleSubmit
}
>

<input
type="text"
placeholder="Username"
value={username}
onChange={
(e)=>
setUsername(
e.target.value
)
}
/>

<br/>

<input
type="email"
placeholder="Email"
value={email}
onChange={
(e)=>
setEmail(
e.target.value
)
}
/>

<br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={
(e)=>
setPassword(
e.target.value
)
}
/>

<br/>

<button
type="submit"
>
Register
</button>

</form>

</div>

);

}

export default Register;