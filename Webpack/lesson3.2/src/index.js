import beauty from './beauty.jpg'
import style from './index.scss'
import createBeauty from './createBeauty'

createBeauty()

const img = new Image()
img.src = beauty
img.classList.add(style.beauty)

let root = document.getElementById('root')
root.append(img)

