document.getElementById('submit').addEventListener('click',
  function (event) {
    event.preventDefault();


    const Username = document.getElementById('username').value;
    const PassWord = document.getElementById('password').value;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!usernameRegex.test(Username)) {
      alert('please enter  valid username');
      return false;
    }

    if (!passwordRegex.test(PassWord)) {
      alert('please enter atleast 8 characters with atleast one number for valid password');
      return false;

    } else {
      window.location.href = "userlist.html";
      return true;
    }
  });

