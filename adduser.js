document.getElementById("back").addEventListener("click", () => {
    window.location.href = "userlist.html";
});


const myForm = document.querySelector('#form');

myForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(myForm);
    for (item of formData) {
        console.log(item[0], item[1]);

    };
    await fetch("https://gorest.co.in/public/v2/users?page=1&per_page=100/access-token=6fbc5335a94e219c3fe34054208499393e999e24ea261d4341aa0726dab9b430",
        {
            method: "POST",
            body: "formData",
            headers: {
                "content-type": "application/json;json; charset=UTF-8",
                "Authorization": "Bearer",
            }

        }).then(res => res.json())
          .then(data => {console.log(data)
           //window.location.href = "userlist.html";
        })


    // .catch(error => console.log(error));



})
