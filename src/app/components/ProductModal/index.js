import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Image, ImagePreview, ProductWrapper } from './styled'

const ProductModal = () => {
  const { product } = useSelector(state => state.auction)
  return (
    <ProductWrapper>
      {!!product && !!product.imageLink && (
        <ImagePreview>
          <Image src={product.imageLink} alt="product image" />
        </ImagePreview>
      )}
      <Typography variant='h6' color='primary.p500' lineHeight={1}>{product.productName}</Typography>
      <Typography color="custom.opacityWhite" sx={{ wordWrap: 'break-word' }} mt={2}>{product.description}</Typography>
    </ProductWrapper>
  )
}

export default ProductModal