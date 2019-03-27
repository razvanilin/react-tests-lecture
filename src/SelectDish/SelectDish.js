import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";

class SelectDish extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="SelectDish">
        <div className="container-fluid row">
        {/* We pass the model as property to the Sidebar component */}

          <div className="col-lg-3 col-xs-12 col-sm-12">
            <Sidebar model={this.props.model} />
          </div>
          <div className="col-lg-9 col-xs-12 col-sm-12">
            <Dishes />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectDish;
