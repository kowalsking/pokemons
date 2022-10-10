const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './src/assets/images/Pellet Town.png'

const playerImage = new Image()
playerImage.src = './src/assets/images/playerDown.png'

image.onload = () => {
  c.drawImage(image, -750, -650) // -785, -650
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - (playerImage.width / 4) / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height,
  )
}

function animate() {


  requestAnimationFrame(animate)
}
animate()

window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'w':
      break
    case 'a':
      break
    case 's':
      break
    case 'd':
      break
  }
})