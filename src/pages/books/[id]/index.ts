import  BookDetail from './book-detail'
import { compose } from 'ramda'
import { withApi } from './with-api'
import { withStyle } from './with-style'
import { withCssModule } from './with-css-module'
const Items = compose(
  withCssModule,
  withStyle,
  withApi
)(BookDetail)

export default Items