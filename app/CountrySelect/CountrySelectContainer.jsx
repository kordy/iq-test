import { connect } from 'react-redux';
import React from 'react';
import { fetchCountries, setCountry } from './countrySelectActions';
import { getSortedCountries, getIsFetched } from './countrySelectSelector';
import Dropdown from '../Dropdown/Dropdown.jsx';

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile,
    options: getSortedCountries(state),
    isFetched: getIsFetched(state)
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
    return this.props.isFetched ? <Dropdown {...this.props} placeholder="Выберите страну" /> : null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelectContainer);
