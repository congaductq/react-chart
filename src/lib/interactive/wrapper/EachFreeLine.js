import React, { Component } from "react";
import PropTypes from "prop-types";

import { ascending as d3Ascending } from "d3-array";
import { noop, strokeDashTypes } from "../../utils";
import { saveNodeType, isHover } from "../utils";
import { getXValue } from "../../utils/ChartDataUtil";

import FreeLineComponent from "../components/FreeLine";
import ClickableCircle from "../components/ClickableCircle";
import HoverTextNearMouse from "../components/HoverTextNearMouse";

class EachTrendLine extends Component {
	constructor(props) {
		super(props);

		this.handleEdge1Drag = this.handleEdge1Drag.bind(this);
		this.handleEdge2Drag = this.handleEdge2Drag.bind(this);
		this.handleLineDragStart = this.handleLineDragStart.bind(this);
		this.handleLineDrag = this.handleLineDrag.bind(this);

		this.handleEdge1DragStart = this.handleEdge1DragStart.bind(this);
		this.handleEdge2DragStart = this.handleEdge2DragStart.bind(this);

		this.handleDragComplete = this.handleDragComplete.bind(this);

		this.handleHover = this.handleHover.bind(this);

		this.isHover = isHover.bind(this);
		this.saveNodeType = saveNodeType.bind(this);
		this.nodes = {};

		this.state = {
			hover: false,
		};
	}
	handleLineDragStart() {
		const {
			positionList
		} = this.props;

		this.dragStart = {
			positionList
		};
	}
	handleLineDrag(moreProps) {
		const { index, onDrag } = this.props;

		const {
			positionList
		} = this.dragStart;

		const { xScale, chartConfig: { yScale }, xAccessor, fullData } = moreProps;
		const { startPos, mouseXY } = moreProps;
		const convertedList = new Array();
		positionList.forEach(element => {
			convertedList.push([xScale(element[0]), yScale(element[1])]);
		});
		const dx = startPos[0] - mouseXY[0];
		const dy = startPos[1] - mouseXY[1];
		const posList = convertedList.map(x => {
			return (
				[getXValue(xScale, xAccessor, [x[0] - dx, x[1] - dy], fullData),  yScale.invert(x[1] - dy)]
			);
		});

		onDrag(index, {
			positionList: posList,
		});
	}
	handleEdge1DragStart() {
		this.setState({
			anchor: "edge2"
		});
	}
	handleEdge2DragStart() {
		this.setState({
			anchor: "edge1"
		});
	}
	handleDragComplete(...rest) {
		this.setState({
			anchor: undefined
		});
		this.props.onDragComplete(...rest);
	}
	handleEdge1Drag(moreProps) {
		const { index, onDrag } = this.props;
		const {
			x2Value, y2Value,
		} = this.props;

		const [x1Value, y1Value] = getNewXY(moreProps);

		onDrag(index, {
			x1Value,
			y1Value,
			x2Value,
			y2Value,
		});
	}
	handleEdge2Drag(moreProps) {
		const { index, onDrag } = this.props;
		const {
			x1Value, y1Value,
		} = this.props;

		const [x2Value, y2Value] = getNewXY(moreProps);

		onDrag(index, {
			x1Value,
			y1Value,
			x2Value,
			y2Value,
		});
	}
	handleHover(moreProps) {
		if (this.state.hover !== moreProps.hovering) {
			this.setState({
				hover: moreProps.hovering
			});
		}
	}
	render() {
		const {
			positionList,
			stroke,
			strokeWidth,
			strokeOpacity,
			strokeDasharray,
			r,
			edgeStrokeWidth,
			edgeFill,
			fill,
			fillOpacity,
			edgeStroke,
			edgeInteractiveCursor,
			lineInteractiveCursor,
			hoverText,
			selected,
			onDragComplete,
		} = this.props;
		const { hover, anchor } = this.state;
		// console.log("SELECTED ->", selected);
		const { enable: hoverTextEnabled, ...restHoverTextProps } = hoverText;

		return <g>
			<FreeLineComponent
				ref={this.saveNodeType("line")}
				selected={selected || hover}
				onHover={this.handleHover}
				onUnHover={this.handleHover}
				positionList={positionList}
				stroke={stroke}
				fill={fill}
				fillOpacity={fillOpacity}
				strokeWidth={(hover || selected) ? strokeWidth + 1 : strokeWidth}
				strokeOpacity={strokeOpacity}
				strokeDasharray={strokeDasharray}
				interactiveCursorClass={lineInteractiveCursor}
				onDragStart={this.handleLineDragStart}
				onDrag={this.handleLineDrag}
				onDragComplete={onDragComplete} />
			<ClickableCircle
				ref={this.saveNodeType("edge1")}
				show={selected || hover}
				cx={positionList[0][0]}
				cy={positionList[0][1]}
				r={r}
				fill={edgeFill}
				stroke={anchor === "edge1" ? stroke : edgeStroke}
				strokeWidth={edgeStrokeWidth}
				strokeOpacity={1}
				interactiveCursorClass={edgeInteractiveCursor}
				onDragStart={this.handleLineDragStart}
				onDrag={this.handleLineDrag}
				onDragComplete={this.handleDragComplete} />
			<ClickableCircle
				ref={this.saveNodeType("edge2")}
				show={selected || hover}
				cx={positionList[positionList.length - 1][0]}
				cy={positionList[positionList.length - 1][1]}
				r={r}
				fill={edgeFill}
				stroke={anchor === "edge2" ? stroke : edgeStroke}
				strokeWidth={edgeStrokeWidth}
				strokeOpacity={1}
				interactiveCursorClass={edgeInteractiveCursor}
				onDragStart={this.handleLineDragStart}
				onDrag={this.handleLineDrag}
				onDragComplete={this.handleDragComplete} />
			<HoverTextNearMouse
				show={hoverTextEnabled && hover && !selected}
				{...restHoverTextProps} />
		</g>;
	}
}

