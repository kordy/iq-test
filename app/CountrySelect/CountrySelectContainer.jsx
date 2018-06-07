import { connect } from 'react-redux';
import React from 'react';
import { fetchCountries, setCountry } from './countrySelectActions';
import { getSortedCountries, getIsPending } from './countrySelectSelector';
import Dropdown from '../Dropdown/Dropdown.jsx';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
    options: getSortedCountries(state),
    isPending: getIsPending(state)
  };
}

const mapDispatchToProps = {
  fetchCountries,
  onChange: setCountry
};

class CountrySelectContainer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCountries();
  }

  render() {
    const { isMobile, options, isPending } = this.props;
    return <Dropdown isMobile={isMobile} options={options} isPending={isPending} placeholder="Выберите страну" />
  }
}

CountrySelectContainer.propTypes = {
    fetchCountries: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelectContainer);
