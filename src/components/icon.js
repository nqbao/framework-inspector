import { Component } from 'preact';

export default class AppIcon extends Component {
  handleLinkClick = () => {
    this.props.openTab(this.props.url);
  };

  render({ name, title, icon, url, openTab, size }, state) {
    const iconSize = size || 32;

    return (
      <div style={{ display: 'inline-block', padding: '0 6px 6px 0' }}>
        <a onClick={this.handleLinkClick} title={title || name} target='_self' style={{ cursor: 'pointer' }}>
          <img alt={title || name} src={`apps/${icon}`} width={iconSize} height={iconSize} />
        </a>
      </div>
    );
  }
}
