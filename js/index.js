
document.addEventListener("DOMContentLoaded", function() {});
const showPanel = document.querySelector("#show-panel")
const allBooks = "http://localhost:3000/books"
const bookUl = document.querySelector("#list")
// fetch
fetchBooks()

function fetchBooks() {
    fetch(allBooks)
    .then(resp => resp.json())
    // .then(data => console.log("hi",data))
    .then(data => slapBookOnDom(data))
}

// Dom/events 
function slapBookOnDom(data) {
    // console.log("hi", data)
    data.forEach((singleBook) => {
        // console.log(singleBook)
    let bookLi = document.createElement("LI"); 
    // console.log(bookLi)
    //
    bookLi.innerHTML += `
    ${singleBook.title}
    `
    //render books on DOM
    bookUl.append(bookLi)
    //addEventListener with arrow function 
    //anonymous function because Avi is a jerkl
    bookLi.addEventListener("click", () => handleClick(singleBook))
    //without arrow function
    // bookLi.addEventListener("click", function handleCT(event) {
        // console.log(event.target) 
    // })
    })
}



//callback arrow 
handleClick = (e) => { 
    showPanel.innerHTML += `
        <img src=${e.img_url}/>
        <p>${e.description}</p>
        
        `
        let likeButton = document.createElement("BUTTON")
        likeButton.innerHTML += `
            ${e.users.length}
        `
        //append likeButton to showPanel and addEventListener
        showPanel.append(likeButton)
        likeButton.addEventListener("click", () => handleLike(e))
        // <button>${e.users.length}</button>

}
handleLike = (e) => {
    // console.log('Hi', e)

    let newLikedUsers = [...e.users, {"id":1, "username":"pouros"}]
    fetch(`http://localhost:3000/books/${e.id}`,{
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
      "users": newLikedUsers})
      })
    .then(res => res.json())
    .then(response => console.log(response))

}

