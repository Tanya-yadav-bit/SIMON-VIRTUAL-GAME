let gameSeq=[];
let userSeq=[];
let gameScore=0;

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector("h2");


document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        
        levelup();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function playSound(color) {
    let audio = new Audio(`${color}.mp3.mp3`);
    audio.play();
}


function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    let rand= Math.floor(Math.random()*3);
    let randcol=btns[rand];
    let randbtn=document.querySelector(`.${randcol}`);
    gameSeq.push(randcol);
    playSound(randcol);
    gameflash(randbtn);
}

function checkAns(idx){
    
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            gameScore+=(level*10);
            setTimeout(levelup,1000);
        }
    }else{
        
        h2.innerText=`Game over! You Score is ${gameScore} Press any key to restart`;
        reset();
    }
}

function btnpress(){
    let btn=this;

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    playSound(userColor);
    userflash(btn);
    
    checkAns(userSeq.length -1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    gameScore=0;
    level=0;
}