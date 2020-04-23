import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 
class Alert extends React.Component {
  renderAlert(alert) {
    return (
      <div key={alert.id} className={`alert alert-${alert.alertType} mt-2`}>
        {alert.msg}
      </div>
    )
  }
  render() {
    const { alerts } = this.props;
    const activeAlerts = new Set();

    return(
      <Fragment>
        {
          alerts !== null 
          && alerts.length > 0 
          && alerts
            .filter(alert => {
              if (!activeAlerts.has(alert.msg)) {
                activeAlerts.add(alert.msg);
                return alert;
              }
              return false;
            })
            .map(alert => this.renderAlert(alert))
        }
      </Fragment>
    ) 
  }
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
