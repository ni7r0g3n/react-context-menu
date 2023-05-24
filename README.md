<p style="text-align:left;">

<a align="left">![Version](https://img.shields.io/badge/Version-0.2.6-brightgreen?style=flat-square) ![React](https://img.shields.io/badge/React-^18.2.0-lightblue?style=flat-square&logo=react) </a>
<a style="float: right">
![React](https://img.shields.io/badge/Status-In_Development-orange?style=flat-square)
</a>

</p>

![Banner logo](https://user-images.githubusercontent.com/52223453/225049899-44b9e1a4-0830-415e-9707-75803e214886.png)

# React Context Menu

React context menu is a simple library to implement custom context menus in your react application. This package is still in development, feel free to report bugs, ask question and make suggestions.

[Read the full documentation](https://ni7r0g3n.github.io/react-context-menu/) for more information.

<br><br>

### Known issues:

- Nested menus will open one window each without closing the previous one. Might be desireable in some cases, I'll add the possibility to choose in the next versions.
- The current version has a problem with positioning depending whether the page is scrollable or not. The fix will probably be introduced in the next version (`0.3.0`) along with other features. Check the [Additional props](https://ni7r0g3n.github.io/react-context-menu/docs/Additional%20Props) section for more info.

### News:

`v0.2.6`

- **Refactoring and optimization**: the code has been refactored and optimized. The component is now much more lightweight and faster.
- **Accessibility**: the component is now compatible with basic accessibility standards. You can now open the menu with Enter/Spacebar, close it with Escape and navigate it with Tab and arrows. More complete accessibility features will be added in the future. Check the [Accessibility](https://ni7r0g3n.github.io/react-context-menu/docs/Accessibility) page for more info.

`v0.2.2`

- **Bugfix:** fixed a bug that prevented the menu from opening in the right spot when the document was scrollable. Refer to the [Additional Props](https://ni7r0g3n.github.io/react-context-menu/docs/Additional%20Props) page for more info.

`v0.2.0`

- **Dynamic positioning:** now the context menu will open around the cursor depending on the available space. No more squashed menus.
  <br>
  <br>
- **Improve events:** removed useless events and shifted the remaining ones.
  <br>
  <br>
- **Menu nesting:** now you can nest menus one inside the other, each with its own items and styles.
  <br>
  <br>
- **Classes:** you will now be able to use your project's css classes and modules to style the menu and its individual components.
  <br>
  <br>
- **Disable options:** you can now disable items of the menu. You can also specify a class to be used on disabled options.
  <br>
  <br>
- Generic fixes and optimizations.

<br><br>

## Installation

#### npm

`npm i @ni7r0g3n/react-context-menu`

#### yarn

`yarn add @ni7r0g3n/react-context-menu`

## Base Use

The component is very easy to use.

Wrap the component to the area you want to use the context menu on and pass an array of options.
The "label" can be both a string or a component.

```javascript
import { ContextMenu } from "@ni7r0g3n/react-context-menu";

function App() {
  const items = [
    { label: "Create", onClick: () => alert("Create clicked") },
    { label: "Edit", onClick: () => alert("Edit clicked") },
    { label: "Delete", onClick: () => alert("Delete clicked") },
  ];

  return (
    <ContextMenu items={items}>
      <div> Item to right click </div>
      <div> or items </div>
    </ContextMenu>
  );
}
```

## Nesting

It's also possible to nest context menus inside other context menus. This is useful if you need to specify different options for a specific context menu child. Keep in mind that as of now, each context menu you place has its own window, this means that opening a different context menu will not close the previous one.

```javascript
const items = [
  { label: "Create", onClick: () => alert("Create clicked") },
  { label: "Edit", onClick: () => alert("Edit clicked") },
  { label: "Delete", onClick: () => alert("Delete clicked") },
];

const nestedItems = [
  { label: "Nested 1", onClick: () => alert("Nested 1 clicked") },
  { label: "Nested 2", onClick: () => alert("Nested 2 clicked") },
  { label: "Nested 3", onClick: () => alert("Nested 3 clicked") },
];

return (
  <ContextMenu items={items}>
    <div> Item to right click </div>
    <ContextMenu items={nestedItems}>
      <div> or items </div>
    </ContextMenu>
  </ContextMenu>
);
```

### Disabling options

It's also possible to disable an option by setting the `disabled` flag on the desired item. You can also use the `disabledClassName` prop to specify a class to use (by default it's a grayscale and blur filter).

```javascript
const items = [
  { label: "Create", onClick: () => alert("Create clicked") },
  {
    label: "Edit",
    onClick: () => alert("Edit clicked"),
    disabled: true,
    disabledClassName: "class-name",
  },
  { label: "Delete", onClick: () => alert("Delete clicked") },
];
```

---

### Links:

- [Docs](https://ni7r0g3n.github.io/react-context-menu/)
- [GitHub Repo](https://github.com/ni7r0g3n/react-context-menu)
- [NPM Package](https://www.npmjs.com/package/@ni7r0g3n/react-context-menu)

---
