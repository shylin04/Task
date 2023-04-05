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
      tableData += `<tr id="${values.id}">
       <td>${values.name}</td>
       <td>${values.id}</td>
       <td>${values.gender}</td>
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
        console.log(response);
        // alert(" userlist deleted successfully");
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

        alert("edit the user details");
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

fetch(`https://gorest.co.in//public/v2/users?page=1&per_page=20/gender={male,female}`,{

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

  let filteredData=[]; //take filtered array
  const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => {
let search=searchInput.value.toLowerCase()
  
let filteredData = data.filter((row) => {
    return row.gender.toLowerCase() === searchInput;
  });
  console.log(filteredData);
});

 










//pagination

//fetch the api data and store it in a variable
let data = [];

fetch(`https://gorest.co.in//public/v2/users?page=1&per_page=20`,
  {

    headers: {
      "content-type": "application/json;json; charset=UTF-8",
      "authorization": "Bearer 835dc2e45b78886994de04f0235ccab1691464428e09811304972c0467d89473"

    }
  }).then(response => response.json())
  .then(response => {
    data = response;
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

  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    tableData += `<tr>
                    <td>${data[i].name}</td>
                    <td>${data[i].id}</td>
                    <td>${data[i].gender}</td>
                    <td>${data[i].email}</td>
                    <td>${data[i].status}</td>
                    <td>
      <a id="view" onclick="onView(this)" style="color:blue;" ><i class="fa-solid fa-eye"></i></a>
      <a id="edit" onclick="onEdit(this)" style="padding-left:15px;color:blue;"> <i class="fa-solid fa-pen"></i></a>
      <a id="delete" onclick="onDelete(this)" style="padding-left:15px ;color:red;"><i class="fa-solid fa-trash"></i></a></td>
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
  updateEntriesShown(selectedValue);
});


function updateEntriesShown(numEntries) {
  const tableRows = document.querySelectorAll('tr'); // assuming you're using a table
  for (let i = 0; i < tableRows.length; i++) {
    if (i < numEntries) {
      tableRows[i].style.display = 'table-row';
    } else {
      tableRows[i].style.display = 'none';
    }
  }
}
