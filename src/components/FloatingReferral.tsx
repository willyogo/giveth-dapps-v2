import React, { useState, FC, useEffect } from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { useIntl } from 'react-intl';
import {
	B,
	brandColors,
	IconChevronUp,
	IconChevronDown,
	Button,
	neutralColors,
	mediaQueries,
	deviceSize,
} from '@giveth/ui-design-system';
import { FlexCenter } from '@/components/styled-components/Flex';
import { Shadow } from '@/components/styled-components/Shadow';
import { EContentType } from '@/lib/constants/shareContent';
import ShareRewardedModal from '@/components/modals/ShareRewardedModal';
import useMediaQuery from '@/hooks/useMediaQuery';

interface IFloatingReferral {
	projectHref?: string;
}

const FloatingButtonReferral: FC<IFloatingReferral> = props => {
	const [showModal, setShowModal] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { formatMessage } = useIntl();
	const { projectHref } = props;
	const [showFloatingReferral, setShowFloatingReferral] = useState(true);
	const isMobile = useMediaQuery(`(max-width: ${deviceSize.mobileL - 1}px)`);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const threshold = 0;
		let lastScrollY = window.pageYOffset;
		let ticking = false;

		const updateScrollDir = () => {
			const scrollY = window.pageYOffset;

			if (Math.abs(scrollY - lastScrollY) < threshold) {
				ticking = false;
				return;
			}
			const show = scrollY <= lastScrollY;
			setShowFloatingReferral(show);
			lastScrollY = scrollY > 0 ? scrollY : 0;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateScrollDir);
				ticking = true;
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, [showFloatingReferral]);

	return (
		<>
			{!isMobile ? (
				<FloatingContainer isOpen={isOpen}>
					{isOpen && (
						<Message>
							<Body>
								{formatMessage({
									id: 'label.share_this_page_with_your_friends',
								})}
							</Body>
							<StyledShareButton
								label={formatMessage({
									id: 'label.share_and_get_rewarded',
								})}
								onClick={async () => {
									setShowModal(true);
									setIsOpen(false);
								}}
								buttonType='texty-gray'
								icon={
									<Image
										src='/images/icons/gift_pink.svg'
										width={16}
										height={16}
										alt='gift'
									/>
								}
								size='small'
							/>
						</Message>
					)}
					<ButtonContainer isOpen={isOpen}>
						<FloatingButton
							onClick={handleClick}
							isOpen={isOpen}
							// label={formatMessage({ id: 'label.refer_your_friends' })}
						>
							{formatMessage({
								id: 'label.share_and_get_rewarded',
							})}{' '}
							{isOpen ? (
								<IconChevronDown
									color={brandColors.pinky[500]}
									size={24}
								/>
							) : (
								<IconChevronUp
									color={brandColors.pinky[500]}
									size={24}
								/>
							)}
						</FloatingButton>
					</ButtonContainer>
				</FloatingContainer>
			) : (
				<FloatingMobileContainer
					onClick={handleClick}
					isOpen={isOpen}
					show={showFloatingReferral}
				>
					{isOpen ? (
						<>
							<Message>
								<Body>
									{formatMessage({
										id: 'label.share_this_page_with_your_friends',
									})}
								</Body>
								<StyledShareButton
									label={formatMessage({
										id: 'label.share_and_get_rewarded',
									})}
									onClick={async e => {
										e.stopPropagation();
										setShowModal(true);
										setIsOpen(false);
									}}
									buttonType='texty-gray'
									icon={
										<Image
											src='/images/icons/gift_pink.svg'
											width={16}
											height={16}
											alt='gift'
										/>
									}
									size='small'
								/>
							</Message>
							<ButtonContainer isOpen={isOpen}>
								<FloatingButton
									onClick={handleClick}
									isOpen={isOpen}
								>
									{formatMessage({
										id: 'label.refer_your_friends',
									})}
									{isOpen ? (
										<IconChevronDown
											color={brandColors.pinky[500]}
											size={24}
										/>
									) : (
										<IconChevronUp
											color={brandColors.pinky[500]}
											size={24}
										/>
									)}
								</FloatingButton>
							</ButtonContainer>
						</>
					) : (
						<FloatingButton onClick={handleClick} isOpen={isOpen}>
							{formatMessage({
								id: 'label.refer_your_friends',
							})}
							{isOpen ? (
								<IconChevronDown
									color={brandColors.pinky[500]}
									size={24}
								/>
							) : (
								<IconChevronUp
									color={brandColors.pinky[500]}
									size={24}
								/>
							)}
						</FloatingButton>
					)}
				</FloatingMobileContainer>
			)}
			{showModal && (
				<ShareRewardedModal
					contentType={EContentType.thisProject}
					setShowModal={setShowModal}
					projectHref={projectHref}
				/>
			)}
		</>
	);
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FloatingContainer = styled(FlexCenter)<{ isOpen: boolean }>`
	display: none;
	position: fixed;
	bottom: 2rem;
	left: 2rem;
	padding: ${({ isOpen }) => (isOpen ? ' 6px 0' : '0')};
	width: ${({ isOpen }) => (isOpen ? '331px' : '271px')};
	z-index: 20;
	justify-content: center;
	border-radius: 12px;
	background: white;
	${mediaQueries.mobileM} {
		display: block;
	}
	box-shadow: ${props =>
		props.isOpen ? ` ${Shadow.Giv[400]} !important` : 'none'};
	transition: width 0.3s ease-in-out;
`;

