import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";
import "./Overview.css";

class Overview extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADED",
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedDishes: modelInstance.getFullMenu(),
      totPrice: modelInstance.getTotalMenuPrice(),

    };
  }


  render() {
    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        dishesList = this.state.selectedDishes.map(dish => (
          <div className='col-lg-2 col-xs-12 col-sm-12 text-center' key={dish.id}>
            <img src={`${dish.image}`} alt='Food' height="200" width="200"/>
            <p>{dish.title}</p>
            {(dish.pricePerServing*this.state.numberOfGuests).toString()} SEK
          </div>
        ));
      break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Overview">
        <div className="container-fluid">
          <div className="row" id="overviewTop">
            <div className="col-lg-9 col-xs-12 col-sm-12">
              <h1> My dinner: {this.state.numberOfGuests} people</h1>
            </div>
            <div className="col-lg-3 col-xs-12 col-sm-12 justify-content-center">
              <Link to="/search">
                <button type="button" className="btn btn-warning" id="overviewBack">
                  Go Back and Edit Dinner
                </button>
              </Link>
            </div>
          </div>
        {/* We pass the model as property to the Sidebar component */}
          <div className='row justify-content-center' id='dishItemView'>{dishesList}</div>
          <div className='text-center text-danger' id='totPrice'>TOTAL: {(this.state.totPrice).toString()} SEK</div>
          <div className="container-fluid border-top border-dark">
            <div className="row justify-content-center">
              <Link to="/printout">
                <button type="button" className="btn btn-warning" id="printButton">
                  Print Full Recipe
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    );

  }
}

export default Overview;
