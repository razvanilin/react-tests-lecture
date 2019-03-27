import ObservableModel from "./ObservableModel";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/8";
const httpOptions = {
  headers: { "X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767" }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 1;
    this.getNumberOfGuests();
    this._menu = [];

    if(localStorage.getItem("menu")){
      this._menu = JSON.parse(localStorage.getItem("menu"));
    }
  }

  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  setNumberOfGuests(num) {
    if (num < 1){
      this._numberOfGuests = 1;
      localStorage.setItem("numberOfGuests", this._numberOfGuests);
    }
    else{
      this._numberOfGuests = num;
      localStorage.setItem("numberOfGuests", this._numberOfGuests);
    }
    this.notifyObservers();
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */


  getAllDishes(type, filter) {
    if (type == null){
      type = "";
    }
    if (filter == null){
      filter = "";
    }
    const url = `${BASE_URL}/recipes/search?type=${type}&query=${filter}`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  getDish(id) {
    return fetch(`${BASE_URL}/recipes/${id}/information`, httpOptions).then(this.processResponse);
  }

  removeDishFromMenu(id) {
      this._menu = this._menu.filter(dish => dish.id !== id);
      localStorage.setItem("menu", JSON.stringify(this._menu));
      this.notifyObservers("removeDish");
    }



  addDishToMenu(dish) {
    this._menu.push(dish);
    localStorage.setItem("menu", JSON.stringify(this._menu));
    this.notifyObservers("addDish");
    //localStorage.setItem("menu", this._menu);
  }

  getFullMenu() {
    return this._menu;
	}

  getTotalMenuPrice() {
    var totPrice = 0;
    for (var dish of this._menu){
      totPrice += dish.pricePerServing*this._numberOfGuests;
    }
    return totPrice.toFixed(2);
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
