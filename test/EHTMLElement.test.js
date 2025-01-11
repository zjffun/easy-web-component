import { jest } from "@jest/globals";
import { EHTMLElement } from "../index.js";

describe("EHTMLElement", () => {
  let element;

  beforeAll(() => {
    window.customElements.define(
      "e-html-element",
      class extends EHTMLElement {
        render() {
          return [];
        }
      },
    );
  });

  beforeEach(() => {
    element = document.createElement("e-html-element");
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  test("should create an instance of EHTMLElement", () => {
    expect(element).toBeInstanceOf(EHTMLElement);
  });

  test("should render correctly", () => {
    element.render = jest.fn(() => [document.createElement("div")]);
    element.connectedCallback();
    expect(element.shadow.childNodes.length).toBe(1);
  });

  test("should handle attributes correctly", () => {
    element.attributesProps(["dataTest"]);
    element.setAttribute("dataTest", "value");
    expect(element.dataTest).toBe("value");
    element.dataTest = "new value";
    expect(element.getAttribute("dataTest")).toBe("new value");
    element.dataTest = "";
    expect(element.hasAttribute("dataTest")).toBe(false);
  });

  test("should handle events correctly", () => {
    const mockEventHandler = jest.fn();
    element.eventsProps(["click"]);
    element.onclick = mockEventHandler;

    const event = new Event("click");
    element.dispatchEvent(event);
    expect(mockEventHandler).toHaveBeenCalled();
  });
});
