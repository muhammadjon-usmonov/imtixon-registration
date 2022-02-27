const elCommentsList = document.querySelector(".comments__list");
const elCommenstTemplate = document.querySelector("#comments-template").content;


const token = window.localStorage.getItem("token");

if (!token){
  window.location.replace('login.html');
}

// const 


const commentId = window.localStorage.getItem("userId");

async function fetchComments(){
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/comments?postId=" + commentId ,
        );
        const data = await response.json();
            console.log(data);
        renderComments(data, elCommentsList);

    }
    catch(err){
        console.log(err, "ERROR_IN_SERVER or ERR_NETWORK_CHANGED");
    }
}

fetchComments();

function renderComments(array, element){
  document.querySelector(".loader").style.display = "none";

    element.innerHTML = null;

    const commentsFragment = document.createDocumentFragment();

    array.forEach((comment) => {
       const commentsTemplate = elCommenstTemplate.cloneNode(true);
       
       commentsTemplate.querySelector(".comments__name").textContent = comment.name;
       commentsTemplate.querySelector(".comments__email").textContent = comment.email;
       commentsTemplate.querySelector(".comments__text").textContent =  comment.body;

       commentsFragment.appendChild(commentsTemplate);
    });

    element.appendChild(commentsFragment);
}


postLastBtn.addEventListener("click", (evt)=>{
    evt.preventDefault();
  
    window.location.replace("post.html");
  })