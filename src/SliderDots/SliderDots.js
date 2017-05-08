import  React, {Component} from 'react'
export default class SliderDots extends Component {

    render() {
        let {count, index} = this.props
        return (
            <div className="_slider_dot_container">
                {
                    new Array(count).fill(0).map((_, i) => {
                        const style = i === index ? {
                            background: 'red'
                        } : {}

                        return (<div className="_slider_dot" style={style}/>)

                    })
                }
            </div>
        )
    }
}