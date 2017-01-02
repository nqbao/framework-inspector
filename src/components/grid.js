import { Component } from 'preact';
import AppIcon from './icon';

export default class Grid extends Component {
  render({ apps, openTab }, state) {

    return (
      <div style={{ marginTop: '8px' }}>
        {Object.keys(apps).map(
          name => <AppIcon name={name} openTab={openTab} {...apps[name]} />
        )}
      </div>
    );
  }
}
