const doorImage1 = document.getElementById("door1");
const doorImage2 = document.getElementById("door2");
const doorImage3 = document.getElementById("door3");
const startButton = document.getElementById("start");
const currentStreak = document.getElementById("current-number");
const bestStreak = document.getElementById("best-number");

const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

let numClosedDoors = 3;
let currentPlaying = true;
let currentScore = 0;
let bestScore = 0;

let openDoor1;
let openDoor2;
let openDoor3;

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if(choreDoor === 0){
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1){
    openDoor1 = spaceDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
}

const isClicked = door => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
}
const isBot = door => {
if (door.src === botDoorPath){
  return true;
} else {
  return false;
}
}

function playDoor(door){
  numClosedDoors--;
  if(numClosedDoors === 0){
    gameOver("win");
  } else if (isBot(door)){
    gameOver();
  }
}

doorImage1.onclick = () => {
  if(!isClicked(doorImage1) && currentPlaying){
    doorImage1.src = openDoor1;
  playDoor(doorImage1);
  }
}

doorImage2.onclick= () => {
  if(!isClicked(doorImage2) && currentPlaying){
    doorImage2.src = openDoor2;
  playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if(!isClicked(doorImage3) && currentPlaying){
  doorImage3.src = openDoor3;
  playDoor(doorImage3);
  }
}
startButton.onclick = () => {
  if(currentPlaying === false){
  startRound();
  }
}

function startRound() {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = "Good luck!";
  currentPlaying = true;
  randomChoreDoorGenerator();
}

function gameOver(status){
if(status === "win"){
  startButton.innerHTML = "You win! Play again?";
  startButton.style.paddingBottom = "10px";
  currentScore++;
  currentStreak.innerHTML = currentScore;
  if(currentScore > bestScore) {
    bestScore++;
    bestStreak.innerHTML = bestScore;
  }
} else {
  startButton.innerHTML = "Game over! Play again?";
   startButton.style.paddingBottom = "10px";
  startButton.style.paddingTop = "5px";
  currentScore = 0;
  currentStreak.innerHTML = currentScore;
}
currentPlaying = false;
}



startRound();
