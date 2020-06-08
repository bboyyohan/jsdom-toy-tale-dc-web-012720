let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  fetchToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  toyForm.addEventListener("submit", handleSubmit)
});

function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toysArray => {
    // toysArray.forEach( toy => console.log(toy))
    toysArray.forEach( toy => {
      renderAToy(toy)
    })
  })
}

function renderAToy(toy) {
  // debugger
  // console.log(toy)
  let collection = document.getElementById('toy-collection')
  let card = document.createElement('div')
  card.className = "card"
  card.dataset.id = toy.id //use for patch request 
  let toyName = document.createElement('h2')
  toyName.innerText = toy.name 
  let toyImage = document.createElement('img')
  toyImage.className = "toy-avatar"
  toyImage.src = toy.image 
  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`
  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like <3"
  button.addEventListener("click", (event) => handleLike(event, card.dataset.id)) //commented out before

  card.append(toyName, toyImage, likes, button)
  collection.append(card)




}

function handleLike(event, id) {
  let tLike = event.target.previousElementSibling
  let addLike = parseInt(tLike.innerText[0].split(" ")) + 1
  let url = "http://localhost:3000/toys"
  fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      likes: addLike
    })

    }).then(res => res.json())
    .then(() => { tLike.innerText = `${addLike} likes`})
}

  
  // debugger


function handleSubmit(event) {
  event.preventDefault()
  // debugger
  let tName = event.target.name.value
  let tImage = event.target.image.value
  createNewToy(tName, tImage)
  event.target.reset()
}

function createNewToy(tName, tImage){
  // debugger
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: tName,
      image: tImage,
      likes: 0
    })

  }).then(res => res.json())
  .then(toy => renderAToy(toy))
}

// function handleLike() {

// }