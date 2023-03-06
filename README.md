# react-context-menu 
React context menu is a simple library to implement custom context menus in your react application.

## Installation
### npm
`npm i @ni7r0g3n/react-context-menu`
### yarn 
`yarn add @ni7r0g3n/react-context-menu`

## Use
The component is very easy to use.

Wrap the component to the area you want to use the context menu on and pass an array of options.
The "label" can be both a string or a component.
```javascript
import { ContextMenu } from '@Ni7r0g3n/react-context-menu';

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


### Customisation
There are a couple of ways to customise the component

#### `menuStyle`