const FloatingMobileContainer = styled.div<{ isOpen: boolean; show: boolean }>`
	bottom: 0;
	left: 0;
	width: 100%;
	position: fixed;
	z-index: 20;
	background-color: white;
	transition: width 0.3s ease-in-out;
	transition: height 0.3s ease-in-out;
	height: ${({ isOpen, show }) => (!show ? 0 : isOpen ? '220px' : '56px')};
	overflow-y: auto;
`;
const FloatingButton = styled.button<{ isOpen: boolean }>`
	background-color: white;
	text-transform: capitalize;
	border: none;
	width: ${({ isOpen }) => (isOpen ? '331px' : '271px')};
	height: 46px;
	align-items: center;
	padding: 18px 24px;
	cursor: pointer;
	color: ${({ isOpen }) =>
		isOpen ? neutralColors.gray[800] : brandColors.pinky[500]};
	font-weight: 500;
	font-size: 14px;
	line-height: 150%;
	display: flex;
	justify-content: space-between;
	z-index: 4 !important;
	position: relative;
	border-radius: ${({ isOpen }) => (!isOpen ? '12px' : '0')};
	border-top-left-radius: 12px;
	border-top-right-radius: 12px;
	z-index: 21;

	${mediaQueries.mobileS} {
		height: 48px;
		width: 100%;
	}

	${mediaQueries.mobileM} {
		height: 50px;
	}
`;

const ButtonContainer = styled.div<{ isOpen: boolean }>`
	display: flex;
	flex-direction: column-reverse;
	transform: ${({ isOpen }) =>
		isOpen ? 'translateY(-290%)' : 'translateY(0)'};
	transition: transform 0.3s ease-in-out;
	* {
		background: white !important;
		box-shadow: none !important;
	}
	box-shadow: ${({ isOpen }) =>
		isOpen ? 'none' : `${Shadow.Giv[400]} !important`};

	border-radius: 12px;
`;

const Message = styled(FlexCenter)`
	flex-direction: column;
	padding: 0 1rem 1rem 1rem;
	width: 100%;
	animation: ${fadeIn} 0.6s ease-in-out;
	bottom: 0;
	border-bottom-left-radius: 12px;
	border-bottom-right-radius: 12px;
	z-index: 1;
	background: white;
	transform: translateY(3.5rem);
`;

const StyledShareButton = styled(Button)`
	box-shadow: 0px 3px 20px rgba(212, 218, 238, 0.4);
	flex-direction: row-reverse;
	gap: 8px;
	padding: 16px 10px;
	color: ${brandColors.pinky[500]};
	margin: 18px 0 0 0;
	width: 100%;
	&:hover {
		color: ${brandColors.pinky[500]};
	}
	& > div[loading='1'] > div {
		left: 0;
	}
	padding: 16px 8px;
	* {
		font-size: 12px;
		text-transform: capitalize;
	}
`;

const Body = styled(B)`
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 150%;
	color: ${neutralColors.gray[800]};
	padding: 16px 12px 0 12px;
	border-top: 1px solid ${neutralColors.gray[300]};
`;

export default FloatingButtonReferral;
