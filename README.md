
# react-context-menu 
React context menu is a simple library to implement custom context menus in your react application. This package is still in development, feel free to report bugs, ask question and make suggestions.

## Installation
### npm
`npm i @ni7r0g3n/react-context-menu`
### yarn 
`yarn add @ni7r0g3n/react-context-menu`

## Base Use
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ContextMenu items={items}>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </ContextMenu>
      </header>
    </div>
  );
```
![RCMex1](https://user-images.githubusercontent.com/52223453/223091888-145a60db-e502-4dca-a577-5f2147b739b9.gif)


## Customisation
It's possible to choose a style both for the container and the rows through `menuStyle` prop. You can also customise directly a single row with the `style` and `hoverStyle` properties in the desired item. Styles are applied in this order:
- style and hoverStyle
- menuStyle
- defaultStyle

meaning `style` and `hoverStyle` override `menuStyle` that overrides `defaultStyle`. 

#### `menuStyle` prop
It allows you to style both the container and the rows. Gives the general style of the menu.
```javascript
<ContextMenu menuStyle={{
                 container: {borderRadius: 0},
                 row: {color: 'red'}
             }} 
             items={items}
>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
          Learn React
      </a>
</ContextMenu>
```
![RCMexC1](https://user-images.githubusercontent.com/52223453/223094912-5cae7b53-ca91-4a71-aa06-cf8561817870.gif)

#### `style` && `hoverStyle` on items
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

### The `adaptive` prop
You will probably never touch this property, but I'll cover it anyway. Essentially it decides wether the context menu you open is fixed on the page or stays on target when you resize the window. It defaults to `true`, meaning that it will always point to the place you opened it on. If, for some reason, you want the menu not to move when you change the size of the window just set it to false.

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
	duration: "1s"
}
return (
	<ContextMenu items={items} animated={animation}>
		<ChildComponent>
	</ContextMenu>
)
```

will result in

![RCMAnEx](https://user-images.githubusercontent.com/52223453/224271861-fcd7247f-5d3d-4372-81b7-3392e45980c3.gif)


## Planned features
- ~~ Animation support ~~
- Nested menus
- Better styling (?)
- ... I'll have to think about more
- Feel free to make suggestions
