import React from 'react';
import './Dropdown.styl';
import DropdownDesktop from './DropdownDesktop.jsx';
import DropdownMobile from './DropdownMobile.jsx';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      selectedName: '',
    };
  }

  onChange = (id, name) => {
    this.setState({
      selectedId: id,
      selectedName: name
    });
    if (this.props.onChange) this.props.onChange(id, name);
  };

  render() {
    const { isMobile, ...props } = this.props;
    const propsToPass = {
      ...props,
      onChange: this.onChange,
      selectedId: this.state.selectedId,
      selectedName: this.state.selectedName
    };

    return (
      <div className="Dropdown">
        { !isMobile ? <DropdownDesktop {...propsToPass} /> : <DropdownMobile {...propsToPass} /> }
      </div>
    );
  }
}

Dropdown.propTypes = {
    onChange: PropTypes.func,
    isMobile: PropTypes.bool.isRequired
};

Dropdown.defaultProps = {
    onChange: null,
};


export default Dropdown;