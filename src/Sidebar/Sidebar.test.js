import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "./Sidebar";
import dinnerModel from "../data/DinnerModel";

it("The Sidebar component renders correctly", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Sidebar model={dinnerModel} />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
