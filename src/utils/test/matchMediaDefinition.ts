import { vi } from "vitest";

const matchMediaDefinition = () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => {
      const values = query.match(/\d*(?=px)/g);
      return {
        matches:
          Number(values[0]) < window.innerWidth &&
          Number(values[2]) > window.innerWidth,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  });
};

export default matchMediaDefinition;
