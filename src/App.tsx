import { Hidden, MediaProvider } from "./lib";

function App() {
  return (
    <section>
      <Hidden media="xs">{" im out of context check console"}</Hidden>
      {/* Both can be read in xs and xl */}
      <MediaProvider
        breakpoints={{ xs: 0, sm: 200, md: 500, lg: 1000, xl: 1200 }}
      >
        <p>
          <Hidden media={["sm", "lg"]}>{" im out of sm or lg"}</Hidden>
          <Hidden media={"md"}>{" im out of md "}</Hidden>
        </p>
      </MediaProvider>
    </section>
  );
}

export default App;
