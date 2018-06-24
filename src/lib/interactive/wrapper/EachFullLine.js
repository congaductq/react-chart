import React, { Component } from "react";
import PropTypes from "prop-types";

import { isDefined, noop } from "../../utils";
import { getXValue } from "../../utils/ChartDataUtil";
import { saveNodeType, isHover } from "../utils";

import ClickableCircle from "../components/ClickableCircle";
import FullLineComponent from "../components/FullLine";
import HoverTextNearMouse from "../components/HoverTextNearMouse";

class FullLine extends Component {
	constructor(props) {
		super(props);

		this.handleLineDrag = this.handleLineDrag.bind(this);

		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleChannelDrag = this.handleChannelDrag.bind(this);

		this.getEdgeCircle = this.getEdgeCircle.bind(this);
		this.handleHover = this.handleHover.bind(this);

		this.isHover = isHover.bind(this);
		this.saveNodeType = saveNodeType.bind(this);
		this.nodes = {};

		this.state = {
			hover: false,
		};
	}
	handleHover(moreProps) {
		console.log('hov')
		if (this.state.hover !== moreProps.hovering) {
			this.setState({
				hover: moreProps.hovering
			});
		}
	}
	handleDragStart() {
		const {
			startXY
		} = this.props;

		this.dragStart = {
			startXY
		};
	}
	handleChannelDrag(moreProps) {
		console.log('dr')
		const { index, onDrag } = this.props;

		const {
			startXY
		} = this.dragStart;

		const { xScale, chartConfig: { yScale }, xAccessor, fullData } = moreProps;
		const { startPos, mouseXY } = moreProps;

		const x1 = xScale(startXY[0]);
		const y1 = yScale(startXY[1]);

		const dx = startPos[0] - mouseXY[0];
		const dy = startPos[1] - mouseXY[1];

		const newX1Value = getXValue(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);
		const newY1Value = yScale.invert(y1 - dy);

		onDrag(index, {
			startXY: [newX1Value, newY1Value],
		});
	}
	handleLineDrag(moreProps) {
		console.log('ld')
		const { index, onDrag } = this.props;
		const {
			startXY,
		} = this.dragStart;

		const {
			startPos, mouseXY, xAccessor,
			xScale, fullData,
			chartConfig: { yScale }
		} = moreProps;

		const dx = startPos[0] - mouseXY[0];
		const dy = startPos[1] - mouseXY[1];

		const x1 = xScale(startXY[0]);
		const y1 = yScale(startXY[1]);

		const newX1Value = getXValue(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);
		const newY1Value = yScale.invert(y1 - dy);

		onDrag(index, {
			startXY: [newX1Value, newY1Value],
		});
	}
	getEdgeCircle({ xy, dragHandler, cursor, fill, edge }) {
		const { hover } = this.state;
		const { appearance } = this.props;
		const { edgeStroke, edgeStrokeWidth, r } = appearance;
		const { selected } = this.props;
		const { onDragComplete } = this.props;

		return <ClickableCircle
			ref={this.saveNodeType(edge)}

			show={selected || hover}
			cx={xy[0]}
			cy={xy[1]}
			r={r}
			fill={fill}
			stroke={edgeStroke}
			strokeWidth={edgeStrokeWidth}
			interactiveCursorClass={cursor}

			onDragStart={this.handleDragStart}
			onDrag={dragHandler}
			onDragComplete={onDragComplete} />;
	}
	render() {
		const { startXY } = this.props;
		const { interactive, hoverText, appearance } = this.props;
		const {
			edgeFill,
			stroke, strokeWidth, strokeOpacity,
			fill, fillOpacity,
		} = appearance;
		const { selected } = this.props;
		const { onDragComplete } = this.props;
		const { hover } = this.state;
		const { enable: hoverTextEnabled, ...restHoverTextProps } = hoverText;

		const hoverHandler = interactive
			? { onHover: this.handleHover, onUnHover: this.handleHover }
			: {};

		const line1Edge = isDefined(startXY)
			? <g>
				{this.getEdgeCircle({
					xy: startXY,
					dragHandler: this.handleLineDrag,
					cursor: "react-stockcharts-move-cursor",
					fill: edgeFill,
					edge: "edge",
				})}
			</g>
			: null;
		return <g>
			<FullLineComponent
				ref={this.saveNodeType("channel")}
				selected={selected || hover}

				{...hoverHandler}

				startXY={startXY}
				stroke={stroke}
				strokeWidth={(hover || selected) ? strokeWidth + 1 : strokeWidth}
				strokeOpacity={strokeOpacity}
				fill={fill}
				fillOpacity={fillOpacity}
				interactiveCursorClass="react-stockcharts-move-cursor"
				onDragStart={this.handleDragStart}
				onDrag={this.handleChannelDrag}
				onDragComplete={onDragComplete}
			/>
			{line1Edge}
			<HoverTextNearMouse
				show={hoverTextEnabled && hover && !selected}
				{...restHoverTextProps} />
		</g>;
	}
}

FullLine.propTypes = {
	startXY: PropTypes.arrayOf(PropTypes.number).isRequired,
	interactive: PropTypes.bool.isRequired,
	selected: PropTypes.bool.isRequired,
	hoverText: PropTypes.object.isRequired,

	appearance: PropTypes.shape({
		stroke: PropTypes.string.isRequired,
		fillOpacity: PropTypes.number.isRequired,
		strokeOpacity: PropTypes.number.isRequired,
		strokeWidth: PropTypes.number.isRequired,
		fill: PropTypes.string.isRequired,
		edgeStroke: PropTypes.string.isRequired,
		edgeFill: PropTypes.string.isRequired,
		edgeFill2: PropTypes.string.isRequired,
		edgeStrokeWidth: PropTypes.number.isRequired,
		r: PropTypes.number.isRequired,
	}).isRequired,

	index: PropTypes.number,
	onDrag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
};

FullLine.defaultProps = {
	yDisplayFormat: d => d.toFixed(2),
	interactive: true,
	selected: false,

	onDrag: noop,
	onDragComplete: noop,
	hoverText: {
		enable: false,
	}
};

export default FullLine;