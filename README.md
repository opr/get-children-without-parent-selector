[![Build Status](https://travis-ci.org/opr/get-children-without-parent-selector.svg?branch=master)](https://travis-ci.org/opr/get-children-without-parent-selector)

# Installation
Type `yarn add get-children-without-parent-selector` at the command line to add this to your project.

# Usage

```html
<div class="foo" id="alpha">

  <div class="foo_bar" id="beta">
    <div class="foo" id="gamma">
      <div class="foo_bar" id="delta"></div>
    </div>

    <div class="qux">
      <div class="foo_bar" id="epsilon"></div>
    </div>
  </div>

  <div>
    <div class="foo_bar" id="zeta"></div>
  </div>

</div>
```

```javascript
import getChildrenWithoutParentSelector from 'get-children-without-parent-selector';

const foo1 = document.getElementById('alpha');
const foo2 = document.getElementById('gamma');

// returns #beta, #epsilon and #zeta only
getChildrenWithoutParentSelector(foo1, '.foo_bar', '.foo');

// returns #delta only
getChildrenWithoutParentSelector(foo2, '.foo_bar', '.foo');
```