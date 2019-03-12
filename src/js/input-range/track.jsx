import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

/**
 * @ignore
 */
export default class Track extends React.Component {
  /**
   * @override
   * @return {Object}
   * @property {Function} children
   * @property {Function} classNames
   * @property {Boolean} draggableTrack
   * @property {Function} onTrackDrag
   * @property {Function} onTrackMouseDown
   * @property {Function} percentages
   */
  static get propTypes() {
    return {
      children: PropTypes.node.isRequired,
      classNames: PropTypes.objectOf(PropTypes.string).isRequired,
      draggableTrack: PropTypes.bool,
      markers: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          percentage: PropTypes.string.isRequired,
          className: PropTypes.string,
        }),
      ),
      onTrackDrag: PropTypes.func,
      onTrackMouseDown: PropTypes.func.isRequired,
      percentages: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ).isRequired,
      styles: PropTypes.objectOf(PropTypes.shape({})),
    };
  }

  /**
   * @param {Object} props
   * @param {InputRangeClassNames} props.classNames
   * @param {Boolean} props.draggableTrack
   * @param {Function} props.onTrackDrag
   * @param {Function} props.onTrackMouseDown
   * @param {number} props.percentages
   */
  constructor(props) {
    super(props);

    /**
     * @private
     * @type {?Component}
     */
    this.node = null;
    this.trackDragEvent = null;
    this.markerRefs = [];

    this.state = {
      markerWidths: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      markerWidths: this.markerRefs.map(ref => ref.offsetWidth),
    });
  }

  /**
   * @private
   * @return {ClientRect}
   */
  getClientRect() {
    return this.node.getBoundingClientRect();
  }

  /**
   * @private
   * @return {Object} CSS styles
   */
  getActiveTrackStyle() {
    const width = `${(this.props.percentages.max - this.props.percentages.min) *
      100}%`;
    const left = `${this.props.percentages.min * 100}%`;

    return { left, width };
  }

  /**
   * Listen to mousemove event
   * @private
   * @return {void}
   */
  addDocumentMouseMoveListener() {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
  }

  /**
   * Listen to mouseup event
   * @private
   * @return {void}
   */
  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentMouseMoveListener() {
    this.node.ownerDocument.removeEventListener(
      'mousemove',
      this.handleMouseMove,
    );
  }

  /**
   * @private
   * @return {void}
   */
  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * @private
   * @param {SyntheticEvent} event
   * @return {void}
   */
  @autobind
  handleMouseMove(event) {
    if (!this.props.draggableTrack) {
      return;
    }

    if (this.trackDragEvent !== null) {
      this.props.onTrackDrag(event, this.trackDragEvent);
    }

    this.trackDragEvent = event;
  }

  /**
   * @private
   * @return {void}
   */
  @autobind
  handleMouseUp() {
    if (!this.props.draggableTrack) {
      return;
    }

    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
    this.trackDragEvent = null;
  }

  /**
   * @private
   * @param {SyntheticEvent} event - User event
   */
  @autobind
  handleMouseDown(event) {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const trackClientRect = this.getClientRect();
    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };

    this.props.onTrackMouseDown(event, position);

    if (this.props.draggableTrack) {
      this.addDocumentMouseMoveListener();
      this.addDocumentMouseUpListener();
    }
  }

  /**
   * @private
   * @param {SyntheticEvent} event - User event
   */
  @autobind
  handleTouchStart(event) {
    event.preventDefault();

    this.handleMouseDown(event);
  }

  /**
   * @override
   * @return {JSX.Element}
   */
  render() {
    const { markers } = this.props;
    const activeTrackLength = this.getActiveTrackStyle();

    const { track: trackStyle, active: activeTrack } = this.props.styles;

    const { markerWidths } = this.state;

    const activeTrackStyle = {
      ...activeTrack,
      ...activeTrackLength,
    };

    return (
      <div
        className={this.props.classNames.track}
        style={trackStyle}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        ref={(node) => {
          this.node = node;
        }}>
        <div
          style={activeTrackStyle}
          className={this.props.classNames.activeTrack}/>
        {markers &&
          markers.map((marker, idx) => {
            let left = marker.percentage * 100;
            if (markerWidths.length) {
              left = `calc(${marker.percentage * 100}% - ${Math.round(
                markerWidths[idx] / 2,
              )}px)`;
            }
            return (
              <span
                key={marker.percentage}
                ref={markerSpan => this.markerRefs.push(markerSpan)}
                className={marker.class}
                id={marker.id}
                onClick={(e) => {
                  e.stopPropagation();
                  marker.onClick(marker);
                }}
                style={{
                  position: 'absolute',
                  left,
                  textAlign: 'center',
                }}>
                {marker.content}
              </span>
            );
          })}
        {this.props.children}
      </div>
    );
  }
}
