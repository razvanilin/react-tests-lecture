import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";
import "./DishInformation.css";

class DishInformation extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      numberOfGuests: this.props.model.getNumberOfGuests(),
      dish: {}
    };
    this.changeMenu = this.changeMenu.bind(this);
  }

  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  componentDidMount() {
    this.props.model.addObserver(this);
    modelInstance
      .getDish(this.props.dishId)
      .then(dish => {
        this.setState({
          status: "LOADED",
          dish: dish,
          allIngredients: dish.extendedIngredients
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  changeMenu(){
    modelInstance.addDishToMenu(this.state.dish);
  }

  render() {
    let ingredientList = null;

    switch (this.state.status) {
      case "LOADING":
        ingredientList = <em>Loading...</em>;
        break;
      case "LOADED":
        ingredientList = this.state.allIngredients.map(ingredient => (
          <div className="row" key={ingredient.name}>
            <div className="col-3 justify-content-center">
              {(ingredient.amount*this.state.numberOfGuests).toFixed(2)} {ingredient.unit}
            </div>
            <div className="col-4">{ingredient.name}</div>
            <div className="col-2">SEK</div>
            <div className='col-3'>{5*this.state.numberOfGuests.toString()}</div>
          </div>
        ));
      break;
      default:
        ingredientList = <b>Failed to load data, please try again</b>;
        break;
    }


    return (
      <div className="row">
        <div className="col-lg-5 col-xs-12 col-sm-12">
          <div className="container-fluid">
            <div className='row'>
              <h3>{this.state.dish.title}</h3>
            </div>
            <div className='row'>
              <img src={`${this.state.dish.image}`} id="foodPic" alt={this.state.dish.title}/>
            </div>
            <div className='row'>
              <p>{this.state.dish.instructions}</p>
            </div>
            <div className="row">
              <Link to="/search">
                <button type="button" className="btn btn-danger" id="detailBackButton">Back to search</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-xs-12 col-sm-12">
          <div className="container-fluid p-3 mb-2 bg-warning">
            <div className="row">INGREDIENTS FOR {this.state.numberOfGuests} PEOPLE</div>
              {ingredientList}
              <div className='row'>
                <div className='col-7'>
                  <button type='button' className='btn btn-danger' id='addToMenuButton' onClick={this.changeMenu}>Add to menu</button>
                </div>
                <div className='col-2'>SEK</div>
                <div className='col-3'>{(this.state.dish.pricePerServing*this.state.numberOfGuests).toFixed(2).toString()}</div>
              </div>
          </div>
        </div>
      </div>

    );

  }
}

export default DishInformation;
