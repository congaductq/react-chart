import React, { Component } from "react";
import PropTypes from "prop-types";

import { isDefined, noop } from "../../utils";
import { getXValue } from "../../utils/ChartDataUtil";
import { saveNodeType, isHover } from "../utils";

import ClickableCircle from "../components/ClickableCircle";
import ChannelWithArea from "../components/PitchFork";
import HoverTextNearMouse from "../components/HoverTextNearMouse";

class EachPitchFork extends Component {
	constructor(props) {
		super(props);

		this.handleChangeStart = this.handleChangeStart.bind(this);
		this.handleChangeEnd = this.handleChangeEnd.bind(this);
		this.handleChangeFinish = this.handleChangeFinish.bind(this);
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
		if (this.state.hover !== moreProps.hovering) {
			this.setState({
				hover: moreProps.hovering
			});
		}
	}
	handleDragStart() {
		const {
			startXY, endXY, finishXY,
		} = this.props;

		this.dragStart = {
			startXY, endXY, finishXY,
		};
	}
	handleChannelDrag(moreProps) {
		const { index, onDrag } = this.props;

		const {
			startXY, endXY, finishXY,
		} = this.dragStart;

		const { xScale, chartConfig: { yScale }, xAccessor, fullData } = moreProps;
		const { startPos, mouseXY } = moreProps;

		const x1 = xScale(startXY[0]);
		const y1 = yScale(startXY[1]);
		const x2 = xScale(endXY[0]);
		const y2 = yScale(endXY[1]);
		const x3 = xScale(finishXY[0]);
		const y3 = yScale(finishXY[1]);

		const dx = startPos[0] - mouseXY[0];
		const dy = startPos[1] - mouseXY[1];

		const newStartX = getXValue(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);
		const newStartY = yScale.invert(y1 - dy);
		const newEndX = getXValue(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
		const newEndY = yScale.invert(y2 - dy);
		const newFinishX = getXValue(xScale, xAccessor, [x3 - dx, y3 - dy], fullData);
		const newFinishY = yScale.invert(y2 - dy);
		onDrag(index, {
			startXY: [newStartX, newStartY],
			endXY: [newEndX, newEndY],
			finishXY: [newFinishX, newFinishY],
		});
	}
	handleChangeStart(moreProps) {
		const { index, onDrag } = this.props;

		const {
			startXY, endXY, finishXY,
		} = this.dragStart;

		const { xScale, chartConfig: { yScale }, xAccessor, fullData } = moreProps;
		const { startPos, mouseXY } = moreProps;

		const x2 = xScale(startXY[0]);
		const y2 = yScale(startXY[1]);

		const dx = startPos[0] - mouseXY[0];
		const dy = startPos[1] - mouseXY[1];

		const newFinishX = getXValue(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
		const newFinishY = yScale.invert(y2 - dy);
		onDrag(index, { endXY, finishXY,
			startXY: [newFinishX, newFinishY],
		});
	}
	handleChangeEnd(moreProps) {
		const { index, onDrag } = this.props;

		const {
			startXY, endXY, finishXY,
		} = this.dragStart;

		const { xScale, chartConfig: { yScale }, xAccessor, fullData } = moreProps;
		const { startPos, mouseXY } = moreProps;

		const x2 = xScale(endXY[0]);
		const y2 = yScale(endXY[1]);

		const dx = startPos[0] - mouseXY[0];
		const dy = startPos[1] - mouseXY[1];

		const newFinishX = getXValue(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
		const newFinishY = yScale.invert(y2 - dy);
		onDrag(index, { startXY, finishXY,
			endXY: [newFinishX, newFinishY],
		});
	}
	handleChangeFinish(moreProps) {
		const { index, onDrag } = this.props;

		const {
			startXY, endXY, finishXY,
		} = this.dragStart;

		const { xScale, chartConfig: { yScale }, xAccessor, fullData } = moreProps;
		const { startPos, mouseXY } = moreProps;

		const x2 = xScale(finishXY[0]);
		const y2 = yScale(finishXY[1]);

		const dx = startPos[0] - mouseXY[0];
		const dy = startPos[1] - mouseXY[1];

		const newFinishX = getXValue(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
		const newFinishY = yScale.invert(y2 - dy);

		onDrag(index, { startXY, endXY,
			finishXY: [newFinishX, newFinishY],
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
		const { startXY, endXY, finishXY } = this.props;

		const { interactive, hoverText, appearance } = this.props;
		const {
			edgeFill, edgeFill2,
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

		const startEdge = isDefined(startXY) && isDefined(endXY)
			? <g>
				{this.getEdgeCircle({
					xy: startXY,
					dragHandler: this.handleChangeStart,
					cursor: "react-stockcharts-move-cursor",
					fill: edgeFill,
					edge: "startEdge",
				})}
				{this.getEdgeCircle({
					xy: endXY,
					dragHandler: this.handleChangeEnd,
					cursor: "react-stockcharts-move-cursor",
					fill: edgeFill,
					edge: "endEdge",
				})}
			</g>
			: null;
		const endEdge = isDefined(finishXY)
			? <g>
				{this.getEdgeCircle({
					xy: finishXY,
					dragHandler: this.handleChangeFinish,
					cursor: "react-stockcharts-ns-resize-cursor",
					fill: edgeFill2,
					edge: "finishEdge",
				})}
			</g>
			: null;
		return <g>
			<ChannelWithArea
				ref={this.saveNodeType("channel")}
				selected={selected || hover}

				{...hoverHandler}

				startXY={startXY}
				endXY={endXY}
				finishXY={finishXY}
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
			{startEdge}
			{endEdge}
			<HoverTextNearMouse
				show={hoverTextEnabled && hover && !selected}
				{...restHoverTextProps} />
		</g>;
	}
}

EachPitchFork.propTypes = {
	startXY: PropTypes.arrayOf(PropTypes.number).isRequired,
	endXY: PropTypes.arrayOf(PropTypes.number).isRequired,
	finishXY: PropTypes.arrayOf(PropTypes.number),

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

EachPitchFork.defaultProps = {
	yDisplayFormat: d => d.toFixed(2),
	interactive: true,
	selected: false,

	onDrag: noop,
	onDragComplete: noop,
	hoverText: {
		enable: false,
	}
};

export default EachPitchFork;