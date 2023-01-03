const battleBackgroundImage = new Image()
battleBackgroundImage.src = './assets/images/battleBackground.png'
const battleBackground = new Sprite({
  image: battleBackgroundImage,
  position: {
    x: 0,
    y: 0,
  },
})

let draggle
let emby
let rendererSprites
let battleAnimationId
let queue

function initBattle() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#playerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()

  draggle = new Monster(monsters.Draggle)
  emby = new Monster(monsters.Emby)
  rendererSprites = [draggle, emby]
  queue = []

  emby.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
  })

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
        queue.push(() => {
          // fade back to black
          gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
              window.cancelAnimationFrame(battleAnimationId)
              animate()

              document.querySelector('#userInterface').style.display = 'none'
              gsap.to('#overlappingDiv', {
                opacity: 0,
              })

              battle.initiated = false
              audio.Map.play()
            },
          })
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

        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint()
          })

          gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
              window.cancelAnimationFrame(battleAnimationId)
              animate()

              document.querySelector('#userInterface').style.display = 'none'
              gsap.to('#overlappingDiv', {
                opacity: 0,
              })

              battle.initiated = false
              audio.Map.play()
            },
          })
        }
      })
    })

    button.addEventListener('mouseenter', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      document.querySelector('#attackType').innerHTML = selectedAttack.type
      document.querySelector('#attackType').style.color = selectedAttack.color
    })
  })
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()

  rendererSprites.forEach((sprite) => {
    sprite.draw()
  })
}

animate()
// initBattle()
// animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.target.style.display = 'none'
})
