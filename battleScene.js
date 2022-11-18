const battleBackgroundImage = new Image()
battleBackgroundImage.src = './assets/images/battleBackground.png'
const battleBackground = new Sprite({
  image: battleBackgroundImage,
  position: {
    x: 0,
    y: 0,
  },
})

const draggle = new Monster(monsters.Draggle)
const emby = new Monster(monsters.Emby)

const rendererSprites = [draggle, emby]

emby.attacks.forEach((attack) => {
  const button = document.createElement('button')
  button.innerHTML = attack.name
  document.querySelector('#attacksBox').append(button)
})

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
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    emby.attack({
      attack: selectedAttack,
      recipient: draggle,
      rendererSprites,
    })

    if (draggle.health <= 0) {
      queue.push(() => {
        draggle.faint()
      })
    }
    
    // draggle or enemy attacks right here
    const randomAttack =
      draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

    queue.push(() => {
      draggle.attack({
        attack: randomAttack,
        recipient: emby,
        rendererSprites,
      })
    })
  })

  button.addEventListener('mouseenter', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    document.querySelector('#attackType').innerHTML = selectedAttack.type
    document.querySelector('#attackType').style.color = selectedAttack.color
  })
})

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.target.style.display = 'none'
})
