import Hidden from "./lib/hidden"

const Button = (props: any) => {
  return (
    <button>Presiona si eres: {props.children}</button>
  )
}

function App() {
  return (
    <div>
      <section>
        <Hidden media={["sm", "lg"]}>
          <p>Hola soy</p>
        </Hidden>
        <Hidden component={Button} media={"md"}>
          Skywalker
        </Hidden>
      </section>
    </div>
  )
}

export default App