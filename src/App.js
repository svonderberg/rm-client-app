import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';
import '../src/App.css';

const ArtObject = ({id, title, pageURL, imageURL}) => 
  <li>
    <a href={pageURL} target="_blank">
      <img alt={title} src={imageURL} />
      <h1>{title}</h1>
    </a>
  </li>;

class App extends Component {
  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);

    this.state = {
      searchTerm: '',
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
        <DebounceInput
          placeholder="Search"
          minLength={2}
          debounceTimeout={300}
          onChange={this.doSearch}
        />

        {this.state.loading && <div>Loading...</div>}

        {this.state.loading || 
          <ul>
            {this.state.artObjects.map(
              (artObject, i) => <ArtObject key={i} {...artObject} />
            )}
          </ul>}
      </div>
    );
  }
}

export default App;
