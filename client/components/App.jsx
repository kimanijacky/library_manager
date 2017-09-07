import React, { Component } from 'react';
import request from 'superagent'

const style = {
  width: '700px',
  margin: '20px 50px',
  padding: '20px',
  backgroundColor: 'lightblue',
  fontSize: '20px',
  border: '1px solid black',
  borderRadius: '20px'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      name: '',
      description: ''
    }
  }

  componentWillMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    request
      .get('http://localhost:3000/books')
      .then((res) => {
        this.setState({
          books: res.body
        })
      });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.books.map((book, key) => {
            return (
              <div key={book._id} style={{display: 'flex', justifyContent: 'center'}}>
                <p style={style}>{book.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
