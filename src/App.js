import React, { Component } from 'react';
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

    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.onSearchKeyDown = this.onSearchKeyDown.bind(this);

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

  doSearch() {
    let that = this;
    that.setState({loading: true});

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

  setSearchTerm(e) {
    this.setState({searchTerm: e.target.value});
  }

  onSearchKeyDown(e) {
    if (e.keyCode === 13)
      this.doSearch();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          onKeyDown={this.onSearchKeyDown}
          onChange={this.setSearchTerm}
        />
        <button onClick={this.doSearch}>Search</button>

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
