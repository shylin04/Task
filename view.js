const viewForm = document.getElementById('form');

const userId = sessionStorage.getItem('userId');

fetch(`https://gorest.co.in/public/v2/users/${userId}`)
  .then(response => response.json())
  .then(user => {
    console.log(user);

    viewForm.querySelector('[name="name"]').value = user.name;
    viewForm.querySelector('[name="id"]').value = user.id;
    viewForm.querySelector('[name="email"]').value = user.email;
    viewForm.querySelector('[name="gender"]').value = user.gender;
    viewForm.querySelector('[name="status"]').value = user.status;
  });
