let obstacleInterval;
let birdInterval;
let score = 0;
const birdImg = document.getElementById("birdImg");
let obstacleTop = document.getElementById("obstacle_top");
let obstacleBottom = document.getElementById("obstacle_bottom");
  const board = document.getElementById("board");
  board.style.height = innerHeight-40 + "px";
function setElements(){
    const cordinates = {
        birdWidth:70,
        birdHeigth:70,
        boardHeight:720}  
    birdImg.style.width = `${cordinates.birdWidth}px`;
    birdImg.style.height = `${cordinates.birdHeigth}px`;
    birdImg.style.top = `${cordinates.boardHeight/2-cordinates.birdHeigth}px`
}
document.addEventListener("DOMContentLoaded" , function(){
    setElements();
    document.getElementById("start").addEventListener("click" , movePipe)
})
function random(){
     let num = Math.floor(Math.random() * (410 - 280 + 1)) + 280;
    return num;
}
  function movePipe() {
  document.getElementById("start").style.display = "none"
  let count = 320;
   obstacleTop = document.getElementById("obstacle_top");
   obstacleBottom = document.getElementById("obstacle_bottom");
  let obstacleTopLeft = parseInt(obstacleTop.style.left || "200");
  let obstacleBottomLeft = parseInt(obstacleBottom.style.left || "200");
birdAnimation();
  obstacleInterval = setInterval(function() {
    count--;
    obstacleTop.style.left = `${obstacleTopLeft + count}px`;
    obstacleBottom.style.left = `${obstacleBottomLeft + count}px`;
    if (count == -200) {
      count = 320;
      obstacleTop.style.left = `${obstacleTopLeft + count}px`;
      obstacleBottom.style.left = `${obstacleBottomLeft + count}px`;
      obstacleTop.style.height = random() + "px";
      obstacleBottom.style.height = random() + "px";
    }
  }, 4);
  board.style.height = innerHeight + "px";
}
let bird = {
    x:200,
    y: 400
  };
  function birdAnimation() {
    alert("use space")
    birdInterval = setInterval(function() {
        bird.y+=28;
      birdImg.style.left = bird.x + "px";
      birdImg.style.top = bird.y + "px";
      requestAnimationFrame(detectCollisions);
    }, 300);
    document.addEventListener("keypress" , moveBird)
  }
  function moveBird(event){
   if(event.code =="Space"){
    bird.y-=40    
    birdImg.style.top = bird.y + "px";
   }
  }
 function detectCollisions(){
  let birdRect = birdImg.getBoundingClientRect();
  let obstacleTopRect = obstacleTop.getBoundingClientRect();
  let obstacleBottomRect = obstacleBottom.getBoundingClientRect();
  if(
    birdRect.right > obstacleTopRect.left &&
    birdRect.bottom > obstacleTopRect.top &&
     birdRect.left < obstacleTopRect.right &&
     birdRect.top < obstacleTopRect.bottom 
     ){
        gameOver();
     }
     if(
      birdRect.right > obstacleBottomRect.left &&
      birdRect.bottom > obstacleBottomRect.top &&
       birdRect.left < obstacleBottomRect.right &&
       birdRect.top < obstacleBottomRect.bottom 
       ){
        gameOver();
       
       }
       else{
        try{
             showScore()
        score++;
        requestAnimationFrame(score);
        }
        catch(error){
        }
       }
 }
 function gameOver(){
  clearInterval(birdInterval);
  clearInterval(obstacleInterval);
         document.removeEventListener("keypress" , moveBird);
       setInterval(() =>{
         document.getElementById("board").classList.add("hide");
         document.getElementById("gameOver").style.display = "block"
         document.getElementById("score").innerHTML = score
       } , 300)
 }
 function restart(){
location.reload()
 }
 function showScore(){
    document.getElementById("boardScore").innerHTML = score
 }