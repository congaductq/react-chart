import React, { Component } from "react";
import PropTypes from "prop-types";
import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";
import { isDefined, noop, hexToRGBA } from "../../utils";
import { getRayCoordinates, getSlope, getYIntercept } from "./StraightLine";

class ChannelWithArea extends Component {
	constructor(props) {
		super(props);

		this.renderSVG = this.renderSVG.bind(this);
		this.drawOnCanvas = this.drawOnCanvas.bind(this);
		this.isHover = this.isHover.bind(this);
	}
	isHover(moreProps) {
		return false;
	}
	drawOnCanvas(ctx, moreProps) {
		const { stroke, strokeWidth, strokeOpacity, startXY, endXY, finishXY } = this.props;

		const { xScale, chartConfig: { yScale } } = moreProps;
		if (isDefined(endXY) && !isDefined(finishXY)) {
			const x1 = xScale(startXY[0]);
			const y1 = yScale(startXY[1]);
			const x2 = xScale(endXY[0]);
			const y2 = yScale(endXY[1]);
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			ctx.closePath();
			ctx.fill();
		} else {
			const x1 = xScale(startXY[0]);
			const y1 = yScale(startXY[1]);
			const x2 = xScale(endXY[0]);
			const y2 = yScale(endXY[1]);
			const x3 = xScale(finishXY[0]);
			const y3 = yScale(finishXY[1]);
			const x4 = (x2 + x3) / 2;
			const y4 = (y2 + y3) / 2;
			const x5 = (x2 + x4) / 2;
			const y5 = (y2 + y4) / 2;
			const x6 = (x4 + x3) / 2;
			const y6 = (y4 + y3) / 2;
			const slop = getSlope([x1, y1], [x4, y4]);
			const x2a = x2 + 1;
			const y2a = y2 - slop * (x2 + 1);
			const x3a = x3 + 1;
			const y3a = y3 - slop * (x3 + 1);
			const x5a = x5 + 1;
			const y5a = y5 - slop * (x5 + 1);
			const x6a = x6 + 1;
			const y6a = y6 - slop * (x6 + 1);
			const ray4 = getRayCoordinates({
				start: [x1, y1], end: [x4, y4], xScale, yScale, m: slop, b: getYIntercept(slop, [x1, y1]),
			});
			const ray2 = getRayCoordinates({
				start: [x2, y2], end: [x2a, y2a], xScale, yScale, m: slop, b: getYIntercept(slop, [x2, y2]),
			});
			const ray3 = getRayCoordinates({
				start: [x3, y3], end: [x3a, y3a], xScale, yScale, m: slop, b: getYIntercept(slop, [x3, y3]),
			});
			const ray5 = getRayCoordinates({
				start: [x5, y5], end: [x5a, y5a], xScale, yScale, m: slop, b: getYIntercept(slop, [x5, y5]),
			});
			const ray6 = getRayCoordinates({
				start: [x6, y6], end: [x6a, y6a], xScale, yScale, m: slop, b: getYIntercept(slop, [x6, y6]),
			});
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA("#000000", strokeOpacity);
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x4, y4);
			ctx.moveTo(x2, y2);
			ctx.lineTo(x4, y4);
			ctx.moveTo(x3, y3);
			ctx.lineTo(x4, y4);
			ctx.moveTo(ray4.x1, ray4.y1);
			ctx.lineTo(ray4.x2, ray4.y2);
			ctx.moveTo(ray2.x1, ray2.y1);
			ctx.lineTo(ray2.x2, ray2.y2);
			ctx.moveTo(ray3.x1, ray3.y1);
			ctx.lineTo(ray3.x2, ray3.y2);
			ctx.stroke();

			ctx.fillStyle = hexToRGBA("#ff0000", 0.2);
			ctx.beginPath();
			ctx.moveTo(x2, y2);
			ctx.lineTo(x5, y5);
			ctx.lineTo(ray5.x2, ray5.y2);
			ctx.lineTo(ray2.x2, ray2.y2);
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(x3, y3);
			ctx.lineTo(x6, y6);
			ctx.lineTo(ray6.x2, ray6.y2);
			ctx.lineTo(ray3.x2, ray3.y2);
			ctx.fill();

			ctx.fillStyle = hexToRGBA("#00ff00", 0.2);
			ctx.beginPath();
			ctx.moveTo(x4, y4);
			ctx.lineTo(x5, y5);
			ctx.lineTo(ray5.x2, ray5.y2);
			ctx.lineTo(ray4.x2, ray4.y2);
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(x6, y6);
			ctx.lineTo(x4, y4);
			ctx.lineTo(ray4.x2, ray4.y2);
			ctx.lineTo(ray6.x2, ray6.y2);
			ctx.fill();
			ctx.closePath();
		}
	}
	renderSVG(moreProps) {
		return moreProps;
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

ChannelWithArea.propTypes = {
	interactiveCursorClass: PropTypes.string,
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	fill: PropTypes.string.isRequired,
	fillOpacity: PropTypes.number.isRequired,
	strokeOpacity: PropTypes.number.isRequired,

	type: PropTypes.oneOf([
		"XLINE", // extends from -Infinity to +Infinity
		"RAY", // extends to +/-Infinity in one direction
		"LINE", // extends between the set bounds
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

ChannelWithArea.defaultProps = {
	onDragStart: noop,
	onDrag: noop,
	onDragComplete: noop,
	type: "LINE",

	strokeWidth: 1,
	tolerance: 4,
	selected: false,
};

export default ChannelWithArea;