import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './custom-extension-modal.css';

const messages = defineMessages({
    title: {
        defaultMessage: 'Load Custom Extension',
        description: 'Title of custom extension menu',
        id: 'tw.customExtensionModal.title'
    }
});

const CustomExtensionModal = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel={props.intl.formatMessage(messages.title)}
        id="customExtensionModal"
    >
        <Box className={styles.body}>
            <p>
                <FormattedMessage
                    defaultMessage="Enter the URL of the extension:"
                    description="Prompt that appears in modal to add custom extension"
                    id="tw.customExtensionModal.prompt"
                />
            </p>
            <input
                className={styles.textInput}
                type="text"
                value={props.url}
                onChange={props.onChangeURL}
                onKeyDown={props.onKeyDown}
                autoFocus
            />
            <div className={styles.buttonRow}>
                <button
                    className={styles.loadButton}
                    onClick={props.onLoadExtension}
                >
                    <FormattedMessage
                        defaultMessage="Load"
                        description="Button that loads the given custom extension"
                        id="tw.customExtensionModal.load"
                    />
                </button>
            </div>
        </Box>
    </Modal>
);

CustomExtensionModal.propTypes = {
    intl: intlShape,
    onChangeURL: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onLoadExtension: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
};

export default injectIntl(CustomExtensionModal);
