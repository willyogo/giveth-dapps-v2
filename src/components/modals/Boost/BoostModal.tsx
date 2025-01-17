import { IconRocketInSpace32 } from '@giveth/ui-design-system';
import { FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { IModal } from '@/types/common';
import { Modal } from '../Modal';

import { useModalAnimation } from '@/hooks/useModalAnimation';
import 'rc-slider/assets/index.css';
import { ZeroGivpowerModal } from './ZeroGivpowerModal';
import { BoostModalContainer } from './BoostModal.sc';
import BoostedInnerModal from './BoostedInnerModal';
import BoostInnerModal from './BoostInnerModal';
import { useAppSelector } from '@/features/hooks';
import { getTotalGIVpower } from '@/helpers/givpower';

interface IBoostModalProps extends IModal {
	projectId: string;
}

export enum EBoostModalState {
	BOOSTING,
	BOOSTED,
	LIMIT_EXCEEDED,
}

const BoostModal: FC<IBoostModalProps> = ({ setShowModal, projectId }) => {
	const { formatMessage } = useIntl();
	const { isAnimating, closeModal } = useModalAnimation(setShowModal);
	const [percentage, setPercentage] = useState(0);
	const [state, setState] = useState(EBoostModalState.BOOSTING);
	const values = useAppSelector(state => state.subgraph);
	const givPower = getTotalGIVpower(values);

	if (givPower.total.isZero()) {
		return <ZeroGivpowerModal setShowModal={setShowModal} />;
	}

	const title = () => {
		switch (state) {
			case EBoostModalState.BOOSTING:
				return formatMessage({ id: 'label.boost' });
			case EBoostModalState.LIMIT_EXCEEDED:
				return formatMessage({ id: 'label.oh_no' });
			case EBoostModalState.BOOSTED:
				return formatMessage({ id: 'label.well_done' });
			default:
				return formatMessage({ id: 'label.boost' });
		}
	};

	return (
		<Modal
			closeModal={closeModal}
			isAnimating={isAnimating}
			headerTitlePosition={'left'}
			headerTitle={title()}
			headerIcon={<IconRocketInSpace32 />}
		>
			<BoostModalContainer state={state} data-testid='boost-modal'>
				{state === EBoostModalState.BOOSTING ||
				state === EBoostModalState.LIMIT_EXCEEDED ? (
					<BoostInnerModal
						totalGIVpower={givPower.total}
						setPercentage={setPercentage}
						state={state}
						setState={setState}
						// TODO: Create Project context
						projectId={projectId}
						setShowModal={setShowModal}
					/>
				) : (
					<BoostedInnerModal
						percentage={percentage}
						closeModal={closeModal}
					/>
				)}
			</BoostModalContainer>
		</Modal>
	);
};

export default BoostModal;
