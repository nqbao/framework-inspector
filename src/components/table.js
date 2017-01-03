import { Component } from 'preact';

export default class AppTableList extends Component {
  renderRow = (name, { title, icon, version }) => {
    const fullTitle = title || name;

    return (
      <tr key={name}>
        <td>
          <img width={16} height={16} src={`apps/${icon}`} alt={fullTitle} />
          &nbsp;<span>{fullTitle}</span>
        </td>
        <td>
          {version !== -1 ? version : '-'}
        </td>
      </tr>
    )
  };

  render({ apps }, state) {
    return (
      <div style={{ marginTop: '8px' }}>
        <table width='100%'>
          <thead>
            <tr>
              <th width='30%'>Name</th>
              <th width='70%'>Version</th>
            </tr>
          </thead>
          <tbody>
          {
            Object.keys(apps).map(name => this.renderRow(name, apps[name]))
          }
          </tbody>
        </table>
      </div>
    );
  }
}
