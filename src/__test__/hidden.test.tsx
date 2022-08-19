import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Hidden from "../lib/hidden";
import matchMediaDefinition from "../utils/test/matchMediaDefinition";
import resizeToDefinition from "../utils/test/resizeToDefinition";

// Breakpoints:
//              xs: 0,
//              sm: 600,
//              md: 992,
//              lg: 1200,
//              xl: 1536

describe("Hidden Component", () => {
  afterEach(cleanup);

  beforeAll(() => {
    matchMediaDefinition();
  });

  it("Should render", () => {
    render(
      <Hidden media="sm">
        <p>Hello From Hidden</p>
      </Hidden>
    );
    expect(
      screen.getByText("Hello From Hidden"),
      "Hidden should render"
    ).toBeTruthy();
  }),
    it("Shouldn't render without a children", () => {
      const hiddenComponent = render(
        <div role="parent">
          <Hidden media="sm"></Hidden>
        </div>
      );
      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        parentComponent.getElementsByTagName("div"),
        "Hidden shouldn't render"
      ).length(0);
    }),
    it("Shouldn't render on 'sm' media query", () => {
      const hiddenComponent = render(
        <div role="parent">
          <Hidden media="sm">
            <p>Hello From Hidden out of Small Query</p>
          </Hidden>
        </div>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Small Query"),
        "Hidden should render on all breakpoints except Small"
      ).toBeTruthy();

      //Resize event
      window.resizeTo = resizeToDefinition;
      window.resizeTo(500, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Small Breakpoint"
      ).length(0);
    }),
    it("Shouldn't render on 'md' media query", () => {
      const hiddenComponent = render(
        <div role="parent">
          <Hidden media="md">
            <p>Hello From Hidden out of Medium Query</p>
          </Hidden>
        </div>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Medium Query"),
        "Hidden should render on all breakpoints except Medium"
      ).toBeTruthy();

      //Resize event
      window.resizeTo = resizeToDefinition;
      window.resizeTo(800, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Medium Breakpoint"
      ).length(0);
    }),
    it("Shouldn't render on 'lg' media query", () => {
      const hiddenComponent = render(
        <div role="parent">
          <Hidden media="lg">
            <p>Hello From Hidden out of Large Query</p>
          </Hidden>
        </div>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Large Query"),
        "Hidden should render on all breakpoints except Large"
      ).toBeTruthy();

      //Resize event
      window.resizeTo = resizeToDefinition;
      window.resizeTo(1000, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Large Breakpoint"
      ).length(0);
    }),
    it("Shouldn't render on 'xl' media query", () => {
      const hiddenComponent = render(
        <div role="parent">
          <Hidden media="xl">
            <p>Hello From Hidden out of Extra Large Query</p>
          </Hidden>
        </div>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden out of Extra Large Query"),
        "Hidden should render on all breakpoints except Extra Large"
      ).toBeTruthy();

      //Resize event
      window.resizeTo = resizeToDefinition;
      window.resizeTo(1400, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render on Extra Large Breakpoints"
      ).length(0);
    });
});
