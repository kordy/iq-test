import React from 'react';
import './Dropdown.styl';
import DropdownDesktop from './DropdownDesktop.jsx';
import DropdownMobile from './DropdownMobile.jsx';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: null,
      selectedName: '',
    };
  }

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
        { !isMobile ? <DropdownDesktop {...propsToPass} /> : <DropdownMobile {...propsToPass} /> }
      </div>
    );
  }
}

export default Dropdown;