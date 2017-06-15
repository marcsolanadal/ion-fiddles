let ECS = {}

ECS.Entity = function Entity () {

  this.id = (+new Date().toString(16)
    + Math.random() * 1000000 | 0)
    + ECS.Entity.prototype._count

  ECS.Entity.prototype._count + 1

  this.components = {}

  return this
}

ECS.Entity.prototype._count = 0;


const Entity = () => {
  const id = (+new Date().toString(16)
    + Math.random() * 1000000 | 0)
    + ECS.Entity.prototype._count

  let components = {}

  const addComponent = (component) => {
    this.components[component.name] = component
    return components
  }

  const removeComponent = (name) => {
    this.components = components.filter(component => component.name !== name)
  }


  }
}
.removeComponent = function removeComponent ( componentName ){
    // Remove component data by removing the reference to it.
    // Allows either a component function or a string of a component name to be
    // passed in
    var name = componentName; // assume a string was passed in

    if(typeof componentName === 'function'){
        // get the name from the prototype of the passed component function
        name = componentName.prototype.name;
    }

    // Remove component data by removing the reference to it
    delete this.components[name];
    return this;
};

ECS.Entity.prototype.print = function print () {
    // Function to print / log information about the entity
    console.log(JSON.stringify(this, null, 4));
    return this;
};
