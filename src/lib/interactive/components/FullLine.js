import React, { Component } from "react";
import PropTypes from "prop-types";

import { path as d3Path } from "d3-path";

import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";
import { isHovering } from "./StraightLine";

import { isDefined, noop, hexToRGBA } from "../../utils";

class FullLine extends Component {
	constructor(props) {
		super(props);

		this.renderSVG = this.renderSVG.bind(this);
		this.drawOnCanvas = this.drawOnCanvas.bind(this);
		this.isHover = this.isHover.bind(this);
	}
	isHover(moreProps) {
		const { tolerance, onHover, startXY, type } = this.props;
		const { mouseXY, xScale, chartConfig: { yScale } } = moreProps;
		if (isDefined(onHover) && isDefined(startXY)) {
			const [x1, y1] = startXY;
			if (type === "VERTICAL") {
				const lineHover = isHovering({
					x1Value: x1,
					y1Value: y1 - 10000,
					x2Value: x1,
					y2Value: y1 + 10000,
					type: "LINE",
					mouseXY,
					tolerance,
					xScale,
					yScale,
				});
				return lineHover;
			} else if (type === "HORIZONTAL") {
				const lineHover = isHovering({
					x1Value: x1 - 5000,
					y1Value: y1,
					x2Value: x1 + 5000,
					y2Value: y1,
					type: "LINE",
					mouseXY,
					tolerance,
					xScale,
					yScale,
				});
				return lineHover;
			}
		}
		return false;
	}
	drawOnCanvas(ctx, moreProps) {
		const { stroke, strokeWidth, strokeOpacity } = this.props;
		const line = helper(this.props, moreProps);

		if (isDefined(line)) {
			const { x1, y1, x2, y2 } = line;
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}
	}
	renderSVG(moreProps) {
		const { stroke, strokeWidth, strokeOpacity } = this.props;
		const { line1, line2 } = helper(this.props, moreProps);

		if (isDefined(line1)) {
			const { x1, y1, x2, y2 } = line1;
			const line = isDefined(line2)
				? <line
					strokeWidth={strokeWidth}
					stroke={stroke}
					strokeOpacity={strokeOpacity}
					x1={x1}
					y1={line2.y1}
					x2={x2}
					y2={line2.y2}
				/>
				: null;
			const area = isDefined(line2)
				? <path
					d={getPath(line1, line2)}
				/>
				: null;

			return (
				<g>
					<line
						strokeWidth={strokeWidth}
						stroke={stroke}
						strokeOpacity={strokeOpacity}
						x1={x1}
						y1={y1}
						x2={x2}
						y2={y2}
					/>
					{line}
					{area}
				</g>
			);
		}
	}
	render() {
		const { selected, interactiveCursorClass } = this.props;
		const { onDragStart, onDrag, onDragComplete, onHover, onUnHover } = this.props;
		return <GenericChartComponent
			isHover={this.isHover}

			svgDraw={this.renderSVG}
			canvasToDraw={getMouseCanvas}
			canvasDraw={this.drawOnCanvas}

			interactiveCursorClass={interactiveCursorClass}
			selected={selected}

			onDragStart={onDragStart}
			onDrag={onDrag}
			onDragComplete={onDragComplete}
			onHover={onHover}
			onUnHover={onUnHover}

			drawOn={["mousemove", "mouseleave", "pan", "drag"]}
		/>;
	}
}
function getPath(line1, line2) {
	const ctx = d3Path();
	ctx.moveTo(line1.x1, line1.y1);
	ctx.lineTo(line1.x2, line1.y2);
	ctx.lineTo(line1.x2, line2.y2);
	ctx.lineTo(line1.x1, line2.y1);

	ctx.closePath();
	return ctx.toString();
}

function helper(props, moreProps) {
	const { xScale, chartConfig: { yScale } } = moreProps;
	const { startXY, type } = props;
	const [x1Value, y1Value] = startXY;
	let x1, x2, y1, y2;
	if (type === "VERTICAL") {
		x1 = xScale(x1Value);
		y1 = yScale(y1Value - 10000);
		x2 = xScale(x1Value);
		y2 = yScale(y1Value + 10000);
	} else if (type === "HORIZONTAL") {
		x1 = xScale(x1Value - 5000);
		y1 = yScale(y1Value);
		x2 = xScale(x1Value + 5000);
		y2 = yScale(y1Value);
	}
	return { x1, y1, x2, y2 };
}

FullLine.propTypes = {
	startXY: PropTypes.string,
	interactiveCursorClass: PropTypes.string,
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	fill: PropTypes.string.isRequired,
	fillOpacity: PropTypes.number.isRequired,
	strokeOpacity: PropTypes.number.isRequired,

	type: PropTypes.oneOf([
		"VERTICAL",
		"HORIZONTAL",
	]).isRequired,

	onDragStart: PropTypes.func.isRequired,
	onDrag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
	onHover: PropTypes.func,
	onUnHover: PropTypes.func,

	defaultClassName: PropTypes.string,

	tolerance: PropTypes.number.isRequired,
	selected: PropTypes.bool.isRequired,
};

FullLine.defaultProps = {
	onDragStart: noop,
	onDrag: noop,
	onDragComplete: noop,

	strokeWidth: 1,
	tolerance: 4,
	selected: false,
};

export default FullLine;