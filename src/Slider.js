/**
 * Created by hyc on 17-5-7.
 */
import  {Component,PropTypes} from 'react'
// const PropTypes  = React.PropTypes
import  SliderDots  from './SliderDots'

require( './main.css')



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

class Slider extends Component {
    arc
    tickCount = 0
    count

    constructor(props) {
        super(props)
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
        hasDots: true
    }

    static propTypes = {
        duration: PropTypes.number,
        defaultImage: PropTypes.string,
        animType: PropTypes.oneOf(['fade']),
        width: PropTypes.number,
        srcs: PropTypes.arrayOf(PropTypes.string).isRequired,
        hasDots: PropTypes.bool,
        handleImageClick: PropTypes.func.isRequired
    }

    renderImages = () => {
        const {arcs, srcs} = this.state
        const r = 500
        return srcs.map((src, index) => {
            let du = arcs[index];
            let z = Math.cos(du) * r - r
            let x = Math.sin(du) * r
            let y = Math.tan(du) * r
            z = map(z, -1000, 0, -360, 0)
            const width = r + 100
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
                        style={{width: style.width}}
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

        let index = this.tickCount += a > 0 ? -1 : 1;
        let ic = index % this.count;
        this.tickCount = ic < 0 ? ic + this.count : +ic
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
        // this.startNextTimeout()
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
        const {srcs} = this.state
        const {hasDots} = this.props
        return (
            <section
                className="container">
                <div
                    onMouseDown={this.handleImageClick}
                    className="_slider_items">
                    {
                        this.renderImages()
                    }
                </div>
                {hasDots && <SliderDots index={this.tickCount} count={srcs.length}/>
                }
            </section>
        )
    }
}

export default Slider