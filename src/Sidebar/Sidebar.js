import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu()
    };
    this.removeFromMenu = this.removeFromMenu.bind(this);
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  removeFromMenu(id){
    this.props.model.removeDishFromMenu(id);
    this.setState({
      menu: this.props.model.getFullMenu()
    })
  }

  render() {
    let menuList = null;
    let buttonList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    if(this.state.menu.length !== 0){
      menuList = this.state.menu.map(dish => (
        <div className='row' key={dish.id}>
          <button type='button' className='btn btn-light btn-sm' id='removeButton' onClick={() => {this.removeFromMenu(dish.id)}}>-</button>
          <div className='col'>{dish.title}</div>
          <div className='col text-right text-danger'>SEK {dish.pricePerServing*this.state.numberOfGuests.toString()}</div>
        </div>
      ));
      buttonList = (
        <div className="container-fluid">
          <div className='row text-danger text-right container-fluid'>
    				SEK {modelInstance.getTotalMenuPrice().toString()}
          </div>
          <div className='text-center' id='confirmButton'>
            <Link to="/overview">
              <button type='button' className='btn btn-lg btn-warning' id='confirmDinnerButton'>Confirm Dinner</button>
            </Link>
          </div>
        </div>
      );
    }
    else {
      menuList = (
        <div className='row text-right text-danger container-fluid'>SEK 0.00</div>
      );
      buttonList = (
        <div className='text-center' id='confirmButton'>
          <Link to="/overview">
            <button type='button' className='btn btn-lg btn-warning' disabled>Confirm Dinner</button>
          </Link>
        </div>
      );
    }

    return (
      <div className="Sidebar">
        <div className="row">
          <div className="col">
            <h3>My Dinner</h3>
          </div>
          <nav className="navbar navbar-light d-block d-sm-none">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapseMenu" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
        </div>
        <div className="collapse-xs show" id="collapseMenu">
          <p>
            People:
            <input
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.onNumberOfGuestsChanged}
            />
            <br />
            Total number of guests: {this.state.numberOfGuests}
          </p>
          <div className="row p-3 mb-2 bg-secondary" id="dishNameCost">
            <div className="col">
              Dish name
            </div>
            <div className="col text-right">
              Cost
            </div>
          </div>
        </div>
        {menuList}
        {buttonList}
      </div>
    );
  }
}

export default Sidebar;
