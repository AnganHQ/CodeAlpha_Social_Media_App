import { useState } from "react";
import API from "../services/api";

function CreatePost({ refreshPosts }) {

const [content,setContent]=
useState("");

const createPost =
async (e)=>{

e.preventDefault();

try{

await API.post(
"/posts",
{
content
}
);

setContent("");

refreshPosts();

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

<form
onSubmit={
createPost
}
>

<input
type="text"
placeholder="What's happening?"
value={content}
onChange={
(e)=>
setContent(
e.target.value
)
}
/>

<button
type="submit"
>

Post

</button>

</form>

);

}

export default CreatePost;