export function getNewXY(moreProps) {
	const { xScale, chartConfig: { yScale }, xAccessor, plotData, mouseXY } = moreProps;
	const mouseY = mouseXY[1];

	const x = getXValue(xScale, xAccessor, mouseXY, plotData);

	const [small, big] = yScale.domain().slice().sort(d3Ascending);
	const y = yScale.invert(mouseY);
	const newY = Math.min(Math.max(y, small), big);
	return [x, newY];
}

EachTrendLine.propTypes = {
	positionList: PropTypes.arrayOf(PropTypes.any).isRequired,
	index: PropTypes.number,
	onDrag: PropTypes.func.isRequired,
	onEdge1Drag: PropTypes.func.isRequired,
	onEdge2Drag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	onUnSelect: PropTypes.func.isRequired,

	r: PropTypes.number.isRequired,
	strokeOpacity: PropTypes.number.isRequired,
	defaultClassName: PropTypes.string,

	selected: PropTypes.bool,

	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),

	edgeStrokeWidth: PropTypes.number.isRequired,
	edgeStroke: PropTypes.string.isRequired,
	edgeInteractiveCursor: PropTypes.string.isRequired,
	lineInteractiveCursor: PropTypes.string.isRequired,
	edgeFill: PropTypes.string.isRequired,
	hoverText: PropTypes.object.isRequired,
	fill: PropTypes.string.isRequired,
	fillOpacity: PropTypes.number.isRequired,
};

EachTrendLine.defaultProps = {
	onDrag: noop,
	onEdge1Drag: noop,
	onEdge2Drag: noop,
	onDragComplete: noop,
	onSelect: noop,
	onUnSelect: noop,

	selected: false,

	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	fill: "#8AAFE2",
	fillOpacity: 0.5,
	edgeStrokeWidth: 2,
	r: 5,
	strokeWidth: 1,
	strokeOpacity: 0.7,
	strokeDasharray: "Solid",
	hoverText: {
		enable: false,
	}
};

export default EachTrendLine;