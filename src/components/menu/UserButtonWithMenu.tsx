import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { useAccount, useNetwork } from 'wagmi';
import { shortenAddress } from '@/lib/helpers';
import {
	MenuAndButtonContainer,
	WalletButton,
	HBContainer,
	HBPic,
	WBInfo,
	WBNetwork,
	CoverLine,
	HeaderSidebarButtonWrapper,
	SidebarInnerContainer,
	UserName,
} from '../Header/Header.sc';
import { useAppSelector } from '@/features/hooks';
import { ETheme } from '@/features/general/general.slice';
import { useDelayedState } from '@/hooks/useDelayedState';
import useMediaQuery from '@/hooks/useMediaQuery';
import { PROFILE_PHOTO_PLACEHOLDER, device } from '@/lib/constants/constants';
import { SideBar, ESideBarDirection } from '../sidebar/SideBar';
import { MenuContainer } from './Menu.sc';
import { UserItems } from './UserItems';
import { FlexSpacer } from '../styled-components/Flex';
import { ItemsProvider } from '@/context/Items.context';
import { SignWithWalletModal } from '../modals/SignWithWalletModal';
import SwitchNetwork from '@/components/modals/SwitchNetwork';

export interface IHeaderButtonProps {
	isHeaderShowing: boolean;
	theme: ETheme;
}

interface IUserButtonWithMenuProps extends IHeaderButtonProps {}

export const UserButtonWithMenu: FC<IUserButtonWithMenuProps> = ({
	isHeaderShowing,
	theme,
}) => {
	const [showMenu, menuCondition, openMenu, closeMenu] = useDelayedState();
	const [signWithWallet, setSignWithWallet] = useState<boolean>(false);
	const [queueRoute, setQueueRoute] = useState<string>('');
	const [showSwitchNetwork, setShowSwitchNetwork] = useState(false);
	const router = useRouter();
	const isDesktop = useMediaQuery(device.laptopL);
	const [showSidebar, sidebarCondition, openSidebar, closeSidebar] =
		useDelayedState();

	useEffect(() => {
		if (!isHeaderShowing) {
			closeMenu();
		}
	}, [isHeaderShowing]);

	const props = isDesktop
		? {
				onMouseEnter: () => openMenu(),
				onMouseLeave: () => closeMenu(),
		  }
		: { onClick: openSidebar };

	return (
		<MenuAndButtonContainer {...props}>
			<WalletButton outline theme={theme} isHover={showMenu}>
				<HeaderUserButton />
				<CoverLine theme={theme} className='cover-line' />
			</WalletButton>
			{menuCondition && (
				<MenuContainer isAnimating={showMenu} theme={theme}>
					<ItemsProvider close={closeMenu}>
						<UserItems
							setQueueRoute={setQueueRoute}
							setSignWithWallet={setSignWithWallet}
						/>
					</ItemsProvider>
				</MenuContainer>
			)}
			{sidebarCondition && (
				<SideBar
					close={closeSidebar}
					isAnimating={showSidebar}
					direction={ESideBarDirection.Right}
					header={
						<>
							<FlexSpacer />
							<HeaderSidebarButtonWrapper>
								<HeaderUserButton />
							</HeaderSidebarButtonWrapper>
						</>
					}
				>
					<SidebarInnerContainer>
						<ItemsProvider close={closeSidebar}>
							<UserItems
								setQueueRoute={setQueueRoute}
								setSignWithWallet={setSignWithWallet}
							/>
						</ItemsProvider>
					</SidebarInnerContainer>
				</SideBar>
			)}
			{signWithWallet && (
				<SignWithWalletModal
					callback={() => {
						router.push(queueRoute);
						setQueueRoute('');
						closeSidebar();
						closeMenu();
					}}
					setShowModal={() => {
						setSignWithWallet(false);
						setQueueRoute('');
					}}
				/>
			)}
			{showSwitchNetwork && (
				<SwitchNetwork setShowModal={setShowSwitchNetwork} />
			)}
		</MenuAndButtonContainer>
	);
};

const HeaderUserButton = ({}) => {
	const { address } = useAccount();
	const { userData } = useAppSelector(state => state.user);
	const { formatMessage } = useIntl();
	const { chain } = useNetwork();
	return (
		<HBContainer>
			<HBPic
				src={userData?.avatar || PROFILE_PHOTO_PLACEHOLDER}
				alt='Profile Pic'
				width={'24px'}
				height={'24px'}
			/>
			<WBInfo>
				<UserName size='Medium'>
					{userData?.name || shortenAddress(address)}
				</UserName>
				<WBNetwork size='Tiny'>
					{formatMessage({
						id: 'label.connected_to',
					})}{' '}
					{chain?.name}
				</WBNetwork>
			</WBInfo>
		</HBContainer>
	);
};
