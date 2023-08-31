import { Component } from 'react';
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

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const {
      image: { webformatURL, tags, largeImageURL },
    } = this.props;
    return (
      <>
        <List>
          <img onClick={this.openModal} src={webformatURL} alt={tags} />
        </List>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <img src={largeImageURL} alt={tags} />
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </>
    );
  }
}
