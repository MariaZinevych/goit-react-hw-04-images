import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { ListGallery } from './ImageGallery.styled';

export const ImageGallery = ({ image }) => {
  return (
    <>
      <ListGallery>
        {image.map(im => (
          <ImageGalleryItem key={im.id} image={im} />
        ))}
      </ListGallery>
    </>
  );
};
