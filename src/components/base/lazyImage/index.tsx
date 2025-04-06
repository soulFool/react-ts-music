import type { LazyLoadImageProps} from 'react-lazy-load-image-component'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import PlaceholderImage from '@/assets/images/default.png'

const LazyImage = ({ src, width = '100%', height = '100%', effect = 'blur', placeholderSrc }: LazyLoadImageProps) => {
  return <LazyLoadImage
    src={src}
    width={width} height={height}
    placeholderSrc={placeholderSrc || PlaceholderImage}
    effect={effect}
  />
}

export default LazyImage
