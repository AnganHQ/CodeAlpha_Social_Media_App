import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import {useEffect}
from "react";

import Users
from "./pages/Users";

import Navbar
from "./components/Navbar";

import ProtectedRoute
from "./components/ProtectedRoute";

import Home
from "./pages/Home";

import Login
from "./pages/Login";

import Register
from "./pages/Register";

import Profile
from "./pages/Profile";

function App(){

useEffect(() => {

const token =
localStorage.getItem(
"token"
);

console.log(
token
?

"Logged In"

:

"Not Logged In"
);

}, []);

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route
path="/users"
element={

<ProtectedRoute>

<Users/>

</ProtectedRoute>

}
/>

<Route
path="/login"
element={
<Login/>
}
/>

<Route
path="/register"
element={
<Register/>
}
/>

<Route
path="/"
element={

<ProtectedRoute>

<Home/>

</ProtectedRoute>

}
/>

<Route
path="/profile"
element={

<ProtectedRoute>

<Profile/>

</ProtectedRoute>

}
/>

</Routes>

</BrowserRouter>

);

}

export default App;