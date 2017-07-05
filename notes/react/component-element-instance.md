Component, element and instance
-------------------------------

If a component wants to create a child component it needs to create an instance
of it to keep it up to date.

```javascript
class Parent extends from Component {
  componentDidMount() {
    this.childState = true
  }

  handleClick = () => {
    return this.childState = false
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick}>Change child state</div>
        <Children update={this.childState}>I am a children!</Children>
      </div>
    )
  }
}
```

Each component needs to keep references to it's DOM node and to the instances of
the children components and do all the needed operations when needed.
This makes the parent hard to decouple from its children components.

An **element** is a plain object describing a component instance or DOM node and
its desired properties.

- It contains only information about the component type.
- It isn't an actual instance.
- We cannot call methods on them.
- They only have two fields *type* and *props*.
- Elements can be nested.
- In nested elements parent and children are just descriptions and not actual instances.
- Easy to traverse, don't need to be parsed and much lighter to DOM elements.

```javascript
{
  type: 'div',
  props: {
    update: true,
    children: 'I am a children!'
  }
}

<div update='true'>I am a children!</div>
```

The type of an element can be a function or a class corresponding a React component.

```javascript
{
  type: Children,
  props: {
    update: true,
    children: 'I am a children!'
  }
}

<Children update='true'>I am a children!</Children>
```

**IMPORTANT:** An element describing a component is also an element, just like an element
describing the DOM node. They can be nested and mixed with each other.

```javascript
<Parent>
  <Children update='true'>
    <b>I am a children!</b>
  </Children>
</Parent>

{
  type: Parent,
  props: {
    children: {
      type: Children,
      props: {
        children: {
          type: 'b',
          props: {
            children: 'I am a children!'
          }
        }
      }
    }
  }
}
```

When javascript sees this jsx definition or equivalent element object it starts
asking the compoent definitions in what it renders with the given props.
React repeats this process of asking the components until it knows everything.

**IMPORTANT:** We want to create an element tree with all the elements resolved.
The returned element tree can obtain both elements describing DOM nodes, and
elements describing other components. This lets you compose independent parts of
UI without relaying on their internal DOM structure.

For a react **component** props are the input and the element tree is the output.

Only components created with class have **instances** so we never create them
directly.
