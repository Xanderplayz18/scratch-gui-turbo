import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import log from '../lib/log';
import CustomExtensionModalComponent from '../components/tw-custom-extension-modal/custom-extension-modal.jsx';
import {closeCustomExtensionModal} from '../reducers/modals';
import {manuallyTrustExtension} from './tw-security-manager.jsx';

class CustomExtensionModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeFile',
            'handleChangeURL',
            'handleChangeUnsandboxed',
            'handleClose',
            'handleKeyDown',
            'handleLoadExtension',
            'handleSwitchToFile',
            'handleSwitchToURL'
        ]);
        this.state = {
            files: null,
            type: 'url',
            url: '',
            unsandboxed: false
        };
    }
    getExtensionURL () {
        if (this.state.type === 'url') {
            return this.state.url;
        }
        if (this.state.type === 'file') {
            return new Promise((resolve, reject) => {
                const file = this.state.files[0];
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(new Error('Could not read extension as data URL'));
                reader.readAsDataURL(file);
            });
        }
        return Promise.reject(new Error('Unknown type'));
    }
    hasValidInput () {
        if (this.state.type === 'url') {
            return !!this.state.url;
        }
        if (this.state.type === 'file') {
            return !!this.state.files;
        }
        return false;
    }
    handleChangeFile (e) {
        this.setState({
            files: e.target.files
        });
    }
    handleChangeURL (e) {
        this.setState({
            url: e.target.value
        });
    }
    handleChangeUnsandboxed (e) {
        this.setState({
            unsandboxed: e.target.checked
        });
    }
    handleClose () {
        this.props.onClose();
    }
    handleKeyDown (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleLoadExtension();
        }
    }
    async handleLoadExtension () {
        this.handleClose();
        try {
            const url = await this.getExtensionURL();
            if (this.state.unsandboxed) {
                manuallyTrustExtension(url);
            }
            await this.props.vm.extensionManager.loadExtensionURL(url);
        } catch (err) {
            log.error(err);
            // eslint-disable-next-line no-alert
            alert(err);
        }
    }
    handleSwitchToFile () {
        this.setState({
            type: 'file',
            files: null
        });
    }
    handleSwitchToURL () {
        this.setState({
            type: 'url'
        });
    }
    render () {
        return (
            <CustomExtensionModalComponent
                canLoadExtension={this.hasValidInput()}
                onChangeFile={this.handleChangeFile}
                onChangeURL={this.handleChangeURL}
                onChangeUnsandboxed={this.handleChangeUnsandboxed}
                onClose={this.handleClose}
                onKeyDown={this.handleKeyDown}
                onLoadExtension={this.handleLoadExtension}
                onSwitchToFile={this.handleSwitchToFile}
                onSwitchToURL={this.handleSwitchToURL}
                type={this.state.type}
                url={this.state.url}
                unsandboxed={this.state.unsandboxed}
            />
        );
    }
}

CustomExtensionModal.propTypes = {
    onClose: PropTypes.func,
    vm: PropTypes.shape({
        extensionManager: PropTypes.shape({
            loadExtensionURL: PropTypes.func
        })
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeCustomExtensionModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomExtensionModal);
