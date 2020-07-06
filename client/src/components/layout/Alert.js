import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Alert = ({alerts}) => {
    return (
        <div>
            {alerts.map((alert) => <div> {alert.msg} </div>)}
        </div>
    )
}

Alert.propTypes = {
    alerts: PropTypes.array

}
const mapStateToProp = state => ({
    alerts: state.alert
})

export default connect(mapStateToProp)(Alert)
