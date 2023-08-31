import { GlobalStyle } from 'GlobalStyles';
import { SearchBar } from './Searchbar/searchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Component } from 'react';
import { Button } from './Button/button';
import { FetchQuery } from 'API';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    image: [],
    page: 1,
    isloading: false,
    totalPages: 0,
  };

  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      image: [],
      page: 1,
      totalPages: 0,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isloading: true });
      const indexOfSlash = this.state.query.indexOf('/');
      const queryAfterSlash = this.state.query.slice(indexOfSlash + 1);
      const pixabay = await FetchQuery(queryAfterSlash, this.state.page);

      this.setState(prevState => ({
        image: [...prevState.image, ...pixabay.hits],
        isloading: false,
        totalPages: Math.ceil(pixabay.totalHits / 12),
      }));

      if (pixabay.hits.length === 0) {
        return alert('Sorry image not found...');
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.changeQuery} />

        {this.state.isloading ? (
          <Loader />
        ) : (
          <ImageGallery image={this.state.image} />
        )}
        {this.state.image.length > 0 &&
          this.state.totalPages !== this.state.page &&
          !this.state.isloading && <Button onClick={this.handleLoadMore} />}

        <GlobalStyle />
      </>
    );
  }
}
