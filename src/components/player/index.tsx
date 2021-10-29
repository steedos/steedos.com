import { string } from 'prop-types';
import React from 'react';
import ReactPlayer from 'react-player'
import { isString } from 'lodash'

class Player extends React.Component {
  static propTypes = {
    hls_url: string,
    light: string,
    dash_url: string,
    width: string,
    height: string,
    subtitlesUrl: string,
  };
  render() {
    const { hls_url, ...options } = this.props as any
    let playing = false;
    if(isString(options.light)){
      playing = true;
    }
    return (
      <ReactPlayer controls={true} url={hls_url} playing={playing} {...options} />
    )
  }
}

export { Player };