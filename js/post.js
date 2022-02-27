const elPostList = document.querySelector(".post__list");
const elPostTemplate = document.querySelector("#post-template").content;


const token = window.localStorage.getItem("token");

if (!token){
  window.location.replace('login.html');
}


const userId = window.localStorage.getItem("usersId");

let posts = [];

function renderPost(filteredPost, element){
    element.innerHTML = null;

    const postFragment = document.createDocumentFragment();

    filteredPost.forEach((post) =>{
        const postTemplate = elPostTemplate.cloneNode(true);

        postTemplate.querySelector(".post__more-info").dataset.postId = post.userId;
        postTemplate.querySelector(".post__title").textContent = post.title;
        postTemplate.querySelector(".post__text").textContent = post.body;

        postFragment.appendChild(postTemplate);
    });

    element.appendChild(postFragment);
}

//Functions
async function fetchPost() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await response.json();


    posts = data.filter((post) => post.userId == userId);
         console.log(posts);
    renderPost(posts, elPostList);
}
  catch (err) {
    console.log(err, "ERROR_IN_SERVER or ERR_NETWORK_CHANGED");
  }
}

fetchPost();

elPostList.addEventListener("click", (evt) => {
   
  const postButton = evt.target.matches(".post__more-info");
  if(postButton);
  window.localStorage.setItem("userId", evt.target.dataset.postId);

  window.location.replace("comments.html");
});


postLastBtn.addEventListener("click", (evt)=>{
  evt.preventDefault();

  window.location.replace("index.html");
})