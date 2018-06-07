import React from 'react';
import './Dropdown.styl';
import DropdownDesktop from './DropdownDesktop.jsx';
import DropdownMobile from './DropdownMobile.jsx';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedID: null,
      selectedName: '',
      isSetInitialValue: false
    };
  };

  componentDidMount() {
    if (this.props.initialValue) this.setInitialOption();
  };

  componentDidUpdate() {
    if (!this.state.isSetInitialValue) this.setInitialOption();
  };

  setInitialOption = () => {
    const { initialValue, options } = this.props;
    const { isSetInitialValue } = this.state;
    if (initialValue && !isSetInitialValue && options && options.length) {
      const selected = options.find(({ id }) => id === initialValue);
      this.setState({ isSetInitialValue: true });
      if (selected) this.onChange(selected.id, selected.name);
    }
  };

  onChange = (id, name) => {
    this.setState({
      selectedID: id,
      selectedName: name
    });
    if (this.props.onChange) this.props.onChange(id, name);
  };

  render() {
    const { isMobile, ...props } = this.props;
    const propsToPass = {
      ...props,
      onChange: this.onChange,
      selectedID: this.state.selectedID,
      selectedName: this.state.selectedName
    };

    return (
      <div className="Dropdown">
        { true || !isMobile ? <DropdownDesktop {...propsToPass} /> : <DropdownMobile {...propsToPass} /> }
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