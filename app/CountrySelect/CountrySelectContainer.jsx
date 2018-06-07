import { connect } from 'react-redux';
import React from 'react';
import { fetchCountries, setCountry } from './countrySelectActions';
import { getSortedCountries } from './countrySelectSelector';
import Dropdown from '../Dropdown/Dropdown.jsx';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
    options: getSortedCountries(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCountries() {
      dispatch(fetchCountries());
    },
    onChange(id) {
      dispatch(setCountry(id));
    }
  };
}

class CountrySelectContainer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCountries();
  }

  render() {
    return <Dropdown {...this.props} placeholder="Выберите страну" />
  }
}

CountrySelectContainer.propTypes = {
    fetchCountries: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelectContainer);
