const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music array
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'ELectric Chill Machine',
        artist: "Jacinto Design",
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: "Jacinto Design",
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: "Jacinto Design",
    },
    {
        name: 'metric-1',
        displayName: 'Front Row',
        artist: "Jacinto Design",
    },
]

let isPlaying = false;

//Play and pause functions
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


//Play/pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex= 0;

//Next
function nextSong() {
    songIndex++;
    if (songIndex > songs.length-1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Go back/ previous song
function prevSong() {
    songIndex--;
// If statement incase previous button is hit on first song
    if (songIndex < 0) {
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// on load load song
loadSong(songs[songIndex]);

// Update progress bar and time
function updateProgressBar(e) {
    if (isPlaying ) {
        const { duration, currentTime} = e.srcElement;
        // Update progress bar percentage
        const progressPercent = (currentTime/ duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Timer in minutes
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        // If Statement below turns seconds below six into a X:0X time
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Code below put into durationseconds if funciton so the NAN wont
        // Appear before the duration loads.
        // durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        // ! Delay Switching Duration ELement to avoid NaAN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        // If Statement below turns seconds below six into a X:0X time
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//  Set Progress Bar
// Using the width of the progress bar
function setProgressBar(e){
    console.log(e);
    const width = this.clientWidth;
// OFFSET-x is where the click is recorded on the progress bar
    const clickX = e.offsetX;
    const {duration} = music;
    console.log(clickX/width);
    music.currentTime = (clickX / width) * duration;
    
}

//! Event Listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

