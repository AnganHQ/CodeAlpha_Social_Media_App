import {
Link,
useNavigate
}
from "react-router-dom";

function Navbar(){

const navigate =
useNavigate();

const token =
localStorage.getItem(
"token"
);

const logout =
()=>{

localStorage.removeItem(
"token"
);

navigate(
"/login"
);

window.location.reload();

};

return(

<nav>

{

token && (

<>

<Link to="/">
Home
</Link>

<Link to="/profile">
Profile
</Link>

<Link to="/users">

Users

</Link>

</>

)

}

{

!token && (

<>

<Link to="/login">
Login
</Link>

<Link to="/register">
Register
</Link>

</>

)

}

{

token && (

<button
onClick={
logout
}
>

Logout

</button>

)

}

</nav>

);

}

export default Navbar;