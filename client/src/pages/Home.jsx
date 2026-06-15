import {
useEffect,
useState
}
from "react";

import API
from "../services/api";

import CreatePost
from "../components/CreatePost";

import PostCard
from "../components/PostCard";

function Home(){

const [
posts,
setPosts
]=
useState([]);

const [
loading,
setLoading
]=
useState(
true
);

const fetchPosts =
async ()=>{

try{

setLoading(
true
);

const res =
await API.get(
"/posts"
);

setPosts(
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

useEffect(()=>{

fetchPosts();

},[]);

return(

<div className="container">

<h1>

Home Feed

</h1>

<CreatePost
refreshPosts={
fetchPosts
}
/>

<hr/>

{

loading

?

<p>

Loading posts...

</p>

:

posts.length > 0

?

posts.map(

(post)=>(

<PostCard

key={
post._id
}

post={
post
}

/>

)

)

:

<div>

<h3>

No posts yet

</h3>

<p>

Create your first post.

</p>

</div>

}

</div>

);

}

export default Home;