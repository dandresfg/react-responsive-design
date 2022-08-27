# react-responsive-design
This library saves your time when you deal with responsive design, we know you have to hidde components in desktop or mobile, and that might be difficult when you have to mix a lot of classnames in the same component, and it makes your code less reusable, that's why you have to use react-responsive-design. It's made to separate your hidden logic from your components.


# Installation
```javascript
npm install react-native-design
```
**requirements:** This library is made for React projects, you can use any library after v16, we use hooks to calculate the breakpoints.



# Basic Usage
```jsx
const App = () => {
  return (
    <MediaProvider>
      <header>Hello, we made responsive-design</header>
      <main>
        <Hidden media="md">{"You won't see me on md"}</Hidden>
        <Show media="md">{"You will only see me on md"}</Show>
        <Button>Click me</Button>
      </main>
    </MediaProvider>
  )
}
```

## Set up
To work properly, we use a hook to comunicate all the components, set breakpoints and get the actual breakpoint. You have to put this code at the top level of your application, like your ***index.js*** or your ***app.js***
```jsx
  <MediaProvider>
      {...here goes your application}
  </MediaProvider>
```

## Multiple media breakpoints
```jsx
const Header = () => {
  return (
    <header>
        <Hidden media={["sm", "xs"]}>{"This is a big title, you won't see me on sm or sx"}</Hidden>
    </header>
  )
}
```

## Custom Hook
```jsx
const Button = () => {
  const breakpoint = useBreakpoint();
  if(breakpoint === "sm") return <SmallButton />
  return (
    <button style={{ width: 500 }}>
      I'm a big button.
    </button>
  )
}
```

## Change log
We are working to provide more customization to the components. This is the first version of the package, we gonna add other features like a Media component to indicate the initial and last range, even a replace component to show when the widgth triggers the breakpoint target.
