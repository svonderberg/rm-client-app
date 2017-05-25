import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';
import '../src/App.css';

const ArtObject = ({id, title, headerImage}) => 
  <li>
      {headerImage && <img alt={title} src={headerImage.url} />}
      {!headerImage && <p>No image available</p>}
      <h1>{title}</h1>
  </li>;

class App extends Component {
  constructor(props) {
    super(props);
    this.doSearch = this.doSearch.bind(this);

    this.state = {
      searchTerm: '',
      loading: true,
      artObjects: [],
      count: 0
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
              artObjects: data.artObjects,
              count: data.count
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
            {this.state.artObjects.map(artObject => <ArtObject key={artObject.id} {...artObject} />)}
          </ul>}
      </div>
    );
  }
}

export default App;
