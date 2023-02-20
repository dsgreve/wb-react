import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

// every component is its own class, and needs render in it
class StorePicker extends React.Component {
  myInput = React.createRef();
  
  static propTypes ={
    history: PropTypes.object
  }

  goToStore = (event) => {
    // stop form from submitting
    event.preventDefault();
    // get text from input
    const storeName = this.myInput.current.value;
    // ref allows us to reference a dom node on page
    // change page to /store/whatever-they-enter
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
   return (
    <React.Fragment>
    <h2>Fish</h2>
      <form className="store-selector" onSubmit={this.goToStore}>
        { /** Comment in reactusing block element */  }
        <h2>Please Enter A Store</h2>

        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    </React.Fragment>
    
   )
  }
}

export default StorePicker;