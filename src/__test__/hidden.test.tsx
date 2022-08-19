import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Hidden from "../lib/hidden";
import matchMediaDefinition from "../utils/test/matchMediaDefinition";
import resizeToDefinition from "../utils/test/resizeToDefinition";

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
    it("Shouldn't render on sm media query", () => {
      const hiddenComponent = render(
        <div role="parent">
          <Hidden media="sm">
            <p>Hello From Hidden</p>
          </Hidden>
        </div>
      );

      const parentComponent = hiddenComponent.getByRole("parent");

      expect(
        hiddenComponent.getByText("Hello From Hidden"),
        "Hidden should render"
      ).toBeTruthy();

      //Resize event
      window.resizeTo = resizeToDefinition;
      window.resizeTo(500, 500);
      fireEvent(window, new Event("resize"));

      expect(
        parentComponent.getElementsByTagName("p"),
        "Hidden shouldn't render"
      ).length(0);
    });
});
