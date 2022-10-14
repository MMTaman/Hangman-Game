//main menu
const preview = document.querySelector(".preview");
const playButton = document.querySelector("#playBtn");
const glitch = new Audio("glitch.wav");
//game menu
const gameMenu = document.querySelector(".gameMenu");
const wordBox = document.querySelector(".word");
const click = new Audio("click.wav");
const won=new Audio('won.wav')
const lost=new Audio('failed.wav')
const backButton = document.querySelector("#backBtn");
const tryButton = document.querySelector("#tryAgainBtn");
const attemptsMenu = document.querySelector(".attempts");
let attmeptsLeft;
let successAttempts;
let allDashes;
let lettersArr = [];
let correctLettersArr = [];

let words = [
   "Old Trafford",
   "Stamford Bridge",
   "Anfield",
   "Tottenham Stadium",
   "Selhurst PArk",
   "Villa Park",
   "st mary stadium",
   "molineux stadium",
   "The Amex",
   "Elland Road",
   "King Power Stadium",
   "goodison park",
   "st james park",
   "Emirates Stadium",
   "Community stadium",
   "London Stadium",
   "Etihad",
   "Craven Cottage",
   "the city ground",
   "vitality"
];
let word;

//fadeout effect

const fadeOutEffect = (target) => {
   let fadeTarget = target;
   let fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
         fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
         fadeTarget.style.opacity -= 0.1;
      } else {
         clearInterval(fadeEffect);
      }
   }, 40);
};

//fade in effect if needed

// const fadeInEffect=(element)=> {
//     let op = 0.1;  // initial opacity
//     element.style.display = 'block';
//     var timer = setInterval(function () {
//         if (op >= 1){
//             clearInterval(timer);
//         }
//         element.style.opacity = op;
//         element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//         op += op * 0.1;
//     }, 30);
// }

//MAIN MENU

//adding sound to the play button
playButton.addEventListener("mouseover", () => glitch.play());

//when playBtn is pressed

let startGame = () => {
   word = words[Math.floor(Math.random() * words.length)].toLowerCase();
   //adding new dashes
   for (let i = 0; i < word.length; i++) {
      let newSpan = document.createElement("span");
      if (word[i] === " ") newSpan.innerHTML = " ";
      else newSpan.innerHTML = "-";
      wordBox.append(newSpan);
   }
   allDashes = document.querySelectorAll("span");
   attmeptsLeft = 8;
   attemptsMenu.innerHTML = `attempts left : ${attmeptsLeft}`;
   successAttempts = 0;
   correctLettersArr = [];
   lettersArr = [];
   fadeOutEffect(preview);
   setTimeout(() => {
      preview.style.display = "none";
      preview.style.opacity = "1";
      gameMenu.style.display = "grid";
   }, 1000);

   //when entering a letter
   let pressedKey = (e) => {
      click.play();
      let pressed = e.key;
      let includedLetter = word
         .split("")
         .filter((Oletter) => Oletter === pressed);
      if (lettersArr.every((el) => el != pressed)) {
         lettersArr.push(pressed);

         if (attmeptsLeft > 1) {
            if (includedLetter != 0) {
               if (correctLettersArr.every((el) => el != pressed)) {
                  correctLettersArr.push(pressed);
                  successAttempts += includedLetter.length;
               }
               let i = 0;
               while (i < word.length) {
                  if (word[i] === pressed) allDashes[i].innerHTML = pressed;
                  i++;
               }
               if (successAttempts >= word.match(/\w/g).length) {
                  attemptsMenu.innerHTML = `attempts left : 0`;
                  tryButton.style.display = "block";
                  won.play()
               }
            } else {
               attmeptsLeft--;
               attemptsMenu.innerHTML = `attempts left : ${attmeptsLeft}`;
            }
         } else {
            attemptsMenu.innerHTML = `attempts left : 0`;
            tryButton.style.display = "block";
            lost.play()
         }
      } else return;
   };

   document.addEventListener("keyup", pressedKey);
};
playButton.addEventListener("click", startGame);

//Game MENU

backButton.addEventListener("click", () => {
   fadeOutEffect(gameMenu);
   setTimeout(() => {
      gameMenu.style.display = "none";
      gameMenu.style.opacity = "1";
      preview.style.display = "flex";
      tryButton.style.display = "none";
      for (let i = 0; i < word.length; i++) {
         wordBox.removeChild(document.querySelector(".word span"));
      }
   }, 1000);
});

tryButton.addEventListener("click", () => {
   for (let i = 0; i < word.length; i++) {
      wordBox.removeChild(document.querySelector(".word span"));
   }
   tryButton.style.display = "none";
   startGame();
});
