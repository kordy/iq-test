import React from 'react';
import './Dropdown.styl';
import classnames from 'classnames';
import DropdownList from './DropdownList';
import ReactDOM from 'react-dom';
import { getFilteredList } from './dropdownHelpers';
import PropTypes from 'prop-types';

class DropdownDesktop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isOpen: false,
      isReverse: false,
      list: props.options,
      activeOption: null,
      listPixelSize: 0
    };
    this.closeTimeOut = null;
    this.containerRef = null;
    this.listRef = null;
    this.inputRef = null;
    this.listItemsRef = {}
  }

  // we updating size of select after mount and after options change
  componentDidMount() {
    if (this.props.options) this.setListPixelSize(this.props.options);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.setListPixelSize(this.props.options);
    }
  }

  setListPixelSize = (list) => {
    const div = document.createElement('div');
    div.classList.add('hidden-container');
    let listRef = null;
    // render DropdownList to get it size
    ReactDOM.render(
      <DropdownList
        setActiveOption={() => {}}
        listItemRef={() => {}}
        onSelect={()=>{}}
        isOpen
        list={list}
        listRef={node => listRef = node}
      />, div, () => {
        document.body.appendChild(div);
        this.setState({ listPixelSize: listRef.clientHeight });
        document.body.removeChild(div);
      });
  };

  checkAvailablePlace = () => {
    // check: is there enough room for a list of options?
    const height = this.state.listPixelSize;
    const screenTop = this.containerRef.getBoundingClientRect().bottom + (window.scrollY || window.pageYOffset);
    return (window.innerHeight - screenTop) > height;
  };

  onInputChange = ({ target }) => {
    this.setState({
      inputValue: target.value,
      list: getFilteredList(this.props.options, target.value),
      activeOption: null
    })
  };

  showOptionList = () => {
    clearTimeout(this.closeTimeOut);
    if (!this.state.isOpen) {
      const isReverse = !this.checkAvailablePlace();
      this.setState({
        inputValue: '',
        isOpen: true,
        list: this.props.options,
        isReverse
      })
    }
  };

  onInputBlur = () => {
    // close if next focus will not at current dropdown
    this.closeTimeOut = setTimeout(() => this.closeList(), 0);
  };

  closeList = () => {
    clearTimeout(this.closeTimeOut);
    this.setState({
      isOpen: false,
      activeOption: null,
      list: this.props.options,
      inputValue: this.props.selectedName
    })
  };

  onSelect = (id, name) => {
    this.setState({
      inputValue: name,
      activeOption: null,
      isOpen: false
    });
    this.props.onChange(id, name);
  };

  setActiveOption = (activeOption) => {
    this.setState({ activeOption })
  };

  scrollIfNeeded = ({ id }) => {
    // check that active option is visible now, and scroll to it if that`s wrong
    const dropdownNode = this.listRef;
    if (!this.listRef) return;
    const focusedItemNode = this.listItemsRef[id];
    const scrollTop = dropdownNode.scrollTop;
    const scrollBottom = scrollTop + dropdownNode.offsetHeight;
    const optionTop = focusedItemNode.offsetTop;
    const optionBottom = optionTop + focusedItemNode.offsetHeight;
    if (scrollTop > optionTop) {
      dropdownNode.scrollTop = focusedItemNode.offsetTop;
    } else if(scrollBottom < optionBottom) {
      dropdownNode.scrollTop = optionBottom - dropdownNode.offsetHeight
    }
  };

  updateActiveOption = (keyCode) => {
    // update current active option after keyboard arrows press
    const { list, activeOption } = this.state;
    let nextActiveOption = null;
    const activeIndex = activeOption ? list.findIndex(({ id }) => id === activeOption.id) : -1;
    if (activeIndex < 0) {
      nextActiveOption = list[0];
    } else if (keyCode === 38) {
      nextActiveOption = activeIndex <= 0 ? list[list.length - 1] : list[activeIndex - 1];
    } else if (keyCode === 40) {
      nextActiveOption = activeIndex >= list.length - 1 ? list[0] : list[activeIndex + 1];
    }
    this.setActiveOption(nextActiveOption);
    if (nextActiveOption) this.scrollIfNeeded(nextActiveOption);
  };

  onEnter = () => {
    const { activeOption } = this.state;
    // select active option after keyboard enter press
    if (activeOption) {
      const { id, name } = activeOption;
      this.onSelect(id, name)
    }
  };

  onKeyDown = ({ keyCode }) => {
    if (!this.state.isOpen) {
      // show list option if we have focus on dropdown, but list is hidden (after selecting option)
      this.showOptionList();
    }
    if (keyCode === 38 || keyCode === 40) {
      // set focus to dropdown container on arrow up/down keys
      this.containerRef.focus();
      this.updateActiveOption(keyCode);
    } else if (keyCode === 13) {
      this.onEnter();
    } else if (
      (keyCode >= 48 && keyCode <= 90) ||
      (keyCode >= 186 && keyCode <= 222) ||
      (keyCode >= 96 && keyCode <= 105)
    ) {
      // set focus to input if user start typing
      this.inputRef.focus();
    }
  };

  onArrowClick = (e) => {
    if (!this.state.isOpen) {
      this.inputRef.focus();
    } else {
      this.containerRef.focus();
      this.closeList();
    }
    // preventing focus event after arrow click and make focus manually for change event order
    e.stopPropagation();
    e.preventDefault();
  };

  getItemRefs = (node, id) => this.listItemsRef[id] = node;

  render() {
    const { placeholder } = this.props;
    const list = this.state.list;
    return (
      <div
        className={classnames('Dropdown__wrap', {
          'Dropdown__wrap_open': this.state.isOpen,
          'Dropdown__wrap_reverse': this.state.isOpen && this.state.isReverse
        })}
        tabIndex={0}
        ref={containerRef => this.containerRef = containerRef}
        onFocus={this.showOptionList}
        onBlur={this.onInputBlur}
        onKeyDown={this.onKeyDown}

      >
        <label className="Dropdown-input">
          <div
            className={classnames('Dropdown-input__placeholder', {
              'Dropdown-input__placeholder_open': this.state.isOpen || this.state.inputValue || this.props.selectedID
            })}
          >{ placeholder }</div>
          <input
            ref={(node) => this.inputRef = node}
            className="Dropdown-input__input"
            placeholder={this.props.selectedName}
            value={this.state.inputValue}
            onChange={this.onInputChange}
          />
        </label>
        {
          <DropdownList
            isOpen={this.state.isOpen}
            listRef={(node) => this.listRef = node}
            listItemRef={this.getItemRefs}
            currentTextValue={this.state.inputValue}
            onSelect={this.onSelect}
            list={list}
            activeOption={this.state.activeOption}
            setActiveOption={this.setActiveOption}
          />
        }
        <div
          className={classnames('Dropdown__arrow', {
            'Dropdown__arrow_reverse': this.state.isOpen && this.state.isReverse
          })}
          onMouseDown={this.onArrowClick}
        />
      </div>
    );
  }
}

DropdownDesktop.propTypes = {
  selectedName: PropTypes.string,
  selectedID: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }))
};

DropdownDesktop.defaultProps = {
  selectedName: null,
  selectedID: null,
  options: null
};

export default DropdownDesktop;
