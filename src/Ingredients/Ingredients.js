import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";
import "./Ingredients.css";


class Ingredients extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      activeDish: this.props.model.getActiveDish()
    };
    console.log(this.props.model.getActiveDish())
    this.changeMenu = this.changeMenu.bind(this);
  }

  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  changeMenu(){
    modelInstance.addDishToMenu();
  }

  render() {
    var allIngredients = this.state.activeDish.extendedIngredients;
    let ingredientList = null;

    ingredientList = allIngredients.map(ingredient => (
      <div className="row">
        <div className="col-3 justify-content-center">
          {ingredient.amount*this.state.numberOfGuests.toFixed(2).toString()} {ingredient.unit}
        </div>
        <div className="col-4">{ingredient.name}</div>
        <div className="col-2">SEK</div>
        <div class='col-3'>{5*this.state.numberOfGuests.toString()}</div>
      </div>
    ));

    return (
      <div className="DishInformation">
        <div className="container-fluid">
          <div className="row">INGREDIENTS FOR {this.state.numberOfGuests} PEOPLE</div>
            {ingredientList}
            <div class='row'>
              <div class='col-7'>
                <button type='button' class='btn btn-danger' id='addToMenuButton' onClick={this.changeMenu}>Add to menu</button>
              </div>
              <div class='col-2'>SEK</div>
              <div class='col-3'>{this.state.activeDish.pricePerServing*this.state.numberOfGuests.toString()}</div>
            </div>
        </div>
      </div>

    );

  }
}

export default Ingredients;
