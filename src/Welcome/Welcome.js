import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <div className="row">
          <div className="col"></div>
          <div className="col-5 text-center">
            <div className="welcomeText">
            Lorem ipsum dolor sit amet, an mei impetus dissentiunt. Reque mundi no eos, sea lorem eripuit pericula ad, mel aperiam voluptatum in. Mei suas verear instructior ea. Eu has incorrupte instructior.
            </div>
            <div className="welcomeButton">
              <Link to="/search">
                <button type="button" className="btn btn-warning">Create new dinner</button>
              </Link>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default Welcome;
