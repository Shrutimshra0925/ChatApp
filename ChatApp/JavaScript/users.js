const searchBar = document.querySelector(".users .search input"),
searchBtn = document.querySelector(".users .search button"),
usersList = document.querySelector(".users .users-list");

// form.onsubmit = (e)=>{
//     e.preventDefault();
// }

searchBtn.onclick = ()=>{
  searchBar.classList.toggle("active");
  searchBar.focus();
  searchBtn.classList.toggle("active");
  searchBar.value = "";
}

searchBar.onkeyup = ()=>{
  let searchTerm = searchBar.value;
  if(searchTerm != ""){
    searchBar.classList.add("active");
  }else{
    searchBar.classList.remove("active");
  }
  // ajax code
  let xhr = new XMLHttpRequest(); //creating xml object
  xhr.open("POST", "php/search.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
            let data = xhr.response;
            usersList.innerHTML = data;
        }
    }
  }
  // let formData = new FormData(form);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("searchTerm=" + searchTerm);
}

setInterval(()=>{
  //ajax code
  let xhr = new XMLHttpRequest(); //creating xml object
    xhr.open("GET", "php/users.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              let data = xhr.response;
              if(!searchBar.classList.contains("active")){ //if active not contains in search bar then this data
                usersList.innerHTML = data;
              }
          }
      }
    }
    // let formData = new FormData(form);
    xhr.send();

}, 500); //this function will run frequently after 500ms