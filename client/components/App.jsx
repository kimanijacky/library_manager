import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  render() {
    return (
      <div>
        My books
      </div>
    )
  }
}

export default App;
