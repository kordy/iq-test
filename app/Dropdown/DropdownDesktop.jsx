import React from 'react';
import './Dropdown.styl';
import classnames from 'classnames';
import DropdownList from './DropdownList';
import ReactDOM from 'react-dom';
import { getFilteredList } from './dropdownHelpers';

class DropdownDesktop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      listShown: false,
      isReverse: false,
      list: props.options,
      cursor: null,
      listPixelSize: 0
    };
    this.closeTimeOut = null;
    this.containerRef = null;
    this.listRef = null;
    this.inputRef = null;
    this.listItemsRef = {}
  }

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
    ReactDOM.render(<DropdownList isOpen list={list} listRef={node => listRef = node} />, div, () => {
      document.body.appendChild(div);
      this.setState({ listPixelSize: listRef.clientHeight });
      document.body.removeChild(div);
    });
  };

  checkAvailablePlace = () => {
    const height = this.state.listPixelSize;
    const screenTop = this.containerRef.getBoundingClientRect().bottom + (window.scrollY || window.pageYOffset);
    return (window.innerHeight - screenTop) < height;
  };

  onInputChange = ({ target }) => {
    this.setState({
      inputValue: target.value,
      list: getFilteredList(this.props.options, target.value),
      cursor: null
    })
  };

  onInputFocus = () => {
    clearTimeout(this.closeTimeOut);
    if (!this.state.listShown) {
      const isReverse = this.checkAvailablePlace();
      this.setState({
        inputValue: '',
        listShown: true,
        list: this.props.options,
        cursor: null,
        isReverse
      })
    }
  };

  onInputBlur = () => {
    this.closeTimeOut = setTimeout(() => this.closeList(), 50);
  };

  closeList = () => {
    clearTimeout(this.closeTimeOut);
    this.setState({
      listShown: false,
      cursor: null,
      inputValue: this.props.selectedName
    })
  };

  onSelect = (id, name) => {
    this.setState({
      inputValue: name,
      cursor: null,
      listShown: false
    });
    this.props.onChange(id, name);
  };

  onChangeCursor = (i) => {
    this.setState({ cursor: i })
  };

  scrollIfNeeded = (nextCursor) => {
    const dropdownNode = this.listRef;
    if (!this.listRef) return;
    const { id } = this.state.list[nextCursor];
    const focusedItemNode = this.listItemsRef[id];
    const scrollTop = dropdownNode.scrollTop;
    const scrollBottom = scrollTop + dropdownNode.offsetHeight;
    const optionTop = focusedItemNode.offsetTop;
    const optionBottom = optionTop + focusedItemNode.offsetHeight;
    if (scrollTop > optionTop || scrollBottom < optionBottom) {
      dropdownNode.scrollTop = focusedItemNode.offsetTop;
    }
  };

  updateCursor = (keyCode) => {
    const { cursor, list } = this.state;
    let nextCursor = 0;
    if (cursor === null) {
      nextCursor = 0
    } else if (keyCode === 38 && cursor > 0) {
      nextCursor = cursor - 1;
    } else if (keyCode === 40 && cursor < list.length - 1) {
      nextCursor = cursor + 1;
    }
    this.setState({ cursor: nextCursor });
    if (nextCursor !== null) this.scrollIfNeeded(nextCursor);
  };

  onEnter = () => {
    const { cursor, list } = this.state;
    if (cursor !== null) {
      const { id, name } = list[cursor];
      this.onSelect(id, name)
    }
  };

  onKeyDown = ({ keyCode }) => {
    if (!this.state.listShown) {
      this.onInputFocus();
    }
    if (keyCode === 38 || keyCode === 40) {
      this.containerRef.focus();
      this.updateCursor(keyCode);
    } else if (keyCode === 13) {
      this.onEnter();
    } else if (keyCode !== 9) {
      this.inputRef.focus();
    }
  };

  onArrowClick = (e) => {
    if (!this.state.listShown) {
      this.inputRef.focus();
    } else {
      this.containerRef.focus();
      this.closeList();
    }
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
          'Dropdown__wrap_open': this.state.listShown,
          'Dropdown__wrap_reverse': this.state.listShown && this.state.isReverse
        })}
        tabIndex={0}
        ref={containerRef => this.containerRef = containerRef}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        onKeyDown={this.onKeyDown}

      >
        <label className="Dropdown-input">
          <div
            className={classnames('Dropdown-input__placeholder', {
              'Dropdown-input__placeholder_open': this.state.listShown || this.state.inputValue
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
            isOpen={this.state.listShown}
            listRef={(node) => this.listRef = node}
            listItemRef={this.getItemRefs}
            currentTextValue={this.state.inputValue}
            onSelect={this.onSelect}
            list={list}
            cursor={this.state.cursor}
            onChangeCursor={this.onChangeCursor}
          />
        }
        <div
          className={classnames('Dropdown__arrow', {
            'Dropdown__arrow_reverse': this.state.listShown && this.state.isReverse
          })}
          onMouseDown={this.onArrowClick}
        />
      </div>
    );
  }
}

export default DropdownDesktop;