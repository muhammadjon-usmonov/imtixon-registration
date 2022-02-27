// users elements
const elUsersList  = document.querySelector(".users__list");
const elUsersTemplate = document.querySelector("#users-template").content;

const token = window.localStorage.getItem("token");

if (!token){
  window.location.replace('login.html');
}


function renderUsers(users, element){
  document.querySelector(".loader").style.display = "none";

    element.innerHTML = null;
    const usersFragment = document.createDocumentFragment();
    
    users.forEach((item) => {
    const usersTemplate = elUsersTemplate.cloneNode(true);

      usersTemplate.querySelector(".users__more-info").dataset.userId = item.id;
      usersTemplate.querySelector(".users__id").textContent = item.id;
      usersTemplate.querySelector(".users__name").textContent = item.username;
      usersTemplate.querySelector(".users__username").textContent = item.name;

      usersTemplate.querySelector(".users__address__street").textContent = item.address.suite;
      usersTemplate.querySelector(".users__address__suite").textContent = item.address.street;
      usersTemplate.querySelector(".users__address__city").textContent = item.address.city;

      usersTemplate.querySelector(".users__connect__phone").textContent = item.phone;
      usersTemplate.querySelector(".users__connect__email").textContent = item.email;
      usersTemplate.querySelector(".users__connect__company").textContent = item.company.name;

        usersFragment.appendChild(usersTemplate);

    });
  
    element.appendChild(usersFragment);
}
// Functions
async function fetchUsers() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = await response.json();
      renderUsers(data, elUsersList);
  } 
  catch (err) {
    console.log(err, "ERROR_IN_SERVER or ERR_NETWORK_CHANGED");
  }
}

fetchUsers();

elUsersList.addEventListener("click", (evt)=>{
  const button = evt.target.matches(".users__more-info");
  if(button);
  window.localStorage.setItem("usersId", evt.target.dataset.userId);
  window.location.replace("post.html")

});

const elLogOutBtn =  document.querySelector(".btn-log-out");

elLogOutBtn.addEventListener("click", ()=>{
  window.localStorage.removeItem(token);

  window.location.replace('login.html')

})