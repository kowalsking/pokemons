const obj = {
  a: 1
}

const p = new Proxy(Array, {
  get(target, property) {
    console.log('get target', target.name)
    console.log('get property', target[property])
    return target[property]
  },
  set(target, property, value) {
    console.log('set target', target)
    console.log('set property', property)
    console.log('set value', value)
    return target[property] = value
  },
})

// p.a = 2
// console.log('a', p.a)

const test = {
  length: 0,
  arr: [],
  add: function (elem) {
    p.prototype.push.call(this.arr, elem)
  }
}

test.add(1)
// console.log('test', test) // test { length: 0, arr: [ 1 ], add: [Function: add] }


abstract class Ameba {
  hello: number
  erro: boolean
}

class Tu implements Ameba {
  hello: 3
  erro: false
}