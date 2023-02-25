import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import samplefishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  // set initial state - load component with empty state
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }
  // lifecycle events

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  
  addFish = (fish) => {
    // updating state in react
    // 1. Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // 2.  Add new fish to copy
    fishes[`fish${Date.now()}`] = fish;
    //3. set new fishes object to state
    this.setState({
      // fishes: fishes
      fishes
    });
  }

  updateFish = (key, updatedFish) => {
    // 1. take copy of current state
    const fishes = {...this.state.fishes};
    // 2. update that state
    fishes[key] = updatedFish
    // 3. Set to state
    this.setState({fishes});
  }
  
  deleteFish = key => {
    // 1. copy of state
    const fishes = {...this.state.fishes}
    // 2. update the state
    fishes[key] = null;
    // 3. set state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({fishes: samplefishes});
  };

  addToOrder = (key) => {
    // 1. take copy of state
    const order = {...this.state.order}
    // 2. add or update order
    order[key]= order[key] + 1 || 1;
    // 3 call setstate to update
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    //1. make copy of state
    const order = { ...this.state.order}
    //2. remove item from order
    delete order[key];
    //4. call setState to update
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
                key={key}
                index={key}
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder}
              />
          ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App;