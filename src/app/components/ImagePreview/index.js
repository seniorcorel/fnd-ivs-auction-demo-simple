import CropOriginal from '@mui/icons-material/CropOriginal'
import { IconWrapper, Image, Preview, LoadingIcon } from './styled'
import { ImageNotSupported } from '@mui/icons-material'

const ImagePreview = ({ imageLink, imageError, imageLoading, handleLoadImage }) => {
  return (
    <Preview>
      {imageLoading && <LoadingIcon />}
      {imageLink
        ? (!!imageError ? (
          <ImageNotSupported />
        ) : (
          <Image alt={'image'}
            src={imageLink}
            onLoad={() => handleLoadImage(true)}
            onError={() => handleLoadImage(false)}
          /> 
        )
        ) : (
          <IconWrapper>
            <CropOriginal sx={{ color: 'custom.opacityWhite' }} />
          </IconWrapper>
        )
      }
    </Preview>
  )
}

export default ImagePreview