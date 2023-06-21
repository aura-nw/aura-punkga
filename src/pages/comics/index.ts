import  Comics from './comics'
import { compose } from 'ramda'
import { withApi } from './with-api'
import { withStyle } from './with-style'
import { withCssModule } from './with-css-module'
 const Items = compose(
  withCssModule,
  withStyle,
  withApi
)(Comics)

export default Items