const form = document.querySelector(".login form"),
continueBtn = form.querySelector(".button input"),
errorText = form.querySelector(".error-text");

form.onsubmit = (e)=>{
  e.preventDefault(); //preventing form from submitting
}

continueBtn.onclick = ()=>{
  // let start ajax
    let xhr = new XMLHttpRequest();  // creating xl object
    xhr.open("POST", "php/login.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              let data = xhr.response;
              console.log(data);
              if(data === "success"){
                location.href="users.php";
              }else{
                errorText.style.display = "block";
                errorText.textContent = data;
              }
          }
      }
    }
    //we ahve to send the form data through ajax to php
    let formData = new FormData(form); // creating new formdata object
    xhr.send(formData);
}






