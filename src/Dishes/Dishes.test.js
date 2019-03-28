import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";

import Dishes from "./Dishes";
import dinnerModel from "../data/DinnerModel";

it("renders the Dishes correctly", () => {
  const tree = shallow(
    <MemoryRouter>
      <Dishes />
    </MemoryRouter>
  );

  expect(tree.find(Dishes)).toMatchSnapshot();
  tree.unmount();
});

it("checks the onChange filter function and state changes", () => {
  const DishesComponent = shallow(
    <MemoryRouter>
      <Dishes />
    </MemoryRouter>
  );

  const filterInput = DishesComponent.find(Dishes).dive().find("input");

  filterInput.simulate("change", { target: { value: "vanilla" } });
  setTimeout(() => {
    expect(DishesComponent.state().filter).toBe("vanilla");
    DishesComponent.unmount();
  });
});
