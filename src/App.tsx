import { Hidden, MediaProvider } from "./lib"

function App() {
  return (
    <section>
      <MediaProvider>

        {/* Both can be read in sx and xl */}
        <p>
          <Hidden media={["sm", "lg"]}>
            {' Hola soy '}
          </Hidden>
          <Hidden media={"md"}>
            {' Skywalker '}
          </Hidden>
        </p>
        
      </MediaProvider>
    </section>
  )
}

export default App