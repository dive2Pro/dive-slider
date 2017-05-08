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
console.log(art4)
class Temp extends React.Component{
    state={srcs:[]}
    componentDidMount(){
        setTimeout(()=>{
            this.setState({srcs:[art1,art2,art3,art4,`https://i1.sndcdn.com/artworks-EhFiyF077jKO-0-t500x500.jpg`,`https://i1.sndcdn.com/artworks-EhFiyF077jKO-0-t500x500.jpg`,`https://i1.sndcdn.com/artworks-EhFiyF077jKO-0-t500x500.jpg`]})
        },1500)
    }
    render(){
        return (<div>
            <Slider
                height={400}
                width={500}
                srcs={this.state.srcs}/>
        </div>)
    }
}

ReactDOM.render(<Temp
    srcs={[art1,art2,art3,art4]}
/>,document.getElementById('app'));