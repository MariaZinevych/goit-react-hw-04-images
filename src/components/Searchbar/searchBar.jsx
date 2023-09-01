import { toast } from 'react-hot-toast';
import { But, Form, Header, Input } from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  return (
    <>
      <Header>
        <Form
          onSubmit={e => {
            e.preventDefault();
            if (e.target.elements.query.value.trim() === '') {
              toast('Enter name');
              return;
            }
            onSubmit(e.target.elements.query.value);
            e.target.reset();
          }}
        >
          <But type="submit">
            <span>Search</span>
          </But>

          <Input type="text" name="query" autoComplete="off" autoFocus />
        </Form>
      </Header>
    </>
  );
};
