import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Hidden from "../lib/hidden";
import resizeToDefinition from "../utils/test/resizeToDefinition";
import { MediaProvider } from "../lib";

// Breakpoints:
//              "xs": 0,
//              "sm": 600,
//              "md": 900,
//              "lg": 1200,
//              "xl": 1536,
//              "2xl": false
describe("Hidden Component", () => {
  afterEach(cleanup);

  beforeAll(() => {
    window.resizeTo = resizeToDefinition;
  });

  it("Should render", () => {
    render(
      <MediaProvider>
        <Hidden media="sm">
          <p>Hello From Hidden</p>
        </Hidden>
      </MediaProvider>
    );
    expect(
      screen.getByText("Hello From Hidden"),
      "Hidden should render"
    ).toBeTruthy();
  }),
    it("Shouldn't work as expected without context", () => {
      const hiddenComponent = render(
        <div role="parent">
          <Hidden media="md">
            {" "}
            <p>Hello From Hidden</p>
          </Hidden>
        </div>
      );
      const parentComponent = hiddenComponent.getByRole("parent");
      //Resize event
      window.resizeTo(950, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden should render on the breakpoint anyways"
      ).length(1);
    }),
    it("Shouldn't render on 'xs' media query", () => {
      const hiddenComponent = render(
        <MediaProvider>
          <div role="parent">
            <Hidden media="xs">
              <p>Hello From Hidden out of Extra Small Query</p>
            </Hidden>
          </div>
        </MediaProvider>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Extra Small Query"),
        "Hidden should render on all breakpoints except Small"
      ).toBeTruthy();

      //Resize event
      window.resizeTo(500, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Small Breakpoint"
      ).length(0);
    }),
    it("Shouldn't render on 'sm' media query", () => {
      const hiddenComponent = render(
        <MediaProvider>
          <div role="parent">
            <Hidden media="sm">
              <p>Hello From Hidden out of Small Query</p>
            </Hidden>
          </div>
        </MediaProvider>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Small Query"),
        "Hidden should render on all breakpoints except Small"
      ).toBeTruthy();

      //Resize event
      window.resizeTo(650, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Small Breakpoint"
      ).length(0);
    }),
    it("Shouldn't render on 'md' media query", () => {
      const hiddenComponent = render(
        <div role="parent">
          <MediaProvider>
            <Hidden media="md">
              <p>Hello From Hidden out of Medium Query</p>
            </Hidden>
          </MediaProvider>
        </div>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Medium Query"),
        "Hidden should render on all breakpoints except Medium"
      ).toBeTruthy();

      //Resize event
      window.resizeTo(950, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Medium Breakpoint"
      ).length(0);
    }),
    it("Shouldn't render on 'lg' media query", () => {
      const hiddenComponent = render(
        <div role="parent">
          <MediaProvider>
            <Hidden media="lg">
              <p>Hello From Hidden out of Large Query</p>
            </Hidden>
          </MediaProvider>
        </div>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Large Query"),
        "Hidden should render on all breakpoints except Large"
      ).toBeTruthy();

      //Resize event
      window.resizeTo(1400, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Large Breakpoint"
      ).length(0);
    }),
    it("Shouldn't render on 'xl' media query", () => {
      const hiddenComponent = render(
        <div role="parent">
          <MediaProvider>
            <Hidden media="xl">
              <p>Hello From Hidden out of Extra Large Query</p>
            </Hidden>
          </MediaProvider>
        </div>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Extra Large Query"),
        "Hidden should render on all breakpoints except Extra Large"
      ).toBeTruthy();

      //Resize event
      window.resizeTo(1600, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Extra Large Breakpoints"
      ).length(0);
    }),
    it("Shouldn't render on 'sm' and 'lg'", () => {
      //This is tricky because sm is from 0 to 600 and lg is 992 to 1200
      const hiddenComponent = render(
        <div role="parent">
          <MediaProvider>
            <Hidden media={["sm", "lg"]}>
              <p>Hello From Hidden out of Small and Large</p>
            </Hidden>
          </MediaProvider>
        </div>
      );
      const parentComponent = hiddenComponent.getByRole("parent");

      //More than large so we know that it will render
      expect(window.innerWidth).toBeGreaterThan(1200);

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Small and Large"),
        "Hidden should render on all breakpoints greater than Large"
      ).toBeTruthy();

      //Resize event to small breakpoint
      window.resizeTo(700, 500);
      fireEvent(window, new Event("resize"));

      //Greater than small so we know that it will not render
      expect(window.innerWidth).toBeGreaterThan(600);

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Small Breakpoint"
      ).length(0);

      //Resize event to the breakpoint range
      window.resizeTo(950, 500);
      fireEvent(window, new Event("resize"));

      //Greater than medium but less than large so we know that it will render
      expect(window.innerWidth).toBeGreaterThan(900);
      expect(window.innerWidth).toBeLessThan(1200);

      expect(
        screen.getByText("Hello From Hidden out of Small and Large"),
        "Hidden should render on all breakpoints between 600px and 992px"
      ).toBeTruthy();
    });
});
