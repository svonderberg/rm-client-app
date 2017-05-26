import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';
import '../src/App.css';
import 'whatwg-fetch';

const ENDPOINT = "https://rm-search.herokuapp.com/";

const ArtObject = ({index, id, title, pageURL, imageURL}) => 
  <li>
    <a href={pageURL} target="_blank" rel="noopener noreferrer" style={{backgroundImage: `url(${imageURL})`, animationDuration: (1.25 + (index / 2)) + 's'}}>
      <h1>{title}</h1>
    </a>
  </li>;

class App extends Component {
  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);

    this.state = {
      searchTerm: 'vermeer',
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

    fetch(`${ENDPOINT}${that.state.searchTerm}`)
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
              (artObject, i) => <ArtObject index={i} key={i} {...artObject} />
            )}
          </ul>}

        <div className="search-input-container">
          <DebounceInput
            placeholder="Vermeer"
            minLength={2}
            debounceTimeout={700}
            onChange={this.doSearch}
          />

          <div>
            <p>Search the entire collection of the <a href="https://www.rijksmuseum.nl/en/">Rijksmuseum in Amsterdam</a>.</p>
            <p>Developed using the <a href="https://rijksmuseum.github.io/">Rijksmuseum API.</a></p> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
