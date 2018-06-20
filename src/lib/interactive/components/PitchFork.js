import React, { Component } from "react";
import PropTypes from "prop-types";
import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";
import { isDefined, noop, hexToRGBA } from "../../utils";
import { getSlope, getYIntercept } from "./StraightLine";

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
			const slope = getSlope([x1, y1], [x4, y4]);
			const xDirection = x4 - x1 > 0;
			const ray4 = this.getRayCoordinates({ end: [x4, y4], xDirection, slope });
			const ray2 = this.getRayCoordinates({ end: [x2, y2], xDirection, slope });
			const ray3 = this.getRayCoordinates({ end: [x3, y3], xDirection, slope });
			const ray5 = this.getRayCoordinates({ end: [x5, y5], xDirection, slope });
			const ray6 = this.getRayCoordinates({ end: [x6, y6], xDirection, slope });

			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA("#000000", strokeOpacity);
			ctx.beginPath();
			ctx.moveTo(x2, y2);
			ctx.lineTo(x4, y4);
			ctx.moveTo(x3, y3);
			ctx.lineTo(x4, y4);
			ctx.moveTo(x1, y1);
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
	getRayCoordinates({ end, xDirection, slope }) {
		if (xDirection) {
			return {
				x1: end[0],
				y1: end[1],
				x2: end[0] + 1000,
				y2: slope * (end[0] + 1000) + getYIntercept(slope, end),
			};
		} else {
			return {
				x1: end[0],
				y1: end[1],
				x2: end[0] - 1000,
				y2: slope * (end[0] - 1000) + getYIntercept(slope, end),
			};
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