const form = document.querySelector(".typing-area"),
// incoming_id = form.querySelector(".incoming_id").value,
inputField = form.querySelector(".input-field"),
sendBtn = form.querySelector("button");
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e)=>{
    e.preventDefault(); //preventing form from submitting
}
sendBtn.onclick = ()=>{
  // let start ajax
  let xhr = new XMLHttpRequest();  // creating xl object
  xhr.open("POST", "php/insert-chat.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
            inputField.value = ""; //where messge is inserted in the database than leave the blank from the input feild
            scrollToBottom();
        }
    }
  }
  //we ahve to send the form data through ajax to php
  let formData = new FormData(form); // creating new formdata object
  xhr.send(formData);
}

chatBox.onmouseenter = ()=>{
  chatBox.classList.add("active");
}
chatBox.onmouseleave = ()=>{
  chatBox.classList.remove("active");
}

setInterval(()=>{
  //ajax code
  let xhr = new XMLHttpRequest(); //creating xml object
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              let data = xhr.response;
              chatBox.innerHTML = data;
              if(!chatBox.classList.contains("active")){ //if active class not contains in chatbox the scroll to bottom
                scrollToBottom();
              }
          }
      }
    }
  //we ahve to send the form data through ajax to php
  let formData = new FormData(form); // creating new formdata object
  xhr.send(formData);

}, 500); //this function will run frequently after 500ms

function scrollToBottom(){
  chatBox.scrollTop = chatBox.scrollHeight;
}







