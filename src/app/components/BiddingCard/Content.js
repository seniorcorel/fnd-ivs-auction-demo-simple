import { primary900 } from '../../styles/colours'
import { ContentWrapper } from './styled'

const Content = ({ children, noBorder }) =>
  <ContentWrapper sx={{
    borderBottom: noBorder ? 'none' : `1px solid ${primary900}`,
  }}>
    {children}
  </ContentWrapper>

export default Content
