import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import log from '../lib/log';
import CustomExtensionModalComponent from '../components/tw-custom-extension-modal/custom-extension-modal.jsx';
import {closeCustomExtensionModal} from '../reducers/modals';

class CustomExtensionModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeURL',
            'handleClose',
            'handleKeyDown',
            'handleLoadExtension'
        ]);
        this.state = {
            url: ''
        };
    }
    handleChangeURL (e) {
        this.setState({
            url: e.target.value
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
    handleLoadExtension () {
        this.handleClose();
        this.props.vm.extensionManager.loadExtensionURL(this.state.url)
            .then(() => {
                // Loaded successfully
            })
            .catch(err => {
                log.error(err);
                // eslint-disable-next-line no-alert
                alert(err);
            });
    }
    render () {
        return (
            <CustomExtensionModalComponent
                onChangeURL={this.handleChangeURL}
                onClose={this.handleClose}
                onKeyDown={this.handleKeyDown}
                onLoadExtension={this.handleLoadExtension}
                url={this.state.url}
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
