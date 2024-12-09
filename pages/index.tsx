import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import PopularProperties from '../libs/components/homepage/PopularProperties';
import TopAgents from '../libs/components/homepage/TopAgents';
import Events from '../libs/components/homepage/Events';
import TrendProperties from '../libs/components/homepage/TrendProperties';
import TopProperties from '../libs/components/homepage/TopProperties';
import { Stack } from '@mui/material';
import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReviewCard from '../libs/components/agent/ReviewCard';
import ReviewsSection from '../libs/components/homepage/Events';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
			<div data-aos="fade-up">
				<TrendProperties />
			</div>
			<div data-aos="fade-up">
				<PopularProperties />
			</div>
			<div data-aos="fade-up">
				<Advertisement />
			</div>
			<div data-aos="fade-up">
				<TopProperties />
			</div>
			<div data-aos="fade-up">
				<TopAgents />
			</div>
			<div data-aos="fade-up">
				<ReviewsSection />
			</div>
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
			<div data-aos="fade-up">
				<TrendProperties />
			</div>
			<div data-aos="fade-up">
				<PopularProperties />
			</div>
			<div data-aos="fade-up">
				<Advertisement />
			</div>
			<div data-aos="fade-up">
				<TopProperties />
			</div>
			<div data-aos="fade-up">
				<TopAgents />
			</div>
			<div data-aos="fade-up">
				<ReviewsSection />
			</div>
			<div data-aos="fade-up">
				<CommunityBoards />
			</div>
			</Stack>

		);
	}
};

export default withLayoutMain(Home);
