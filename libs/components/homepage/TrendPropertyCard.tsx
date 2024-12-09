import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface TrendPropertyCardProps {
	property: Property;
	likePropertyHandler: any;
}

const TrendPropertyCard = (props: TrendPropertyCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	const pushDetailHandler = async(propertyId: string) => {
		console.log("ID:", propertyId);
		await router.push({pathname: '/property/detail' , query: {id: propertyId}});
	};

	if (device === 'mobile') {
		return (
			<Stack className="trend-card-box" key={property._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => {
						pushDetailHandler(property._id)
					}}
				>
					<div className={"price-label"}>${property.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => {
						pushDetailHandler(property._id)
					}}>{property.propertyTitle}</strong>
					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/label.png" alt="" />
							<span>{property.propertyBrand}</span>
						</div>
						<div>
							<img src="/img/icons/location1.png" alt="" />
							<span>{property.propertyLocation}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>
							{property.propertyNew ? 'New' : ''} {property.propertyNew && property.propertyNew && '/'}{' '}
							{property.propertyWorn ? 'Worn' : ''}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
		
			<Stack className="trend-card-box" key={property._id} direction="row">
			<Box
			  className="card-img"
			  style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
			  onClick={() => pushDetailHandler(property._id)}
			>
			  <div className="price-badge">${property.propertyPrice}</div>
			</Box>
			<Box className="info">
			  <Typography
				className="title"
				variant="h6"
				onClick={() => pushDetailHandler(property._id)}
			  >
				{property.propertyTitle}
			  </Typography>
			  <Typography className="desc">
				Category - {property.propertyCategory ?? 'No description available'}
			  </Typography>
			  <Box className="options">
				<Box className="option-item">
				  <img src="/img/icons/label.png" alt="Brand" />
				  <span>{property.propertyBrand}</span>
				</Box>
				<Box className="option-item">
				  <img src="/img/icons/location1.png" alt="Location" />
				  <span>{property.propertyLocation}</span>
				</Box>
			  </Box>
			  <Divider sx={{ my: '15px' }} />
			  <Box className="bott">
				<Typography variant="body2" className="condition">
				  {property.propertyNew ? 'New' : ''} {property.propertyNew && property.propertyWorn && '/'}{' '}
				  {property.propertyWorn ? 'Worn' : ''}
				</Typography>
				<Box className="view-like-box">
				  <IconButton color={'default'}>
					<RemoveRedEyeIcon />
				  </IconButton>
				  <Typography className="view-cnt">{property?.propertyViews}</Typography>
				  <IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
					{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
					  <FavoriteIcon style={{ color: 'red' }} />
					) : (
					  <FavoriteIcon />
					)}
				  </IconButton>
				  <Typography className="view-cnt">{property?.propertyLikes}</Typography>
				</Box>
			  </Box>
			</Box>
		  </Stack>
		  
		  
		);
	}
};

export default TrendPropertyCard;
