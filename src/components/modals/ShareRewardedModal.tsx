import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
} from 'react-share';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import {
	B,
	Button,
	brandColors,
	neutralColors,
	IconExternalLink,
	IconTwitter,
	IconLinkedin,
	IconFacebook,
	mediaQueries,
} from '@giveth/ui-design-system';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { Modal } from './Modal';
import GiftIcon from '../../../public/images/icons/gift.svg';
import { Flex, FlexCenter } from '@/components/styled-components/Flex';
import { slugToProjectView } from '@/lib/routeCreators';
import { IModal } from '@/types/common';
import CopyLink from '@/components/CopyLink';
import { fullPath } from '@/lib/helpers';
import { useAppSelector } from '@/features/hooks';
import { startChainvineReferral } from '@/features/user/user.thunks';
import { useModalAnimation } from '@/hooks/useModalAnimation';
import {
	EContentType,
	ESocialType,
	shareContentCreator,
} from '@/lib/constants/shareContent';
import { useAppDispatch } from '@/features/hooks';
import { setShowSignWithWallet } from '@/features/modal/modal.slice';
import Routes from '@/lib/constants/Routes';

interface IShareRewardedModal extends IModal {
	projectHref: string;
	contentType: EContentType;
	projectTitle?: string;
}

const ShareRewardedModal: FC<IShareRewardedModal> = props => {
	const {
		isSignedIn,
		isEnabled,
		userData: user,
	} = useAppSelector(state => state.user);
	const dispatch = useAppDispatch();
	const { projectHref, setShowModal, contentType, projectTitle } = props;
	const url = fullPath(
		slugToProjectView(projectHref + `?referrer_id=${user?.chainvineId}`),
	);
	const { isAnimating, closeModal } = useModalAnimation(setShowModal);
	const { formatMessage } = useIntl();

	const chainvineId = user?.chainvineId;
	const notSigned = !isEnabled || !isSignedIn;

	const shareTitleTwitter = shareContentCreator(
		contentType,
		ESocialType.twitter,
	);
	const shareTitleFacebookAndLinkedin = shareContentCreator(
		contentType,
		ESocialType.facebook,
	);

	const connectAndSignWallet = () => {
		dispatch(setShowSignWithWallet(true));
	};

	const setReferral = async () => {
		await dispatch(
			startChainvineReferral({
				address: user?.walletAddress!,
			}),
		);
	};

	useEffect(() => {
		if (isSignedIn && !user?.chainvineId) {
			setReferral();
		}
	}, [isSignedIn]);
	return (
		<Modal
			closeModal={closeModal}
			isAnimating={isAnimating}
			headerIcon={<Image src={GiftIcon} alt='gift icon' />}
			headerTitle={formatMessage({ id: 'label.share_and_earn_rewards' })}
			headerTitlePosition='left'
		>
			<Content>
				{notSigned
					? formatMessage({
							id: 'label.connet_your_wallet_and_sign_in_to_get_your_referral',
					  })
					: chainvineId &&
					  `${formatMessage(
							{
								id: 'label.heres_your_referral',
							},
							{ projectTitle },
					  )}`}
			</Content>
			<Container>
				{notSigned ? (
					<Button
						label={formatMessage({
							id: !isEnabled
								? 'component.button.connect_wallet'
								: 'component.button.sign_in',
						})}
						onClick={connectAndSignWallet}
						buttonType='primary'
					/>
				) : (
					chainvineId && (
						<LinkContainer>
							<CopyLink url={url} />
						</LinkContainer>
					)
				)}
				<HowItWorksDiv>
					{isSignedIn && chainvineId && (
						<SocialDiv gap={'16px'}>
							<SocialButtonContainer>
								<TwitterShareButton
									hashtags={['giveth']}
									title={shareTitleTwitter}
									url={url}
								>
									<IconTwitter />
								</TwitterShareButton>
								{formatMessage({
									id: 'label.share_on_twitter',
								})}
							</SocialButtonContainer>
							<SocialButtonContainer>
								<LinkedinShareButton
									title={shareTitleFacebookAndLinkedin}
									url={url}
								>
									<IconLinkedin />
								</LinkedinShareButton>
								{formatMessage({
									id: 'label.share_on_linkedin',
								})}
							</SocialButtonContainer>
							<SocialButtonContainer>
								<FacebookShareButton
									hashtag='#giveth'
									quote={shareTitleFacebookAndLinkedin}
									url={url}
								>
									<IconFacebook />
								</FacebookShareButton>
								{formatMessage({
									id: 'label.share_on_facebook',
								})}
							</SocialButtonContainer>
						</SocialDiv>
					)}
					<B>
						{formatMessage({ id: 'label.how_does_this_work' })}
						{'  '}
						<span>
							<a>
								<Link target='_blank' href={Routes.Referral}>
									{formatMessage({ id: 'label.learn_more' })}
								</Link>{' '}
							</a>
							<IconExternalLink color={brandColors.pinky[500]} />
						</span>
					</B>
				</HowItWorksDiv>
			</Container>
		</Modal>
	);
};

const Container = styled(Flex)`
	padding: 24px;
	flex-direction: column;
	align-items: center;
`;

const Content = styled(B)`
	font-weight: 400;
	font-size: 16px;
	line-height: 150%;
	padding: 0 24px;
	margin: 26px 0 0 0;
	color: ${neutralColors.gray[800]};
`;

const SocialButtonContainer = styled(FlexCenter)`
	height: 45px;
	width: 100%;
	min-width: 175px;
	cursor: pointer;
	color: ${brandColors.pinky[500]};
	gap: 12px;
	font-weight: 500;
	font-size: 12px;
	line-height: 16px;

	box-shadow: 0px 3px 20px rgba(212, 218, 238, 0.4);
	border-radius: 48px;
`;

const HowItWorksDiv = styled(Flex)`
	width: 100%;
	flex-direction: column;
	padding: 24px 0 0 0;
	margin: 24px 0 12px 0;
	align-items: center;
	justify-content: center;
	border-top: 1px solid ${neutralColors.gray[300]};
	color: ${neutralColors.gray[800]};
	text-align: center;
	font-weight: 400;
	font-size: 14px;
	line-height: 150%;
	span {
		cursor: pointer;
	}
	a {
		color: ${brandColors.pinky[500]};
	}
`;

const LinkContainer = styled(Flex)`
	max-width: 500px;
`;

const SocialDiv = styled(FlexCenter)`
	margin: 0 0 25px 0;
	flex-direction: column;
	${mediaQueries.tablet} {
		flex-direction: row;
	}
`;

export default ShareRewardedModal;