import { Component } from 'preact';
import AppIcon from './app-icon';

export default class App extends Component {
  render(props, state) {
    const apps = props.apps;
    const openTab = props.openTab;

    if (apps === null || apps === undefined) {
      return (
        <div>
          Analyzing ...
        </div>
      );
    } else if (Object.keys(apps).length === 0) {
      return (
        <div>
          We are unable to detect any framework on this site.
        </div>
      );
    }

    return (
      <div>
        We found the following frameworks and tools available on this site:
        <div style={{ marginTop: '8px' }}>
          {Object.keys(apps).map(
            name => <AppIcon name={name} openTab={openTab} {...apps[name]} />
          )}
        </div>
      </div>
    );
  }
}
