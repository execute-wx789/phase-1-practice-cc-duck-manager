// write your code here!
const url = "http://localhost:3000/ducks"
const duckSelect = document.querySelector("#duck-nav")
const duckMain = document.querySelector("#duck-display")
const duckForm = document.querySelector("#new-duck-form")
const getConfig = {method: "GET",headers: {"Content-Type": "application/json"}}

function renderDuck(obj){
    const likeButton = duckMain.querySelector("#duck-display-likes")
    let currentLikes = obj.likes;
    (duckMain.querySelector("#duck-display-name")).textContent = obj.name;
    (duckMain.querySelector("#duck-display-image")).src = obj.img_url;
    likeButton.textContent = `${currentLikes} likes`;
    likeButton.addEventListener("click",(e)=>{
        currentLikes ++
        likeButton.textContent = `${currentLikes} likes`
    })

}
function addToList(obj){
    const img = document.createElement("img")
    img.src = obj.img_url
    duckSelect.append(img)
    img.addEventListener("click",(e)=>{
        e.preventDefault()
        renderDuck(obj)
    })
}

fetch(url, getConfig)
  .then(response=>response.json())
  .then(data=>data.forEach(duck => {
    addToList(duck)
    renderDuck(duck)
  })
)
duckForm.addEventListener("submit",(e)=>{
    const inputData = {
        name: e.target[0].value,
        img_url: e.target[1].value,
        likes: 0,
    }
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(inputData)})
})