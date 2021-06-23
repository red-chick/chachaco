import Slider from "react-slick";
import { Image } from "semantic-ui-react";

import { ImageType } from "../common/firebase/type";

const sliderSettings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

type Props = {
  images: ImageType[];
};

const Images = ({ images }: Props) => {
  return (
    <Slider {...sliderSettings}>
      {images &&
        images.map((image) => (
          <Image key={image.url} src={image.url} size="huge" centered />
        ))}
    </Slider>
  );
};

export default Images;
