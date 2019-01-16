import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from 'react-autosize-textarea';
import Megaphone from '../../assets/icons/basic/megaphone';

class Navbar extends React.Component {
  state = {
    expanded: false,
    submit: false,
    rows: 1,
    feedback: '',
    placeholder: 'Have any feedback?',
    value: '',
    navStyle: {
      fontFamily: 'HurmeGeometricSans1-Regular',
      border: 'unset',
      outline: 'unset',
      resize: 'none',
      borderRadius: '3px',
      fontSize: '14px',
      color: '#838383',
      width: '300px',
      zIndex: 1,
      lineHeight: '30px',
      marginLeft: '15px',
      paddingRight: '30px'
    }
  };

  componentDidMount() {
    document.body.addEventListener('click', this.handleOnClick);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOnClick);
  }

  isFeedbackComponent = event => {
    if (
      event.target.classList.contains('feedback-box') ||
      event.target.classList.contains('box')
    ) {
      return true;
    }
    return false;
  };

  handleOnClick = event => {
    if (!this.isFeedbackComponent(event)) {
      this.onBlur(event);
    } else {
      this.onClick(event);
    }
  };

  onClick = event => {
    event.preventDefault();
    var navStyle = { ...this.state.navStyle };
    navStyle.lineHeight = '20px';
    navStyle.marginTop = '20px';

    if (!event.target.classList.contains('box') && !this.state.expanded) {
      let temp = this.state.value;
      this.setState({
        rows: 4,
        feedback: temp,
        expanded: true,
        navStyle: navStyle
      });
    }
  };

  onBlur = event => {
    event.preventDefault();
    var navStyle = { ...this.state.navStyle };
    navStyle.lineHeight = '30px';
    navStyle.marginTop = '0px';

    if (event.target.classList.contains('box')) {
      return;
    }
    let temp = this.state.feedback;
    this.setState({
      rows: 1,
      value: this.state.feedback,
      feedback: '',
      expanded: false,
      navStyle: navStyle
    });
  };

  onChange = event => {
    let input = event.target.value;
    this.setState({ feedback: input });
  };

  render() {
    return (
      <div class="header-container">
        <div class="header-left" />
        <div class="header-right">
          <div class="header-nav-wrapper">
            <Paper className="feedback-wrapper feedback-box">
              <div class="feedback-row feedback-box">
                {!this.state.expanded && <Megaphone />}
                <TextareaAutosize
                  placeholder={this.state.placeholder}
                  style={this.state.navStyle}
                  rows={this.state.rows}
                  onChange={this.onChange}
                  value={this.state.feedback}
                  class="feedback-box "
                />
              </div>
              {this.state.expanded && (
                <div class="feedback-submit feedback-box card-text-link">
                  Submit
                </div>
              )}
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
