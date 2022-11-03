const button = document.getElementById('button');
const form = document.getElementById('newForm');

const userList = document.getElementById('listOfExpenses');
let bool = false;
let temp = null;
let user = null;
let edit = false;
// button.addEventListener('submit', (e) => {
    function onsubmit2(event){
        event.preventDefault();
        let amount = event.target.amount.value;
        let desc = event.target.description.value;
        let cat = event.target.category.value;
    
            // const li = document.createElement('li');
            // li.appendChild(document.createTextNode(`${amount} : ${desc} : ${cat}`));
            // userList.appendChild(li);
            let Obj = {
                amount,
                desc,
                cat
            }
            if(bool){
                bool = false;
                temp = Obj;
                edit = true;
            updateExpense(user)
                
                // if(edit){
                //     edit = true;
                //     window.location.reload();
                // }
            }
            else{
                axios.post("https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense",Obj)
                .then((response) => {
                    showExpenseOnScreen(response.data)
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err);
                });
            }
            event.target.amount.value = ''
            event.target.description.value = ''
            event.target.category.value = ''
    
        }
   

         

        // const expense = axios.get("https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense")
        // .then((response) => {
        //     console.log(response)

        //     for(var i=0; i<response.data.length; i++){
        //         showExpenseOnScreen(response.data[i]);
        //     }
        // })
        // .catch((err) => {
        //     console.log(err);
        // })

       
        // localStorage.setItem(Obj.desc, JSON.stringify(Obj));

        // let expense_deserialized = JSON.parse(localStorage.getItem(Obj.desc));
        // console.log(expense_deserialized);
        // showExpenseOnScreen(Obj);
// });

window.addEventListener('DOMContentLoaded',() => {
    const expense = axios.get("https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense")
    .then((response) => {
        console.log(response)

        for(var i=0; i<response.data.length; i++){
            showExpenseOnScreen(response.data[i]);
        }
    })
    .catch((err) => {
        console.log(err);
    })
    // console.log(expense);
 
 
 
 
 
    // const localStorObj = localStorage;
    // const localStorKeys = Object.keys(localStorObj);
    
    // for(let i=0; i<localStorKeys.length; i++){
    //     const keey = localStorKeys[i];
    //     const expenseDetailStr = localStorObj[keey];
    //     const expenseDetailObj = JSON.parse(expenseDetailStr);
    //     showExpenseOnScreen(expenseDetailObj);
    // }
})
function showExpenseOnScreen(expense){
    // if(localStorage.getItem(expense.desc) !== null){
    //     removeExpenseFromScreen(expense.desc);
    // }


    const parentNode = document.getElementById('listOfExpenses');
    const childHtml = `<li id=${expense._id}> ${expense.amount}-${expense.desc}-${expense.cat} 
    <button onclick = deleteExpense('${expense._id}') style = 'padding: 10px 10px; margin: 10px; background-color: beige'>Delete</button>
    <button onclick = editExpense('${expense.amount}','${expense.desc}','${expense.cat}','${expense._id}') style = 'padding: 10px 10px; margin: 10px; background-color: beige'>Edit</button></li>`

    parentNode.innerHTML = parentNode.innerHTML + childHtml;
    console.log(expense);
};
function deleteExpense(userID){
    axios.delete(`https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense/${userID}`)
    .then((response) => {
        removeExpenseFromScreen(userID)
    })
    .catch((err) => {
        console.log(err)
    })
    // console.log(desc);
    // localStorage.removeItem(desc);
    // removeExpenseFromScreen(desc)
}
function removeExpenseFromScreen(userID){
    const parentNode = document.getElementById('listOfExpenses');
    const childDeletion = document.getElementById(userID);
    // console.log(desc);
    if(childDeletion){
        parentNode.removeChild(childDeletion);
    }
}

// function editExpense(amount,desc,cat,_id){
//     console.log(amount,desc,cat);
//     document.getElementById('amount').value = amount;
//     document.getElementById('description').value = desc;
//     document.getElementById('category').value = cat;
//     let object = {
//         amount,
//         desc,
//         cat
//     };
    
//     if(object){
//         axios.put(`https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense/${_id}`,object)
//         .then((response) => {
//             console.log(response.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
    
// }
// }

let userid = null;
function editExpense(amount,desc,cat,_id){
        console.log(amount,desc,cat);
        bool = true;
        document.getElementById('amount').value = amount;
        document.getElementById('description').value = desc;
        document.getElementById('category').value = cat;
        user = _id;

        let object = {

            amount,
            desc,
            cat
        }
        
        // else{
        //     bool = false;
        //     userid = null;
            
        //     axios.post("https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense",object)
        //     .then((response) => {
        //         showExpenseOnScreen(response.data)
        //         console.log(response)
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // }
}
function updateExpense(_id){
    if(edit){
        console.log(temp);
        console.log(_id);
        axios.put(`https://crudcrud.com/api/e53df88e7e464ea3a490d31576d5d8cc/TrackExpense/${_id}`,temp)
        .then((response) => {
            window.location.reload();
            console.log(response);
        })
        .catch((err) => console.log(err))
    }
}