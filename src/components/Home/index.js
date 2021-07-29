import React, { Component } from 'react';
import { compose } from 'recompose';
import JSONPretty from 'react-json-pretty';
var JSONPrettyMon = require('react-json-pretty/dist/adventure_time');

import { withAuthorization, withEmailVerification } from '../Session';
const appToken = "authUser";


const HomePage = () => (
  <HomePageCom />
);

class HomePageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem(appToken)
    };
  }
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <JSONPretty id="json-pretty" data={this.state.token && this.state.token} theme={JSONPrettyMon}></JSONPretty>
      </div >
    );
  }
};
const condition = authUser => !!authUser;

const HomePageCom = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageForm);

export default HomePage;

export { HomePageCom };