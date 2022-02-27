//  element
const elForm = document.querySelector(".login__form");
const elInput = document.querySelector(".login__input");
const elPassword = document.querySelector(".login__password");

elForm.addEventListener("submit", (evt)=>{

  evt.preventDefault();

  const emailInput = elInput.value.trim();
  const passwordInput = elPassword.value.trim();

    fetch("https://reqres.in/api/login" , {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify ({
            email: emailInput,
            password: passwordInput,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
        if (data?.token){
            window.localStorage.setItem("token", data.token);

            window.location.replace('index.html');
        }
    });
});
   
