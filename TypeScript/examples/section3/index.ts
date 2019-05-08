interface LabelledValue {
  label: string
}

function printLabel (labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)

//可选属性
interface Square {
  color: string
  area: number
}

interface SquareConfig {
  color?: string,
  width?: number,

}

function createSquare (config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ color: 'black' })

//只读属性
interface Point {
  readonly x: number
  readonly y: number
}

let p1: Point = { x: 10, y: 20 }


