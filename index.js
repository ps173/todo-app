const input = document.querySelector("#todoInput")
const button = document.querySelector("#submit")
const todolist = document.querySelector(".todolist")
const errorbar = document.querySelector("#error")
let todoarr = [];
let inputdata;

// // TODO :  1. Add some markdown editor type shit 
//         2. Store the todo in browser with local storage

button.addEventListener("click",(e)=>{
    e.preventDefault()
    addTodos()
})

function addTodos(){
    inputdata=input.value
    errorbar.innerText=""
    let ul=document.createElement('ul')
    let li = document.createElement('li')
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

        // Bold go brr
        li.style.fontWeight="bold"
        todoarr.forEach(elem=>{
        localStorage.setItem(elem,elem)
        }) 
    }
    else{
        todoarr.push(
            `${inputdata}`
        )
        li.innerText=`${inputdata}`
        ul.appendChild(li)
        todolist.appendChild(ul)
        todoarr.forEach(elem=>{
        localStorage.setItem(elem,elem)
        }) 
    }
    li.addEventListener("click",()=>{
        // strike through
        li.classList.length===0 ? li.classList.add("strike") : li.classList.remove("strike")
    })

    li.addEventListener("dblclick",(ev)=>{
        // delete the element
        let deletedelement = todoarr.indexOf(ev.target.innerText)
        todoarr.splice(deletedelement,1)
        ul.removeChild(li)
    })
}


document.addEventListener("DOMContentLoaded",()=>{
    // add all the todo to the dom from local storage
    if(localStorage.length === 0){
        console.log("No Storage :)")
    }
    else{
        let localarr = allStorage()
        console.log(localarr)
        let ul=document.createElement('ul')
        localarr.forEach(elem=>{

            let li = document.createElement('li')
            li.innerText=elem
            ul.appendChild(li)

            li.addEventListener("click",()=>{
                li.classList.length===0 ? li.classList.add("strike") : li.classList.remove("strike")
            })

            li.addEventListener("dblclick",()=>{
                localStorage.removeItem(elem)
                ul.removeChild(li)
                console.log(elem,localarr)
            })

        })
        todolist.appendChild(ul)
    }
})


// get all the storage inside a array
function allStorage(){
        let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}
