function add (x: number, y: number): number {
  return x + y
}

let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}

//可选参数
function buildName (firstName: string, lastName?: string) {
  return firstName + ' ' + lastName
}

let result3 = buildName('Bob')

//默认参数
function buildName1 (firstName: string, lastName = 'Smith'): string {
  return firstName + ' ' + lastName
}

let result2 = buildName('Bob', undefined)     // 正常, 同样 "Bob Smith"

//剩余参数
function buildName3 (firstName: string, ...restOfName: string[]): string {
  return firstName + ' ' + restOfName.join(' ')
}

let employeeName = buildName3('Joseph', 'Samuel', 'Lucas', 'MacKinzie')

//this
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]

  createCardPicker (this: Deck): () => Card
}

let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  // NOTE: 函数现在显式指定其被调用方必须是 deck 类型
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()

console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)