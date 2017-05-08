/**
 * Created by hyc on 17-5-8.
 */
import   React from 'react'
import   ReactDOM from 'react-dom'
import   Slider from './Slider'
// import ar1 from '../pics/art1.jpg'

import art1 from '../pics/art1.jpg'
import art2 from '../pics/art2.jpg'
import art3 from '../pics/art3.jpg'
import art4 from '../pics/art4.jpg'
console.log(art1)
ReactDOM.render(<Slider
    srcs={[art1,art2,art3,art4]}
/>,document.getElementById('app'));