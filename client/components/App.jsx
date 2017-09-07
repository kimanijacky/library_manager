import React, { Component } from 'react';
import request from 'superagent';
import Select from 'react-select';

const style = {
  display: 'flex',
  justifyContent: 'flex-start',
  backgroundColor: 'lightblue',
  borderRadius: '20px',
  border: '1px solid black',
  margin: '20px 50px',
  padding: '20px',
  height: '50px',
  alignItems: 'center'
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

  onDelete(id) {
      request
        .delete(`http://localhost:3000/books/${id}`)
        .then((res, err) => {
          err ? console.log(err) : console.log('Deleted')
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
              <div key={book._id} style={style}>
                <p style={{fontSize: '20px', margin: '0'}}>{book.name}</p>
                <a
                  target="_blank"
                  className="btn btn-primary"
                  style={{position: 'absolute', right: '15%'}}
                  href={`https://twitter.com/intent/tweet?text=I%20just%20borrowed%20${book.name}`}
                >
                  Tweet
                </a>
                <input
                  type="button"
                  style={{position: 'absolute', right: '8%'}}
                  className="btn btn-danger"
                  value="Delete"
                  onClick={() => {
                    this.onDelete(book._id)
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
