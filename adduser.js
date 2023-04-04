document.getElementById("back").addEventListener("click", () => {
    window.location.href = "userlist.html";
});

//add userlist
const myForm = document.querySelector('#form');
myForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(myForm);

    //console.log(Object.fromEntries(formData));

    await fetch("https://gorest.co.in//public/v2/users?access-token=835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473", {


        method: "POST",

        headers: {
            "content-type": "application/json;json; charset=UTF-8",
            "authorization": "Bearer token"

        },
        body: JSON.stringify(Object.fromEntries(formData)),



    }).then(res => res.json())
        .then(data => console.log(data))

        .catch(error => console.log(error));
    window.location.href = "userlist.html";
})




