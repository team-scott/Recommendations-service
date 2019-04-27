import React, {Component} from 'react'
import StarRatingComponent from 'react-star-rating-component'

class CarouselList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className='heart' onClick={this.props.openModal} 
        value={this.props.recommendation._id} 
        img={this.props.recommendation.RecImg}
        title={this.props.recommendation.RecTitle}
        rating={this.props.recommendation.RecRating}
        recratingcount={this.props.recommendation.RecRatingCount}></div>
        <div>
          <img className='photo' src={this.props.recommendation.RecImg} alt=''/>
          <div className='photo-padding'>
            <div className='photo-description'>
              <div className='photo-title'>{this.props.recommendation.RecTitle}</div>
              <div className='photo-description-description'>{this.props.recommendation.RecDetails}</div>
              <div className='photo-price'>${this.props.recommendation.RecCost} per night</div>
              <StarRatingComponent starColor='red' className='photo-star-rating' name='rating' starCount={parseInt(this.props.recommendation.RecRating)}/>
              <div className='photo-rating-count'>({parseInt(this.props.recommendation.RecRatingCount)})</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CarouselList

