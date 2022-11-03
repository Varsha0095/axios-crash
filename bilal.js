/*function ongetacall(event){
    event.preventDefault();
    console.log(event.target.phone.value);
    console.log(event.target.date.value);
    console.log(event.target.time.value);
}*/
// const button = document.querySelector('button');
//  button.addEventListener('click',(e) => {
//      e.preventDefault();
//      console.log('click');

//  });
//  button.addEventListener('mouseover',(e) => {
//      e.preventDefault();
//      console.log('mouseover');
//  });
//  button.addEventListener('mouseout', (e) => {
//      e.preventDefault();
//      console.log('mouseout');
//  });
// console.log('hello');
let bool = false;
let userID = null;
let check = false;
async function onsubmit1(event) {
  event.preventDefault();
  var name = event.target.name.value;
  var mail = event.target.Email.value;
  var phone = event.target.phone.value;
  let obj = {
    name,
    mail,
    phone,
  };
  if (bool) {
    check = false;
    try {
      await axios.put(
        `https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense/${userID}`,
        obj
      );
      check = true;
    } 
    catch (err) {
      console.log(err);
    }
    if (check) {
      check = false;
      window.location.reload();
    }
  } else {
    bool = false;
    userID = null;
    axios
      .post(
        "https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense",
        obj
      )
      .then((response) => {
        showUserOnScreen(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  axios.post("https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense", obj)
  //  .then((response) => {
  //    showUserOnScreen(response.data)
  //    console.log(response);
  //  })
  //  .catch((err) => {
  //    console.log(err);
  //  })

  event.target.name.value = "";
  event.target.Email.value = "";
  event.target.phone.value = "";

  // let obj_serialized = JSON.stringify(obj);
  //  localStorage.setItem(obj.mail , JSON.stringify(obj));      //storing all the users without deleting the older ones

  //  let userObj_deserialized = JSON.parse(localStorage.getItem(obj.mail));
  //   console.log(userObj_deserialized);
  // localStorage.setItem('name', name);
  // localStorage.setItem('Email', mail);
  // console.log(event.target.Email.value);
  //  showUserOnScreen(obj)
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense")
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //  const localStorageObj = localStorage;
  //  const localstorageKeys = Object.keys(localStorageObj);

  //  for(let i=0; i<localstorageKeys.length; i++){
  //      const key = localstorageKeys[i];
  //      const userDetailsStr = localStorageObj[key];
  //      const userDetailsObj = JSON.parse(userDetailsStr);
  //      showUserOnScreen(userDetailsObj);
  //  }
});

function showUserOnScreen(user) {
  //  if(localStorage.getItem(user.mail) !== null){
  //    removeUserFromScreen(user.mail)
  //  }

  const parentNode = document.getElementById("listOfUsers"); //creating parentnode
  const childHtml = `<li class='items' id=${user._id}> <span class='name'>${user.name}</span> - <span class='email'>${user.mail}</span> 
                        <button class='btn' onclick = deleteUser('${user._id}') style = 'color: white; background-color: gray;'>Delete User</button> 
                        <button class='btn' onclick = editUserDetails('${user.name}','${user.mail}','${user.phone}','${user._id}') style = 'color:white; background-color: gray;'>Edit User </li>`; //creating child nodes

  parentNode.innerHTML = parentNode.innerHTML + childHtml; //pushing childnodes into parent node
}
function editUserDetails(name, mail, phone, userId) {
  // axios.put(`https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense/${userId}`,obj)
  //    .then((response) => {

  //    })
  //    .catch((err) => {
  //       console.log(err);
  //    })

  //  console.log(name, mail, phone);
  console.log("edit ");
  document.getElementById("name").value = name;
  document.getElementById("Email").value = mail;
  document.getElementById("phone").value = phone;
  bool = true;
  userID = userId;
  // console.log(name, mail, phone, userId);
  // const object = {
  //    name,
  //    mail,
  //    phone
  // }
  // if(object){
  //    axios.put(`https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense/${userId}`,object)
  //    .then((response) => {
  //       if(response.ok){
  //          console.log(response.data);
  //       }
  //       // else{
  //       //    throw new Error("Something Went wrong")
  //       // }
  //    })
  //    .catch((err) => {
  //       console.log(err);
  //    })
  // }

  //  deleteUser(userId)
}

function deleteUser(userId) {
  axios
    .delete(
      `https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense/${userId}`
    )
    .then((response) => {
      removeUserFromScreen(userId);
    })
    .catch((err) => {
      console.log(err);
    });
  //  console.log(mail);
  //  localStorage.removeItem(mail);
  //  removeUserFromScreen(mail);
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("listOfUsers");
  const childToBeDeleted = document.getElementById(userId);
  console.log(userId);
  parentNode.removeChild(childToBeDeleted);
}