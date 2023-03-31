document.getElementById("add-user").addEventListener("click", () => {
  window.location.href = "adduser.html";
});

// users list
fetch("https://gorest.co.in/public/v2/users")
  .then((data) => {

    return (data.json());
  }).then((objectData) => {
    let tableData = "";
    objectData.map((values) => {
      tableData += `<tr>
       <td>${values.name}</td>
       <td>${values.id}</td>
       <td>${values.gender}</td>
       <td>${values.email}</td>
       <td>${values.status}</td>

       
     
      <td>
      <a href="view"id="view" class="view"><i class="fa-solid fa-eye"></i></a>
      <a href="edit" id="edit"class="edit"style="padding-left:15px";> <i class="fa-solid fa-pen"></i></a>
       <a href="delete"id="delete" class="delete" style="padding-left:15px ;color:red;"><i class="fa-solid fa-trash"></i></a></td>
     </tr>`;
    });
    document.getElementById("table-body").innerHTML = tableData;
    $(document).ready(function () {
      $('#table').DataTable()

    });
  })



 

// delete
  document.querySelector('a.delete').addEventListener('click', (e) => {
  e.preventDefault();

  const id = document.getElementById('delete').this.id

 
   fetch("https://gorest.co.in/public/v2/users?/"+id+"access-token=6fbc5335a94e219c3fe34054208499393e999e24ea261d4341aa0726dab9b430/",
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json;json; charset=UTF-8",
        "Authorization": "Bearer",
      }

    }).then(res => res.json())
    .then(data => console.log(data))


})


//update using PUT





