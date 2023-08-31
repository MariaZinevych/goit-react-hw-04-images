import { useState } from 'react';
import Modal from 'react-modal';

import { List } from './ImageGalleryitem.styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ImageGalleryItem = ({
  image: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalopen] = useState(false);

  return (
    <>
      <List>
        <img
          onClick={() => {
            setIsModalopen(true);
          }}
          src={webformatURL}
          alt={tags}
        />
      </List>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalopen(false);
        }}
        style={customStyles}
      >
        <img src={largeImageURL} alt={tags} />
        <button
          onClick={() => {
            setIsModalopen(false);
          }}
        >
          close
        </button>
      </Modal>
    </>
  );
};
