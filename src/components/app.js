import { Component } from 'preact';
// import Grid from './grid';
import Table from './table';
import './style.css';

export default class App extends Component {
  render(props, state) {
    const apps = props.apps;
    const numApps = apps ? Object.keys(apps).length : 0;

    if (apps === null || apps === undefined) {
      return (
        <div>
          Analyzing ...
        </div>
      );
    } else if (numApps === 0) {
      return (
        <div>
          We are unable to detect any framework or tool on this site.
        </div>
      );
    }

    return (
      <div>
        We found {numApps > 1 ? `${numApps} frameworks or tools` : '1 framework or tool'} available on this site:
        <Table {...props} />
      </div>
    );
  }
}
