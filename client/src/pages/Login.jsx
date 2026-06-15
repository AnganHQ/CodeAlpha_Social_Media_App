import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

const [email,setEmail]=
useState("");

const [password,setPassword]=
useState("");

const handleSubmit =
async (e)=>{

e.preventDefault();

try{

const res =
await API.post(
"/auth/login",
{
email,
password
}
);

localStorage.setItem(
"token",
res.data.token
);

navigate("/");

alert(
"Login Successful"
);

}
catch(error){

alert(
error?.response?.data?.message
||
error.message
);

}

};

return(

<div>

<h1>
Login
</h1>

<form
onSubmit={
handleSubmit
}
>

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

Login

</button>

</form>

</div>

);

}

export default Login;