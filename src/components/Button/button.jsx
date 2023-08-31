import { Buttons } from './button.styled';

export const Button = ({ onClick }) => {
  return (
    <>
      <Buttons type="button" onClick={onClick}>
        Load more
      </Buttons>
    </>
  );
};
