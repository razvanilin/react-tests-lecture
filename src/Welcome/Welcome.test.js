import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import Welcome from "./Welcome";

it("The Welcome component renders correctly", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
