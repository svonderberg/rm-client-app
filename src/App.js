import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';
import '../src/App.css';

const ArtObject = ({id, title, pageURL, imageURL}) => 
  <li>
    <a href={pageURL} target="_blank" rel="noopener noreferrer" style={{backgroundImage: `url(${imageURL})`}}>
      <h1>{title}</h1>
    </a>
  </li>;

class App extends Component {
  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);

    this.state = {
      searchTerm: 'rembrandt',
      loading: true,
      artObjects: []
    };
  }

  componentDidMount() {
    this.doSearch();
  }

  doSearch(e) {
    let that = this;
    that.setState({
      loading: true,
      searchTerm: e ? e.target.value : ''
    });

    fetch(`http://localhost:3000/${that.state.searchTerm}`)
      .then(res => {
        res
          .json()
          .then(data => {
            that.setState({
              loading: false,
              artObjects: data.artObjects
            });
          });
      });
  }

  render() {
    return (
      <div>
        {(!this.state.loading && this.state.artObjects.length === 0) &&
          <div className="state-message">No results, please try another search.</div>}

        {this.state.loading && <div className="state-message">Loading...</div>}

        {this.state.loading || 
          <ul>
            {this.state.artObjects.map(
              (artObject, i) => <ArtObject key={i} {...artObject} />
            )}
          </ul>}

        <div className="search-input-container">
          <DebounceInput
            placeholder="Rembrandt van Rijn"
            minLength={2}
            debounceTimeout={300}
            onChange={this.doSearch}
          />

          <div>
            <p>Search the entire collection of the <a href="https://www.rijksmuseum.nl/en/">Rijksmuseum in Amsterdam</a>. Developed using the <a href="https://rijksmuseum.github.io/">Rijksmuseum API.</a></p> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
