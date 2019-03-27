import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";
import "./Printout.css";

class Printout extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADED",
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedDishes: modelInstance.getFullMenu(),
    };
  }

  render() {

    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    dishesList = this.state.selectedDishes.map(dish => (
      <div className="row" id="printoutDishes" key={dish.id}>
        <div className="col-lg col-sm-12 col-xs-12 text-center">
          <img src={`${dish.image}`} alt='Food' height="300" width="300"/>
        </div>
        <div className="col-lg col-sm-12 col-xs-12">
          <div className='row text-uppercase container-fluid'>{dish.title}</div>
          <div className='row container-fluid'>{dish.instructions}</div>
        </div>
        <div className='col-lg col-sm-12 col-xs-12'>
          <div className='row container-fluid'>PREPARATION</div>
          <div className='row container-fluid'>{dish.instructions}</div>
        </div>
      </div>
    ));


    return (
      <div className="Printout">
        <div className="container-fluid">
          <div className="row" id="printoutTop">
            <div className="col-lg-9 col-xs-12 col-sm-12">
              <h1> My dinner: {this.state.numberOfGuests} people</h1>
            </div>
            <div className="col-lg-3 col-xs-12 col-sm-12 justify-content-center">
              <Link to="/search">
                <button type="button" className="btn btn-warning" id="printoutBack">
                  Go Back and Edit Dinner
                </button>
              </Link>
            </div>
          </div>
          {dishesList}
        </div>
      </div>
    );

  }
}

export default Printout;
