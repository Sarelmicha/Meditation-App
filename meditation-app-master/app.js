const app = function (){
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //Time Display 
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Pick different sounds
    sounds.forEach(function(sound){
        sound.addEventListener("click", function(){
            //Change the global playing in the background sound and video
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        });
    });

    //Play sound
    play.addEventListener("click", function(){
        checkPlaying(song)
    });

    //Select sound
    timeSelect.forEach(function(option){
        option.addEventListener("click", function(){
            //When clicking a diffrent time the fakeDuration will change to display to screen.
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = Math.floor(fakeDuration / 60) + ":" + Math.floor(fakeDuration % 60);
        });
    });

    //Create a function specific to stop and play the sounds
    const checkPlaying = function(song){
        if(song.paused){
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    }

    //Animate the circle
    song.ontimeupdate = function(){
        let currentTime = song.currentTime; //start at zero
        let elapsed = fakeDuration - currentTime; // counting backword.
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate the text
        timeDisplay.textContent = minutes + ":" + seconds;
        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    }
}

function animateCircle(){
    
}


app();