import React, { SyntheticEvent, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [category, setCategory] = useState<string>('property');
	const [expanded, setExpanded] = useState<string | false>('panel1');

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	
	/** HANDLERS **/
	const changeCategoryHandler = (data: string) => {
		setCategory(data);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const data: any = {
		property: [
		  {
			id: '001',
			subject: 'Are the watches displayed on the site authentic?',
			content: 'Yes, all watches are 100% authentic and verified for quality.',
		  },
		  {
			id: '002',
			subject: 'What types of watches do you offer?',
			content: 'We offer luxury, sports, casual, and smartwatches from various top brands.',
		  },
		  {
			id: '003',
			subject: 'How can I search for watches on your website?',
			content: 'Use our search bar to filter by brand, price range, style, and features.',
		  },
		  {
			id: '004',
			subject: 'Do you provide warranties for the watches?',
			content: 'Yes, all our watches come with a manufacturer’s warranty.',
		  },
		  {
			id: '005',
			subject: 'What should I consider when buying a watch?',
			content: 'Consider the brand, style, features, and occasion for which the watch will be used.',
		  },
		  {
			id: '006',
			subject: 'How long does shipping usually take?',
			content: 'Shipping typically takes 3–7 business days, depending on your location.',
		  },
		  {
			id: '007',
			subject: 'What happens if I encounter issues with the watch after purchase?',
			content: 'We provide post-purchase support and assistance for warranty claims.',
		  },
		  {
			id: '008',
			subject: 'Do you offer limited edition or rare watches?',
			content: 'Yes, we have a selection of limited edition and rare watches. Check our exclusive section for more details.',
		  },
		  {
			id: '009',
			subject: 'Can I sell my watch through your website?',
			content: 'Yes, we offer a resale service for luxury watches. Please contact us for more details.',
		  },
		  {
			id: '010',
			subject: 'Do you offer watch repair or maintenance services?',
			content: 'Yes, we provide repair and maintenance services for watches purchased from us.',
		  },
		],
		payment: [
		  {
			id: '011',
			subject: 'How can I make a payment?',
			content: 'You can make a payment using credit/debit cards, PayPal, or bank transfers.',
		  },
		  {
			id: '012',
			subject: 'Are there any additional fees for using your services?',
			content: 'No, there are no hidden fees. The price you see is the price you pay.',
		  },
		  {
			id: '013',
			subject: 'Is there an option for installment payments?',
			content: 'Yes, we offer installment plans for select watches. Contact us to learn more.',
		  },
		  {
			id: '014',
			subject: 'Is my payment information secure on your website?',
			content:
			  'Absolutely, we use industry-standard encryption to ensure your payment information is secure.',
		  },
		  {
			id: '015',
			subject: 'Can I make payments online through your website?',
			content: "Yes, you can securely pay online using our payment gateway.",
		  },
		  {
			id: '016',
			subject: "What happens if there's an issue with my payment?",
			content: 'Please contact our support team for assistance with any payment issues.',
		  },
		  {
			id: '017',
			subject: 'Do you offer refunds for payments made?',
			content: 'Refunds are available as per our refund policy. Contact us for details.',
		  },
		  {
			id: '018',
			subject: 'Are there any discounts or promotions for early payments?',
			content:
			  'Yes, we occasionally offer promotions. Check our website or contact us for the latest deals.',
		  },
		  {
			id: '019',
			subject: 'How long does it take for payments to be processed?',
			content: 'Payments are processed instantly for most methods, but bank transfers may take 1–3 days.',
		  },
		  {
			id: '020',
			subject: 'Are there penalties for late payments?',
			content: 'Late payment policies depend on the terms of your agreement. Please refer to our policies for details.',
		  },
		],
		buyers: [
		  {
			id: '021',
			subject: 'What should buyers pay attention to?',
			content: 'Buyers should verify the watch’s specifications and authenticity before purchase.',
		  },
		  {
			id: '022',
			subject: 'How can I determine if a watch fits my budget?',
			content: 'Our filters help you find watches within your price range. You can also explore our installment plans.',
		  },
		  {
			id: '023',
			subject: 'What documents do I need to provide when buying a luxury watch?',
			content: 'No specific documents are required unless opting for installment plans.',
		  },
		  {
			id: '024',
			subject: 'What factors should I consider when choosing a watch?',
			content: 'Consider the brand, design, durability, and purpose of the watch.',
		  },
		  {
			id: '025',
			subject: 'Can I negotiate the price of a watch?',
			content: 'Prices for most watches are fixed, but promotional discounts may apply.',
		  },
		],
		membership: [
		  {
			id: '026',
			subject: 'Do you have a membership service?',
			content: 'Membership services are coming soon. Stay updated for exclusive benefits.',
		  },
		  {
			id: '027',
			subject: 'Will membership provide discounts on watches?',
			content: 'Yes, members will receive exclusive discounts once the service is launched.',
		  },
		],
	  };
	  

	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	} else {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === 'property' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('property');
						}}
					>
						Property
					</div>
					<div
						className={category === 'payment' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('payment');
						}}
					>
						Payment
					</div>
					<div
						className={category === 'buyers' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('buyers');
						}}
					>
						Foy Buyers
					</div>
					<div
						className={category === 'agents' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('agents');
						}}
					>
						For Agents
					</div>
					<div
						className={category === 'membership' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('membership');
						}}
					>
						Membership
					</div>
					<div
						className={category === 'community' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('community');
						}}
					>
						Community
					</div>
					<div
						className={category === 'other' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('other');
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{data[category] &&
						data[category].map((ele: any) => (
							<Accordion expanded={expanded === ele?.id} onChange={handleChange(ele?.id)} key={ele?.subject}>
								<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography> {ele?.subject}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography> {ele?.content}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	}
};

export default Faq;
