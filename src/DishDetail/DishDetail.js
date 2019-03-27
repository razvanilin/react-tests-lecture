import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DishInformation from "../DishInformation/DishInformation";
import "./DishDetail.css";


class DishDetail extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="DishDetail">
        <div className="container-fluid row">
        {/* We pass the model as property to the Sidebar component */}

          <div className="col-lg-3 col-xs-12 col-sm-12">
            <Sidebar model={this.props.model} />
          </div>
          <div className="col-lg-9 col-xs-12 col-sm-12">
            <DishInformation model={this.props.model} dishId={this.props.info.match.params.dishId}/>
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
