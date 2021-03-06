/**
 * PhaseStatus
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const statusDisplay = {
    SUCCEEDED: { icon: 'fas fa-check', color: '#28a745' },
    FAILED: { icon: 'fas fa-times', color: '#dc3545' },
    FAULT: { icon: 'fas fa-times', color: '#dc3545' },
    TIMED_OUT: { icon: 'far fa-clock', color: '#dc3545' },
    IN_PROGRESS: { icon: 'fas fa-hourglass-start', color: '#17a2b8' },
    STOPPED: { icon: 'fas fa-stop-circle', color: '#dc3545' },
    '': { icon: 'fas fa-question-circle', color: '#333333' },
};

export function getStatusColor(status) {
    return (statusDisplay[status] || statusDisplay['']).color || null;
}

export function getStatusIcon(status) {
    return (statusDisplay[status] || statusDisplay['']).icon || null;
}

function PhaseStatus({ status }) {
    const { icon, color } = statusDisplay[status] || statusDisplay[''];

    return (
        <span style={{ color }}>
            {icon && <i className={`${icon} fa-fw mr-1`}/>}
            {status ? <FormattedMessage
                {...messages.phaseStatus}
                values={{ status: status }}
            /> : '-'}
        </span>
    );
}

PhaseStatus.propTypes = {
    status: PropTypes.string,
};

PhaseStatus.defaultProps = {
    status: null,
};

export default PhaseStatus;
