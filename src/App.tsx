import { Hidden, MediaProvider } from "./lib";

function App() {
  return (
    <section>
      <MediaProvider>
        {/* Both can be read in xs and xl */}
        <p>
          <Hidden media={["xs"]}>{" im out of xs"}</Hidden>
          <Hidden media={["sm", "lg"]}>{" im out of sm or lg"}</Hidden>
          <Hidden media={"md"}>{" im out of md "}</Hidden>
        </p>
      </MediaProvider>
    </section>
  );
}

export default App;
