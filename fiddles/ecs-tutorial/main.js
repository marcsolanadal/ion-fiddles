let ECS = {}

ECS.Entity = () => {
  const id = (+new Date().toString(16)
    + Math.random() * 1000000 | 0)

  let components = {}

  const curry = (fn) => {
    return (params) => {
      fn(params)
      return {
        id,
        components
      }
    }
  }

  const addComponent = (comp) => {
    components[comp.name] = comp
  }

  const removeComponent = (name) => {
    components = components.filter(component => component.name !== name)
  }

  const print = () => {
    console.log(id, components)
  }

  return {
    addComponent: curry(addComponent),
    removeComponent: removeComponent,
    print
  }

}

console.log('ECS', ECS)

const entity = ECS.Entity();
const test = entity.addComponent({ name: 'HEALTH', foo: 'bar' })
console.log('test', test);
entity.print();
