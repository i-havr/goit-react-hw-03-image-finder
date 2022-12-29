import React, { Component } from 'react';
import fetchImagesWithQuery from 'services/api';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    try {
      const query = this.props.query;
      const images = await fetchImagesWithQuery(query);
      this.setState({ images });
    } catch (error) {
      return toast.error('Whoops, something went wrong: ', error.message);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    try {
      const query = this.props.query;
      if (prevProps.query !== query) {
        const images = await fetchImagesWithQuery(query);
        this.setState({ images: [...images] });
      }
    } catch (error) {
      return toast.error('Whoops, something went wrong: ', error.message);
    }
  }

  render() {
    const { images } = this.state;
    return (
      <ImageGalleryStyled>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ImageGalleryStyled>
    );
  }
}
