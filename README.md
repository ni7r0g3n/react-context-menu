<p style="text-align:left;">

<a align="left">![Version](https://img.shields.io/badge/Version-0.1.3-brightgreen?style=flat-square) ![React](https://img.shields.io/badge/React-^18.2.0-lightblue?style=flat-square&logo=react) </a>
<a style="float: right">
![React](https://img.shields.io/badge/Status-In_Development-orange?style=flat-square)
</a>

</p>

![Banner logo](https://user-images.githubusercontent.com/52223453/225049899-44b9e1a4-0830-415e-9707-75803e214886.png)

# React Context Menu

React context menu is a simple library to implement custom context menus in your react application. This package is still in development, feel free to report bugs, ask question and make suggestions.

> Full documentation on docusaurus coming soon...

<br><br>

### Known issues:

> - (Typescript) When assigning the `animated` prop as an object you must specify the type (`ContextMenuProps['animated']`) using the `as` keyword or ts goes apeshit. I'll have to figure how to force the component to accept both a boolean and an object of that type.
> - Right now the context menu always appears with the top-left corner on your pointer, this means that the right and bottom borders of the window might squish (scientific term) the menu if opened too close. It would be ideal to have it open dynamically around the pointer depending on the size and distance from the borders of the window. I'll have to do some styling kung-fu here.

### News:

> - `0.1.3`: **Improved menu base style and customization process.** The GIFs in the documentation are now outdated. I'll wait for the full documentation to be ready since it will feature directly demos of the component itself.

<br><br>

# Installation

`@ni7r0g3n/react-context-menu` has no dependencies other than `react`. It technically requires version `^18.2.0` of react, but it should work with `^17` as well, since the documentation is completely written in `17` and it works fine (remember to use `--legacy-peer-deps` in that case).

This package is available both on npm and yarn:

> ### npm
>
> `$ npm i @ni7r0g3n/react-context-menu`

> ### yarn
>
> `$ yarn add @ni7r0g3n/react-context-menu`

<br><br>

# Base Use

The component is very easy to use.

Wrap the component to the area you want to use the context menu on and pass an array of options.
The "label" can be both a string or a component.

```javascript
import { ContextMenu } from '@ni7r0g3n/react-context-menu';

function App() {

const items = [
  {label: "Open in a new tab", onClick: () => window.open("https://reactjs.org", "_blank")},
  {label: "Copy", onClick: () => navigator.clipboard.writeText("https://reactjs.org")},
];

return (
    <ContextMenu items={items}>
      <ChildComponent/>
    </ContextMenu>
);
```

![RCMex1](https://user-images.githubusercontent.com/52223453/223091888-145a60db-e502-4dca-a577-5f2147b739b9.gif)

<br><br>

# Customisation

It's possible to choose a style both for the container and the rows through `menuStyle` prop. You can also customise directly a single row with the `style` and `hoverStyle` properties in the desired item. Styles are applied in this order:

- style and hoverStyle
- menuStyle
- defaultStyle

meaning `style` and `hoverStyle` override `menuStyle` that overrides `defaultStyle`.

<br><br>

## The `menuStyle` prop

It allows you to style both the container and the rows. Gives the general style of the menu.

```jsx title="structure"
menuStyle: {
  container: React.CSSProperties;
  row: {
    normal: React.CSSProperties;
    hover: React.CSSProperties;
  }
}
```

```jsx title="example"
<ContextMenu
  menuStyle={{
    container: { borderRadius: 0 },
    row: {
      normal: { color: "red" },
    },
  }}
  items={items}
>
  <ChildComponent />
</ContextMenu>
```

![RCMexC1](https://user-images.githubusercontent.com/52223453/223094912-5cae7b53-ca91-4a71-aa06-cf8561817870.gif)

<br><br>

## The `style` && `hoverStyle` on items

Sometimes you will want to change directly how a single option looks and feels on hover. Just add this two props to the desired item.

```javascript
{
    label: "Open in a new tab",
    onClick: () => window.open("https://reactjs.org", "_blank"),
    style: {backgroundColor: 'red', color: 'white'},
    hoverStyle: {backgroundColor: 'darkred'}
},
```

![RCMexC2](https://user-images.githubusercontent.com/52223453/223096937-664e4f6d-42b2-44c7-a875-44e3abce5f89.gif)

<br><br>

## The `adaptive` prop

You will probably never touch this property, but I'll cover it anyway. Essentially it decides wether the context menu you open is fixed on the page or stays on target when you resize the window. It defaults to `true`, meaning that it will always point to the place you opened it on. If, for some reason, you want the menu not to move when you change the size of the window just set it to false.

<br><br>

# Component variants

For the laziest devs that only need a quick context menu, I packed a couple of default variants inside the component.
To control variants you have the `variant` prop that accepts an object with three possible properties.

| prop        | values                             | description                                                                                                                                                                                                     |
| ----------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `opacity`   | `"transparent"` **_or_** `"solid"` | The `variant` prop changes the opacity of the component. By default it's set to `transparent`, which allows to barely see the content underneath the menu. Otherwise you can use solid, which has full opacity. |
| `theme`     | `"light"` **_or_** `"dark"`        | The `theme` prop changes the color of the menu. By default it's set to `light`. It's suggested to tweak the colors of the menu to reflect the ones on your app, or vice versa.                                  |
| `elevation` | `"raised"` **_or_** `"flat"`       | The `elevation` prop enables or disables the box-shadow of the menu. By default it's set to `raised`.                                                                                                           |

## Default color values

The default colors for both themes are:

```css
.light {
  background-color: rgb(240, 240, 240);
  color: rgb(50, 50, 50);
}

.dark {
  background-color: rgb(50, 50, 50);
  color: rgb(240, 240, 240);
}
```

<br><br>

# Animations

I also packed a couple of animations inside the component. They are accessible through the `animated` prop.

### The `animated` prop

This prop accepts either a boolean value or an object with the following structure

```javascript
{
	animation?: "zoom" | "fade" | "slideLeft" | "slideRight" | "slideDown" | "slideUp"
	duration?: React.CSSProperties['animationDuration'] //Es. "2s", "200ms", "0.2s", ...
}
```

The default `animated` value is true, which in turn defaults to

```javascript
{
	animation: "zoom",
	duration: "0.2s"
}
```

### Example

```javascript
const animation = {
  animation: "fade",
  duration: "1s",
};
return (
  <ContextMenu items={items} animated={animation}>
    <ChildComponent />
  </ContextMenu>
);
```

will result in

![RCMAnEx](https://user-images.githubusercontent.com/52223453/224271861-fcd7247f-5d3d-4372-81b7-3392e45980c3.gif)

## Planned features

- Nested menus
- Dynamic positioning
- Child specific items
- Feel free to make suggestions
