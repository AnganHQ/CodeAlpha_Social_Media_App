import { useEffect, useState } from "react";
import API from "../services/api";

function PostCard({ post }) {

const [comments,setComments]=
useState([]);

const [text,setText]=
useState("");

useEffect(()=>{

fetchComments();

},[]);

const fetchComments =
async()=>{

try{

const res =
await API.get(
`/comments/${post._id}`
);

setComments(
res.data
);

}
catch(error){

console.log(
error
);

}

};

const addComment =
async(e)=>{

e.preventDefault();

try{

await API.post(

`/comments/${post._id}`,

{
text
}

);

setText("");

fetchComments();

}
catch(error){

console.log(
error
);

}

};

return(

<div className="card">

<div
style={{
display:"flex",
alignItems:"center",
gap:"10px"
}}
>

<img

src={
post.author?.profilePic
||

"https://placehold.co/50"
}

alt="user"

width="50"

height="50"

style={{

borderRadius:
"50%"

}}

/>

<h3>

{
post.author?.username
}

</h3>

</div>

<p>

{
post.content
}

</p>

<form
onSubmit={
addComment
}
>

<input
value={
text
}
onChange={
(e)=>
setText(
e.target.value
)
}
placeholder=
"Write comment"
/>

<button>

Comment

</button>

</form>

{

comments.map(

(comment)=>(

<p
key={
comment._id
}
>

{
comment.text
}

</p>

)

)

}

<hr/>

</div>

);

}

export default PostCard;