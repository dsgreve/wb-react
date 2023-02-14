import React from "react";
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
  // lifecycle events

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
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
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory 
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    )
  }
}

export default App;