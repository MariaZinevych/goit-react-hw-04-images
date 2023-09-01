import { GlobalStyle } from 'GlobalStyles';
import { SearchBar } from './Searchbar/searchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useEffect, useState } from 'react';
import { Button } from './Button/button';
import { FetchQuery } from 'API';
import { Loader } from './Loader/Loader';
import { Toaster, toast } from 'react-hot-toast';

export const App = () => {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImage([]);
    setPage(1);
    setTotalPage(0);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (query === '') return;

    const indexOfSlash = query.indexOf('/');
    const queryAfterSlash = query.slice(indexOfSlash + 1);

    async function Search() {
      try {
        setIsLoading(true);
        const pix = await FetchQuery(queryAfterSlash, page);

        setImage(image => [...image, ...pix.hits]);
        setIsLoading(false);
        setTotalPage(Math.ceil(pix.totalHits / 12));
        if (pix.hits.length === 0) {
          return toast.error('Sorry image not found...');
        }
      } catch {
        return toast.error('Something went wrong!');
      }
    }

    Search();
  }, [page, query]);

  return (
    <>
      <SearchBar onSubmit={changeQuery} />

      {isLoading ? <Loader /> : <ImageGallery image={image} />}
      {image.length > 0 && totalPage !== page && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}

      <GlobalStyle />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
