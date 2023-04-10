document.getElementById("back").addEventListener("click", () => {
  window.location.href = "userlist.html";
});

const editForm = document.querySelector('#form');

// Get the user ID from session storage
const userId = sessionStorage.getItem('userId');

fetch(`https://gorest.co.in/public/v2/users/${userId}`)
  .then(response => response.json())
  .then(user => {

    editForm.querySelector('[name="name"]').value = user.name;
    //editForm.querySelector('[name="id"]').value = user.id;
    editForm.querySelector('[name="email"]').value = user.email;
    editForm.querySelector('[name="gender"]').value = user.gender;
    editForm.querySelector('[name="status"]').value = user.status;

  });

editForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(editForm);
  console.log(Object.fromEntries(formData));

  // Update the user data using the PUT method
  fetch(`https://gorest.co.in/public/v2/users/${userId}`, {

    method: 'PUT',
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "authorization": "Bearer 835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473"

    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then(response => {
      if (response.ok) {
        // console.log(response);
        alert('User data updated successfully');
        window.location.href = '/userlist.html';
      } else {
        throw new Error('Failed to update user data');
      }
    })
    .catch(error => {
      console.error(error);
    });
});
