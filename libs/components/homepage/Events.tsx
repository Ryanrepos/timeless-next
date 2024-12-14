
import React from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
// import "./reviews-section.scss";

interface Review {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "John Doe",
    location: "New York, USA",
    text: "Amazing service! Highly recommend to everyone.",
    rating: 5,
    date: "2024-12-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    location: "London, UK",
    text: "The quality of the products exceeded my expectations!",
    rating: 4,
    date: "2024-11-28",
  },
  {
    id: 3,
    name: "Ali Khan",
    location: "Dubai, UAE",
    text: "Excellent customer service and fast delivery.",
    rating: 5,
    date: "2024-11-25",
  },
  {
	id: 4,
	rating: 5,
	text: "The platform made the buying process smooth and hassle-free. Highly recommend Chrono24 for finding premium watches at great prices.",
	name: "Michael T",
	location: "United Kingdom",
	date: "3 days ago",
  },
];

const ReviewsSection: React.FC = () => {
	const device = useDeviceDetect();

	if(device === "mobile") {
		return (
			<div className="reviews-section">
			  <h2>What thousands of happy customers are saying about us</h2>
			  <p className="trust-score">⭐ TrustScore: "Excellent" with 4.8/5 stars</p>
			  <p className="reviews-summary">167,346 reviews from around the globe</p>
		
			  <div className="reviews-container">
				{reviews.map((review) => (
				  <div className="review-card" key={review.id}>
					<div className="review-header">
					  <div className="stars">
						{[...Array(review.rating)].map((_, index) => (
						  <span key={index}>★</span>
						))}
					  </div>
					  <span className="date">{review.date}</span>
					</div>
		
					<p className="review-text">"{review.text}"</p>
		
					<div className="review-footer">
					  <div className="avatar">{review.name.charAt(0)}</div>
					  <div className="reviewer-info">
						<p className="name">{review.name}</p>
						<p className="location">{review.location}</p>
					  </div>
					</div>
				  </div>
				))}
			  </div>
		
			  <p className="powered-by">Powered by ⭐ Trustpilot</p>
			</div>
		  );
	} else {
		return (
			<div className="reviews-section">
			  <h2>What thousands of happy customers are saying about us</h2>
			  <p className="trust-score">⭐ TrustScore: "Excellent" with 4.8/5 stars</p>
			  <p className="reviews-summary">167,346 reviews from around the globe</p>
		
			  <div className="reviews-container">
				{reviews.map((review) => (
				  <div className="review-card" key={review.id}>
					<div className="review-header">
					  <div className="stars">
						{[...Array(review.rating)].map((_, index) => (
						  <span key={index}>★</span>
						))}
					  </div>
					  <span className="date">{review.date}</span>
					</div>
		
					<p className="review-text">"{review.text}"</p>
		
					<div className="review-footer">
					  <div className="avatar">{review.name.charAt(0)}</div>
					  <div className="reviewer-info">
						<p className="name">{review.name}</p>
						<p className="location">{review.location}</p>
					  </div>
					</div>
				  </div>
				))}
			  </div>
		
			  <p className="powered-by">Powered by ⭐ Trustpilot</p>
			</div>
		  );
	}
};

export default ReviewsSection;

