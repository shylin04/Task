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
  }).then((data) => {
    let tableData = "";
    data.map((values) => {
      tableData += `<tr id="${values.id}" >
       <td>${values.name}</td>
       <td>${values.id}</td>
       <td id="id1">${values.gender}</td>
       <td>${values.email}</td>
       <td>${values.status}</td>

       
     
      <td>
      <a id="view" onclick="onView(this)" style="color:blue;" ><i class="fa-solid fa-eye"></i></a>
      <a id="edit" onclick="onEdit(this)" style="padding-left:15px;color:blue;"> <i class="fa-solid fa-pen"></i></a>
      <a id="delete" onclick="onDelete(this)" style="padding-left:15px ;color:red;"><i class="fa-solid fa-trash"></i></a></td>
     </tr>`;
    });
    document.getElementById("table-body").innerHTML = tableData;

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

    },
    body: JSON.stringify(),

  })
    .then(response => {
      if (response.ok) {

        alert("edit the userlist details");
        window.location.href = `/adduser.html?id=${id}`;

      } else {
        throw new Error("Failed to edit data");
      }
    })


    .catch(error => {
      console.error(error);
    });



}




//search

const searchInput = document.querySelector('#search');
const searchElement = document.getElementById('id1');

const gender = searchElement.innerText;
console.log(gender);


searchInput.addEventListener('input' , () => {

  const displayList= tableData.filter(()=>{
    if(searchInput.gender==='male'){
 return filterRowsByGender(gender); 


    }if(searchInput.gender==='male'){
     return filterRowsByGender(gender); 
    
    }else{
        return false;
    }
})

function filterRowsByGender(gender) {
  const tableBody = document.getElementById('table-body');
  const rows = tableBody.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const genderCell = row.getElementsByTagName('td')[2]; // assuming gender is in the 3rd column

    if (genderCell.innerText.toLowerCase() !== gender.toLowerCase()) {
      row.style.display = 'none';
    } else {
      row.style.display = '';
    }
  }
}




 fetch(`https://gorest.co.in//public/v2/users?gender={male,female}`,{
  headers: {
    "content-type": "application/json;json; charset=UTF-8",
    "authorization": "Bearer 835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473"

  },
  body:JSON.stringify(displayList)

 }).then(response => response.json())
 .then(data => console.log(data))

.catch(error => console.error(error));
 })



