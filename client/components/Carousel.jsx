import React, {Component} from 'react'
import Slider from "react-slick";
import CarouselList from './CarouselList.jsx'

class Carousel extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var settings = {
        dots: true,
        slidesToShow: this.props.recommendations.length <= 3 ? this.props.recommendations.length : 3,
        centerMode: true,
        centerPadding:0
      }; 
    return (
         <div className="container">
          <Slider {...settings}>
            {this.props.recommendations.map((rec, index) => {
              return <CarouselList openModal={this.props.openModal} recommendation={rec} key={index}/>
            })}
          </Slider>
        </div>
    )
  }
}

export default Carousel