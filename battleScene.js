
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './assets/images/battleBackground.png'
const battleBackground = new Sprite({
  image: battleBackgroundImage,
  position: {
    x: 0,
    y: 0,
  }
})

const draggleImage = new Image()
draggleImage.src = './assets/images/draggleSprite.png'
const draggle = new Sprite({
  position: {
    x: 800,
    y: 100,
  },
  image: draggleImage,
  frames: {
    max: 4,
    hold: 30,
  },
  animate: true,
  isEnemy: true,
  name: 'Draggle'
})

const embyImage = new Image()
embyImage.src = './assets/images/embySprite.png'
const emby = new Sprite({
  position: {
    x: 280,
    y: 325,
  },
  image: embyImage,
  frames: {
    max: 4,
    hold: 30,
  },
  animate: true,
  name: 'Emby'
})

const rendererSprites = [draggle, emby]

function animateBattle() {
  window.requestAnimationFrame(animateBattle)
  battleBackground.draw()

  rendererSprites.forEach((sprite) => {
    sprite.draw()
  })
}

animateBattle()

const queue = []

// event listeners for our buttons (attack and fireball)
const buttons = document.querySelectorAll('button')
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const type = e.currentTarget.innerHTML
    emby.attack({
      attack: attacks[type],
      recipient: draggle,
      rendererSprites
    })

    queue.push(() => {
      draggle.attack({
        attack: attacks.Tackle,
        recipient: emby,
        rendererSprites
      })
    })
  })
})

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.target.style.display = 'none'
})