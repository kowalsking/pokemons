
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './assets/images/battleBackground.png'
const battleBackground = new Sprite({
  image: battleBackgroundImage,
  position: {
    x: 0,
    y: 0,
  }
})


const draggle = new Monster(monsters.Draggle)
const emby = new Monster(monsters.Emby)

const rendererSprites = [draggle, emby]
const button = document.createElement('button')
button.innerHTML = 'Fireball'
document.querySelector('#attacksBox').append(button)

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