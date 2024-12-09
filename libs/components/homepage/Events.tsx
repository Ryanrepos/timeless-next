// import React from 'react';
// import { Stack, Box } from '@mui/material';
// import useDeviceDetect from '../../hooks/useDeviceDetect';

// interface EventData {
// 	eventTitle: string;
// 	city: string;
// 	description: string;
// 	imageSrc: string;
// }
// const eventsData: EventData[] = [
// 	{
// 		eventTitle: 'Paradise City Theme Park',
// 		city: 'Incheon',
// 		description:
// 			'Experience magic and wonder in Incheon with a visit to the night-themed indoor theme park Wonderbox at Paradise City!',
// 		imageSrc: '/img/events/INCHEON.webp',
// 	},
// 	{
// 		eventTitle: 'Taebaeksan Snow Festival',
// 		city: 'Seoul',
// 		description: 'If you have the opportunity to travel to South Korea, do not miss the Taebaeksan Snow Festival!',
// 		imageSrc: '/img/events/SEOUL.webp',
// 	},
// 	{
// 		eventTitle: 'Suseong Lake Event',
// 		city: 'Daegu',
// 		description: 'The Suseong Lake Festival is a culture and arts festival held alongside Suseongmot Lake!',
// 		imageSrc: '/img/events/DAEGU.webp',
// 	},
// 	{
// 		eventTitle: 'Sand Festival',
// 		city: 'Busan',
// 		description:
// 			'Haeundae Sand Festival, the nation’s largest eco-friendly exhibition on sand, is held at Haeundae Beach!',
// 		imageSrc: '/img/events/BUSAN.webp',
// 	},
// ];

// const EventCard = ({ event }: { event: EventData }) => {
// 	const device = useDeviceDetect();

// 	if (device === 'mobile') {
// 		return <div>EVENT CARD</div>;
// 	} else {
// 		return (
// 			<Stack
// 				className="event-card"
// 				style={{
// 					backgroundImage: `url(${event?.imageSrc})`,
// 					backgroundSize: 'cover',
// 					backgroundPosition: 'center',
// 					backgroundRepeat: 'no-repeat',
// 				}}
// 			>
// 				<Box component={'div'} className={'info'}>
// 					<strong>{event?.city}</strong>
// 					<span>{event?.eventTitle}</span>
// 				</Box>
// 				<Box component={'div'} className={'more'}>
// 					<span>{event?.description}</span>
// 				</Box>
// 			</Stack>
// 		);
// 	}
// };

// const Events = () => {
// 	const device = useDeviceDetect();

// 	if (device === 'mobile') {
// 		return <div>EVENT CARD</div>;
// 	} else {
// 		return (
// 			<Stack className={'events'}>
// 				<Stack className={'container'}>
// 					<Stack className={'info-box'}>
// 						<Box component={'div'} className={'left'}>
// 							<span className={'white'}>Events</span>
// 							<p className={'white'}>Events waiting your attention!</p>
// 						</Box>
// 					</Stack>
// 					<Stack className={'card-wrapper'}>
// 						{eventsData.map((event: EventData) => {
// 							return <EventCard event={event} key={event?.eventTitle} />;
// 						})}
// 					</Stack>
// 				</Stack>
// 			</Stack>
// 		);
// 	}
// };

// export default Events;

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

