const app = () => {
  const song = document.querySelector('.song')
  const play = document.querySelector('.play')
  const outline = document.querySelector('.moving-outline circle')
  const video = document.querySelector('.vid-container video')
  const replay = document.querySelector('.replay')

  // Sounds
  const sounds = document.querySelectorAll('.sound-picker button')

  // Time Display
  const timeDisplay = document.querySelector('.time-display')
  const timeSelect = document.querySelectorAll('.time-select button')

  // Get the length of the outline
  const outlineLength = outline.getTotalLength()

  // Duration
  let fakeDuration = 600

  outline.style.strokeDasharray = outlineLength
  outline.style.strokeDashoffset = outlineLength

  //  Pick different sounds

  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.dataset.sound
      video.src = this.dataset.video
      checkPlaying(song)
    })
  })

  // Play Sound
  play.addEventListener('click', () => {
    checkPlaying(song)
  })

  // Select sound

  timeSelect.forEach(btn => {
    btn.addEventListener('click', function () {
      fakeDuration = this.dataset.time
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
    })
  });

  // Create a function specific to stop song and play 
  const checkPlaying = song => {

    if (song.paused) {
      song.play()
      video.play()
      play.src = './svg/pause.svg'
    } else {
      song.pause()
      video.pause()
      play.src = './svg/play.svg'
    }

  }

  // Animate circle
  song.ontimeupdate = function () {
    let currentTime = song.currentTime
    let elapsed = fakeDuration - currentTime
    let seconds = Math.floor(elapsed % 60)
    let minutes = Math.floor(elapsed / 60)




    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
    outline.style.strokeDashoffset = progress

    // Animate Text

    timeDisplay.textContent = `${minutes > 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`

    if (currentTime >= fakeDuration) {
      song.pause()
      song.currentTime = 0
      play.src = './svg/play.svg'
      video.pause()
    }

    // replay

    replay.addEventListener('click', (evt) => {
      song.currentTime = 0
    })
  }
}

app()