const input = document.querySelector("#todoInput")
const button = document.querySelector("#submit")
const todolist = document.querySelector(".todolist")
const errorbar = document.querySelector("#error")
let todoarr = [];
let inputdata;

// TODO :  1. Add some markdown editor type shit 
//         2. Store the todo in browser

button.addEventListener("click",(e)=>{
    addTodos(e)
})

function addTodos(e){
    inputdata=input.value
    errorbar.innerText=""
    let ul=document.createElement('ul')
    let li = document.createElement('li')
    e.preventDefault()
    input.value = ""
    if(inputdata===""){
        errorbar.innerText="* enter some todo"
    }
    else if (inputdata.trim()[0] == "!") {
        let data = inputdata.match(/\w.+/g).join("")
        todoarr.push(data);
        li.innerText=`${data}`
        ul.appendChild(li)
        todolist.appendChild(ul)

        li.style.fontWeight="bold"
    }
    else{
        todoarr.push(
            `${inputdata}`
        )
        li.innerText=`${inputdata}`
        ul.appendChild(li)
        todolist.appendChild(ul)
    }

    li.addEventListener("click",()=>{
        // strike through
        li.classList.length===0 ? li.classList.add("strike") : li.classList.remove("strike")
    })

    li.addEventListener("dblclick",(ev)=>{
        //delete the element
        let deletedelement = todoarr.indexOf(ev.target.innerText)
        todoarr.splice(deletedelement,1)
        ul.removeChild(li)
    })
}
