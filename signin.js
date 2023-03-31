
document.getElementById("sign-in").addEventListener("click",

  function (event) {
    event.preventDefault();
    const Email = document.getElementById('email').value;
    const PassWord = document.getElementById('password').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(Email)) {
      alert('please enter valid email address');
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



// forgot password
document.getElementById('forgot-password').addEventListener('click', function () {
  const email = document.getElementById('email').value;
  if (!email) {
    alert('Please enter your email address.');
    alert('password reset link has sent to your email');
    return;
  }
})

//sign-up

const signup = document.querySelector('#sign-up');
signup.addEventListener('click', function () {
  window.location.href = 'signup.html';
})

