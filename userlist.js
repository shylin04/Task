document.getElementById("add-user").addEventListener("click", () => {
  window.location.href = "adduser.html";
});

// users list
fetch("https://gorest.co.in//public/v2/users?access-token=835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473", {

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
      tableData += `<tr id="${values.id}">
       <td>${values.name}</td>
       <td>${values.id}</td>
       <td>${values.gender}</td>
       <td>${values.email}</td>
       <td>${values.status}</td>

       <td>
      <a id="view" onclick="onView(${values.id})" style="color:blue;" ><i class="fa-solid fa-eye"></i></a>
      <a id="edit" onclick="onEdit(${values.id})" style="padding-left:15px;color:blue;"> <i class="fa-solid fa-pen"></i></a>
      <a id="delete" onclick="onDelete(${values.id})" style="padding-left:15px ;color:red;"><i class="fa-solid fa-trash"></i></a></td>
     </tr>`;
    });
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = tableData;

  })


//view 

function onView(id) {
  // Store the user ID in session storage
  sessionStorage.setItem('userId', id);

  // Redirect to the edit page with the ID in the query string
  window.location.href = `/view.html?id=${id}`;

}

//delete

function onDelete(id) {
  console.log(id);
  fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json;json; charset=UTF-8",
      "authorization": "Bearer 835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473"
    }
  })
    .then(response => {
      if (response.ok) {

        const tableBody = document.getElementById("table-body");
        const rowIndex = document.getElementById(id).rowIndex;

        tableBody.deleteRow(rowIndex);
        //alert(" userlist deleted successfully");

      } else {
        throw new Error("Failed to delete data.");
      }
    })
    .catch(error => {
      console.error(error);
    });
}


//edit
function onEdit(id) {
  // Store the user ID in session storage
  sessionStorage.setItem('userId', id);

  // Redirect to the edit page with the ID in the query string
  window.location.href = `/edit.html?id=${id}`;

}



//search

let data;
fetch(`https://gorest.co.in/public/v2/users?page=1&per_page=20`, {

  headers: {
    "content-type": "application/json;json; charset=UTF-8",
    "authorization": "Bearer 835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473"

  }
})
  .then(response => response.json())
  .then(response => {
    data = response;
    //console.log(data);
  })
  .catch(error => console.log(error));
const tableBody = document.querySelector('#table-body');
const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => {
  let search = searchInput.value.toLowerCase()
  //console.log(search);

  let filteredData = data.filter((row) => {

    return row.gender.toLowerCase().includes(search) ||
      row.name.toLowerCase().includes(search) ||
      row.id.toString().includes(search);

  });

  //console.log(filteredData);

  tableBody.innerHTML = '';
  let tableData = "";
  filteredData.forEach((values) => {
    tableData += `<tr id="${values.id}">
       <td>${values.name}</td>
       <td>${values.id}</td>
       <td>${values.gender}</td>
       <td>${values.email}</td>
       <td>${values.status}</td>
      <td>
      <a id="view" onclick="onView(${values.id})" style="color:blue;" ><i class="fa-solid fa-eye"></i></a>
      <a id="edit" onclick="onEdit(${values.id})" style="padding-left:15px;color:blue;"> <i class="fa-solid fa-pen"></i></a>
      <a id="delete" onclick="onDelete(${values.id})" style="padding-left:15px ;color:red;"><i class="fa-solid fa-trash"></i></a></td>
     </tr>`;
  });

  tableBody.innerHTML = tableData;

})







//pagination

fetch(`https://gorest.co.in/public/v2/users?page=1&per_page=20`,
  {

    headers: {
      "content-type": "application/json;json; charset=UTF-8",
      "authorization": "Bearer 835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473"

    }
  }).then(response => response.json())
  .then(response => {
    values = response;
    //console.log(data);
  })
  .catch(error => console.log(error));


const itemsPerPage = 10;
let currentPage = 1;


//display the table data  based on itemsperpage ,currentpage
function displayTableData() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tableBody = document.getElementById('table-body');
  let tableData = '';

  for (let i = startIndex; i < endIndex && i < values.length; i++) {
    tableData += `<tr>
                    <td>${values[i].name}</td>
                    <td>${values[i].id}</td>
                    <td>${values[i].gender}</td>
                    <td>${values[i].email}</td>
                    <td>${values[i].status}</td>
                    <td>
      <a id="view" onclick="onView(${values[i].id})" style="color:blue;" ><i class="fa-solid fa-eye"></i></a>
      <a id="edit" onclick="onEdit(${values[i].id})" style="padding-left:15px;color:blue;"> <i class="fa-solid fa-pen"></i></a>
      <a id="delete" onclick="onDelete(${values[i].id})" style="padding-left:15px ;color:red;"><i class="fa-solid fa-trash"></i></a></td>
                  </tr>`;
  }

  tableBody.innerHTML = tableData;
}


// these 2 functions to handle the previos and nextpage
function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayTableData();

  }
}

function goToNextPage() {
  if (currentPage < Math.ceil(data.length / itemsPerPage)) {
    currentPage++;
    displayTableData();

  }
}
// add eventlisteners to prev and next buttons
const previousButton = document.getElementById('prevbutton');
const nextButton = document.getElementById('nextbutton');

prevbutton.addEventListener('click', goToPreviousPage);
nextbutton.addEventListener('click', goToNextPage);


// show entries dropdown
const showEntriesDropdown = document.querySelector('#show-entries');

showEntriesDropdown.addEventListener('change', function () {
  const selectedValue = this.value;
  showEntries(selectedValue);
});



