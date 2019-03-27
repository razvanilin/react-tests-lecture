import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";

import Dishes from "./Dishes";
import dinnerModel from "../data/DinnerModel";

it("renders the Dishes correctly", async () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Dishes />
      </MemoryRouter>
    )
    .toJSON();

  try {
    await expect(tree).toMatchSnapshot();
  } catch (e) {
    throw new Error(e);
  }
});

it("checks the onChange filter function and state changes", () => {
  const DishesComponent = mount(
    <MemoryRouter>
      <Dishes />
    </MemoryRouter>
  );
  const filterInput = DishesComponent.find("input");

  filterInput.simulate("change", { target: { value: "vanilla" } });
  setTimeout(() => {
    expect(DishesComponent.state().filter).toBe("vanilla");
  });
});

it("checks the onChange filter function and state changes", () => {
  const onChange = jest.fn();
  const props = { onChange };
  const DishesComponent = mount(
    <MemoryRouter>
      <Dishes />
    </MemoryRouter>
  );
  const filterInput = DishesComponent.find("input");

  filterInput.simulate("change", { target: { value: "vanilla" } });
  setTimeout(() => {
    expect(DishesComponent.state().filter).toBe("vanilla");
  });
});
