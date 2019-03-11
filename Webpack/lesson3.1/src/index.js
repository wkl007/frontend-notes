import beauty from './beauty.jpg'
// const beauty = require('./beauty.jpg')
import './index.scss'

const img = new Image()
img.src = beauty
img.classList.add('beauty')

let root = document.getElementById('root')
root.append(img)

