import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";
import DishDetail from "./DishDetail/DishDetail";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <div className="container-fluid" id="headerView">
              <div className="row p-3 mb-2 bg-secondary justify-content-center">
                <h1 className="App-title">{this.state.title}</h1>
              </div>
            </div>
            {/* We rended diffrent component based on the path */}
            <Route exact path="/" component={Welcome} />
            <Route
              path="/search"
              render={() => <SelectDish model={modelInstance} />}
            />
            <Route
              path="/dishDetail/:dishId"
              render={(props) => <DishDetail model={modelInstance} info={props}/>}
            />
            <Route
              path="/overview"
              render={() => <Overview model={modelInstance} />}
            />
            <Route
              path="/printout"
              render={() => <Printout model={modelInstance} />}
            />
          </header>
        </Router>
      </div>
    );
  }
}

export default App;
