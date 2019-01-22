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
      width: '250px',
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
      event.target.classList.contains('Feedback-Box') ||
      event.target.classList.contains('Box')
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

    if (!event.target.classList.contains('Box') && !this.state.expanded) {
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

    if (event.target.classList.contains('Box')) {
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
      <div className="Header-Container">
        <div className="Header-Left">
          <div className="Flex" style={{ '--row': '1' }}>
            <div
              className="Logo-Header Justify Align Flex"
              style={{
                '--align': 'center',
                '--size': '26px',
                '--justify': 'center'
              }}
            >
              <span className="Theme-Yellow">Squad</span>
              <span className="Theme-White">Up</span>
            </div>
          </div>
        </div>
        <div className="Header-Right">
          <div className="Header-Nav-Wrapper">
            <Paper className="Feedback-Wrapper Feedback-Box">
              <div className="Feedback-Row Feedback-Box">
                {!this.state.expanded && <Megaphone />}
                <TextareaAutosize
                  placeholder={this.state.placeholder}
                  style={this.state.navStyle}
                  rows={this.state.rows}
                  onChange={this.onChange}
                  value={this.state.feedback}
                  className="Feedback-Box "
                />
              </div>
              {this.state.expanded && (
                <div className="Feedback-Submit Feedback-Fox Card-Text-Link">
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
