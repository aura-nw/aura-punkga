import  Comic from './comic'
import { compose } from 'ramda'
import { withApi } from './with-api'
import { withStyle } from './with-style'
import { withCssModule } from './with-css-module'
 const Items = compose(
  withCssModule,
  withStyle,
  withApi
)(Comic)

export default Items