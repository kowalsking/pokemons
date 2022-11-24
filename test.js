const obj = {
  a: 1
};

const p = new Proxy(obj, {
  get(target, property) {
    console.log('get target', target);
    console.log('get property', property);
    return target[property];
  },
  set(target, property, value) {
    console.log('set target', target);
    console.log('set property', property);
    console.log('set value', value);
    target[property] = value;
  }
})

p.a = 2
console.log('a', p.a)
