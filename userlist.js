document.getElementById("add-user").addEventListener("click", () => {
  window.location.href = "adduser.html";
});

// users list
fetch("https://gorest.co.in//public/v2/users?access-token=835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473", {
  method: 'GET',
  headers: {
    "content-type": "application/json;json; charset=UTF-8",
    "Authorization": "Bearer token",
  }

})
  .then((data) => {

    return (data.json());
  }).then((objectData) => {
    let tableData = "";
    objectData.map((values) => {
      tableData += `<tr id="${values.id}">
       <td>${values.name}</td>
       <td>${values.id}</td>
       <td>${values.gender}</td>
       <td>${values.email}</td>
       <td>${values.status}</td>

       
     
      <td>
      <a id="view"  style="color:blue;" ><i class="fa-solid fa-eye"></i></a>
      <a id="edit" onclick="onEdit(this)" style="padding-left:15px;color:blue;"> <i class="fa-solid fa-pen"></i></a>
      <a id="delete" onclick="onDelete(this)" style="padding-left:15px ;color:red;"><i class="fa-solid fa-trash"></i></a></td>
     </tr>`;
    });
    document.getElementById("table-body").innerHTML = tableData;
    $(document).ready(function () {
      $('#table').DataTable()

    });
  })





//delete

function onDelete(td) {

  const id = td.parentElement.parentElement.id;
  console.log(id);

  fetch(`https://gorest.co.in//public/v2/users/${id}`, {
    method: "DELETE",

    headers: {
      "content-type": "application/json;json; charset=UTF-8",
      "authorization": "Bearer 835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473"

    }
  })
    .then(response => {
      if (response.ok) {
        alert(" userlist deleted successfully");
      } else {
        throw new Error("Failed to delete data.");
      }
    })

    .catch(error => {
      console.error(error);
    });
  document.getElementById("table-body").deleteRow(td.parentElement.parentElement.rowIndex);

  }

//edit
function onEdit(td) {
  const id = td.parentElement.parentElement.id;


  fetch(`https://gorest.co.in//public/v2/users/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;json; charset=UTF-8",
      "authorization": "Bearer 835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473"

    }

  })
    .then(response => {
      if (response.ok) {


        window.location.href = `/adduser.html?id=${id}`;
        const myForm = document.querySelector('#form');
        myForm.addEventListener('submit', async function (e) {
          e.preventDefault();

          const formData = new FormData(myForm);

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
      } else {
        throw new Error("Failed to edit data");
      }
    })


    .catch(error => {
      console.error(error);
    });



}

//search



