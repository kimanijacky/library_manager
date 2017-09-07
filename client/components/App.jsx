import React, { Component } from 'react';
import request from 'superagent';
import Select from 'react-select';

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
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(event) {
    event.preventDefault();
    request
      .post('http://localhost:3000/books')
      .send({
        name: this.state.name
      })
      .then(() => {
        this.fetchBooks();
      })
  }

  render() {
    return (
      <div>
        {/* Enable a user to add a book */}
        <div style={{padding: '50px'}} className='form-group'>
          <form onSubmit={this.onSubmit}>
            <div style={{flexDirection: 'column'}}>
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter the name of the book"
                onChange={(event) => {
                  this.setState({
                    name: event.target.value
                  })
                }}
              />
            </div>

            <input type="submit" value="SUBMIT" style={{marginTop: '20px'}} className="btn btn-info"/>
          </form>
        </div>

        {/* Displays all books on the list */}
        <div>
          {this.state.books.map((book, key) => {
            return (
              <div key={book._id} style={{display: 'flex', justifyContent: 'flex-start'}}>
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
