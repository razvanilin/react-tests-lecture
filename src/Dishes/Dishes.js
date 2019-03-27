import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";
import "./Dishes.css";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      filter: "",
      type: "All"
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.changeType = this.changeType.bind(this);
    //this.searchUpdate = this.searchUpdate.bind(this);
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  async componentDidMount() {
    await this.searchUpdate();
  }

  changeFilter(filterInput){
    this.setState({
      filter: filterInput.target.value
    })
  }

  changeType(typeInput){
    this.setState({
      type: typeInput.target.value
    })
  }

  searchUpdate = () => {
    modelInstance
      .getAllDishes(this.state.type, this.state.filter)
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let dishesList = null;
    const { filter } = this.state;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        dishesList = this.state.dishes.map(dish => (
            <div className="col-lg-3 col-xs-12 col-sm-12 text-center" key={dish.id}>
              <Link to={"/dishDetail/"+dish.id}>
                <img src={`http://spoonacular.com/recipeImages/${dish.image}`} alt='Food' height="200" width="200"/>
              </Link>
              <p>{dish.title}</p>
            </div>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes">
        <h3>FIND A DISH</h3>
        <div className="row" id="searchBar">
            <input id="searchText" type="text" placeholder="Enter keyword..." value={filter} onChange={this.changeFilter}/>
            <select id="searchType" onChange={this.changeType}>
              <option value="All">All</option>
              <option value="main course">Main Course</option>
              <option value="side dish">Side Dish</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
              <option value="salad">Salad</option>
              <option value="bread">Bread</option>
              <option value="soup">Soup</option>
              <option value="beverage">Beverage</option>
              <option value="sauce">Sauce</option>
              <option value="drink">Drink</option>
              <option value="breakfast">Breakfast</option>
            </select>
          <div id="searchBarButton">
            <button type="button" className="btn btn-warning" id="searchButton" onClick={this.searchUpdate}>Search</button>
          </div>
        </div>
        <div className="row">{dishesList}</div>
      </div>
    );
  }
}

export default Dishes;
