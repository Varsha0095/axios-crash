const button = document.getElementById("button");
const form = document.getElementById("newForm");

const userList = document.getElementById("listOfExpenses");
let bool = false;
let temp = null;
let user = null;
let edit = false;
// button.addEventListener('submit', (e) => {
async function onsubmit2(event) {
  event.preventDefault();
  let amount = event.target.amount.value;
  let desc = event.target.description.value;
  let cat = event.target.category.value;

  let Obj = {
    amount,
    desc,
    cat,
  };
  if (bool) {
    bool = false;
    temp = Obj;
    edit = true;
    //  updateExpense(user)
    try {
      await axios
        .put(
          `https://crudcrud.com/api/cb83671e8b984212b05b2bbac9ce9e78/TrackExpense/${user}`,
          temp
        )
        .then((response) => {
          window.location.reload();
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  } else {
    axios
      .post(
        "https://crudcrud.com/api/cb83671e8b984212b05b2bbac9ce9e78/TrackExpense",
        Obj
      )
      .then((response) => {
        showExpenseOnScreen(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  event.target.amount.value = "";
  event.target.description.value = "";
  event.target.category.value = "";
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const expense = await axios
      .get(
        "https://crudcrud.com/api/cb83671e8b984212b05b2bbac9ce9e78/TrackExpense"
      )
      .then((response) => {
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {
          showExpenseOnScreen(response.data[i]);
        }
      });
  } catch (err) {
    console.log(err);
  }
});
function showExpenseOnScreen(expense) {
  const parentNode = document.getElementById("listOfExpenses");
  const childHtml = `<li id=${expense._id}> ${expense.amount}-${expense.desc}-${expense.cat} 
    <button onclick = deleteExpense('${expense._id}') style = 'padding: 10px 10px; margin: 10px; background-color: beige'>Delete</button>
    <button onclick = editExpense('${expense.amount}','${expense.desc}','${expense.cat}','${expense._id}') style = 'padding: 10px 10px; margin: 10px; background-color: beige'>Edit</button></li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHtml;
  console.log(expense);
}
async function deleteExpense(userID) {
  try {
    await axios
      .delete(
        `https://crudcrud.com/api/cb83671e8b984212b05b2bbac9ce9e78/TrackExpense/${userID}`
      )
      .then((response) => {
        removeExpenseFromScreen(userID);
      });
  } catch (err) {
    console.log(err);
  }
}
function removeExpenseFromScreen(userID) {
  const parentNode = document.getElementById("listOfExpenses");
  const childDeletion = document.getElementById(userID);
  // console.log(desc);
  if (childDeletion) {
    parentNode.removeChild(childDeletion);
  }
}

let userid = null;
function editExpense(amount, desc, cat, _id) {
  console.log(amount, desc, cat);
  bool = true;
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = desc;
  document.getElementById("category").value = cat;
  user = _id;
}
// function updateExpense(_id){
//     if(edit){
//         console.log(temp);
//         console.log(_id);
//         axios.put(`https://crudcrud.com/api/cb83671e8b984212b05b2bbac9ce9e78/TrackExpense/${_id}`,temp)
//         .then((response) => {
//             window.location.reload();
//             console.log(response);
//         })
//         .catch((err) => console.log(err))
//     }
// }
