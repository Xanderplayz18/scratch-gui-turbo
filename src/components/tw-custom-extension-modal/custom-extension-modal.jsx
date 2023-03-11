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
            <div className={styles.typeSelectorContainer}>
                <div
                    className={styles.typeSelector}
                    data-active={props.type === 'url'}
                    onClick={props.onSwitchToURL}
                    tabIndex={0}
                >
                    {'URL'}
                </div>
                <div
                    className={styles.typeSelector}
                    data-active={props.type === 'file'}
                    onClick={props.onSwitchToFile}
                    tabIndex={0}
                >
                    <FormattedMessage
                        defaultMessage="File"
                        description="Button to choose to load an extension from a local file"
                        id="tw.customExtensionModal.file"
                    />
                </div>
            </div>

            {props.type === 'url' ? (
                <React.Fragment key={props.type}>
                    <p>
                        <FormattedMessage
                            defaultMessage="Enter the URL of the extension:"
                            description="Label that when loading custom extension by URL"
                            id="tw.customExtensionModal.promptURL"
                        />
                    </p>
                    <input
                        type="text"
                        className={styles.urlInput}
                        value={props.url}
                        onChange={props.onChangeURL}
                        onKeyDown={props.onKeyDown}
                        placeholder="https://"
                        autoFocus
                    />
                    <p>
                        <FormattedMessage
                            defaultMessage="If you're not sure what to put here, {gallery} is a great place to start."
                            // eslint-disable-next-line max-len
                            description="Message in custom extension modal that describes where to find custom extension URLs"
                            id="tw.customExtensionModal.where"
                            values={{
                                gallery: (
                                    <a
                                        href="https://extensions.turbowarp.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {'extensions.turbowarp.org'}
                                    </a>
                                )
                            }}
                        />
                    </p>
                </React.Fragment>
            ) : (
                <React.Fragment key={props.type}>
                    <p>
                        <FormattedMessage
                            defaultMessage="Select extension file:"
                            description="Prompt that appears when loading custom extension from a local file"
                            id="tw.customExtensionModal.promptFile"
                        />
                    </p>
                    <input
                        type="file"
                        accept=".js"
                        className={styles.fileInput}
                        onChange={props.onChangeFile}
                    />
                </React.Fragment>
            )}

            <label
                className={styles.unsandboxedContainer}
            >
                <input
                    type="checkbox"
                    onChange={props.onChangeUnsandboxed}
                    checked={props.unsandboxed}
                />
                {' '}
                <FormattedMessage
                    defaultMessage="Force load unsandboxed"
                    description="Checkbox to load a custom extension without the sandbox"
                    id="tw.customExtensionModal.unsandboxed"
                />
            </label>

            {props.unsandboxed && (
                <p className={styles.danger}>
                    <FormattedMessage
                        defaultMessage="Loading extensions as unsandboxed is dangerous."
                        description="Message explainin why enabling the unsandboxed checkbox is dangerous"
                        id="tw.customExtensionModal.unsandboxedDanger"
                    />
                </p>
            )}

            <div className={styles.buttonRow}>
                <button
                    className={styles.loadButton}
                    onClick={props.onLoadExtension}
                    disabled={!props.canLoadExtension}
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
    canLoadExtension: PropTypes.bool.isRequired,
    onChangeFile: PropTypes.func.isRequired,
    onChangeURL: PropTypes.func.isRequired,
    onChangeUnsandboxed: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onLoadExtension: PropTypes.func.isRequired,
    onSwitchToFile: PropTypes.func.isRequired,
    onSwitchToURL: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['url', 'file']).isRequired,
    url: PropTypes.string.isRequired,
    unsandboxed: PropTypes.bool.isRequired
};

export default injectIntl(CustomExtensionModal);
