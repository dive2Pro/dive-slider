/**
 * Created by hyc on 17-5-7.
 */
import React, {Component,PropTypes} from 'react'
// const PropTypes  = React.PropTypes
import  SliderDots  from './SliderDots'
import './scss/index.scss'

const anims = {

}


const map = function (n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};


/**
 * 轮播图插件:
 *
 *            可设置切换的duration
 *            支持defaultImage
 *            图片指示器
 *            todo 支持touch事件
 *            todo 可指定图片切换效果
 */

export default class Slider extends Component {
    arc
    tickCount = 0
    count=0

    constructor(props) {
        super(props)
       this.init(props)
    }
    componentWillReceiveProps(nextProps){
        this.init(nextProps);
    }

    init = (props)=>{
        const {srcs} = props
        const count = this.count = srcs.length
        const arc = this.arc = 2 * Math.PI / count
        const arcs = srcs.map((_, index) => {
            return arc * index;
        })
        this.state = ({
            arcs,
            srcs
        })
    }
    static defaultProps = {

        duration: 1500,
        width: 500,
        hasDots: true,
        height:400
    }

    static propTypes = {
        duration: PropTypes.number,
        defaultImage: PropTypes.string,
        animType: PropTypes.oneOf(['fade']),
        width: PropTypes.number,
        height: PropTypes.number,
        srcs: PropTypes.arrayOf(PropTypes.string).isRequired,
        hasDots: PropTypes.bool,
        handleImageClick: PropTypes.func.isRequired
    }

    renderImages = () => {
        const {arcs, srcs} = this.state
        const {width,height} = this.props
        const r = width
        return srcs.map((src, index) => {
            let du = arcs[index];
            let z = Math.cos(du) * r - r
            let x = Math.sin(du) * r
            let y = Math.tan(du) * r
            z = map(z, -1000, 0, -360, 0)
            const width = r + 100
            console.log(width/1.8)
            /**
             * 需要Y轴的下半部分对齐,考虑Y轴:
             *         视差导致的角度
             *
             * @type {{transform: string, zIndex: string, width: number, left: string}}
             */
            const style = {
                transform: `translateX(${x}px)   translateZ(${z}px) `
                , zIndex: z.toFixed(0)
                , width
                , left: `calc(50% - ${width / 2}px)`
            }
            return (
                <div
                    key={index + " - sliderItem"}
                    className="div-image" style={style}>
                    <div
                        className="div-mask"
                        style={{display: z == 0 ? 'none' : 'block'}}
                    >

                    </div>
                    <img
                        data-index={x.toFixed(0)}
                        className="image"
                        src={src}
                        style={{width: style.width,height:height*0.9}}
                    />
                </div>)
        })
    }

    handleImageClick = (e) => {
        const target = e.target
        if (target.tagName !== 'IMG') {
            return
        }
        const index = +target.dataset.index
        if (index === 0) {
            // 事件
            const {handleImageClick} = this.props

            handleImageClick && handleImageClick.call(this
                , target.src
                , this.tickCount, e)
            return
        }
        const a = index < 0 ? this.arc : this.arc * -1;

        this.nextTick(a)
    }

    nextTick(a) {
        if(this.count<1){
            return;
        }
        let index = this.tickCount +=( a > 0 ? -1 : 1);
        let ic = index % this.count;
        this.tickCount = ic < 0 ? ic + this.count : +ic
        console.log(this.tickCount,ic)
        this.setState(prev => {
            let newArcs = (prev.arcs.map(arc => {
                return arc + a
            }))
            return {
                arcs: newArcs
            }
        })
    }

    componentDidMount() {
        this.startNextTimeout()

    }

    componentDidUpdate() {
        this.startNextTimeout()
    }

    startNextTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null;
        }

        this.timeout = setTimeout(this.nextTick.bind(this), this.props.duration, -1 * this.arc);

    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null;
        }
    }

    render() {
        const {hasDots,height} = this.props
        return (
            <section
                className="container"
                style={{height}}
            >
                <div
                    onMouseDown={this.handleImageClick}
                    className="_slider_items"
                    style={{height:height*0.9}}
                >
                    {
                        this.renderImages()
                    }
                </div>
                {
                    hasDots && <SliderDots index={this.tickCount} count={this.count}/>
                }
            </section>
        )
    }
}
