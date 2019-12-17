import * as React from "react";

import styles from './index.css';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'doing request...',
    };
  }

  componentWillMount() {
    fetch('/api/test1')
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(res => {
        this.setState({
          title: `value from mock: ${res.foo}`,
        })
      });
  }

  render() {
    return (
      <div className={styles.normal}>
        <p>{this.state.title}</p>
      </div>
    );
  }
}
