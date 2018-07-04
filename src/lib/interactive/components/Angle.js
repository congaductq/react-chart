import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";

import {
	isDefined,
	noop,
	hexToRGBA,
	getStrokeDasharray,
	strokeDashTypes,
} from "../../utils";

class Angle extends Component {
	constructor(props) {
		super(props);

		this.renderSVG = this.renderSVG.bind(this);
		this.drawOnCanvas = this.drawOnCanvas.bind(this);
		this.isHover = this.isHover.bind(this);
	}
	isHover(moreProps) {
		const { tolerance, onHover, type } = this.props;
		if (isDefined(onHover)) {
			if (type === "ANGLE") {
				const { x1Value, x2Value, y1Value, y2Value, type } = this.props;
				const { mouseXY, xScale } = moreProps;
				const { chartConfig: { yScale } } = moreProps;

				const hovering = isHovering({
					x1Value, y1Value,
					x2Value, y2Value,
					mouseXY,
					type,
					tolerance,
					xScale,
					yScale,
				});
				return hovering;
			} else if (type === "RECTANGLE") {
				const { x1Value, x2Value, y1Value, y2Value, type } = this.props;
				const { mouseXY, xScale } = moreProps;
				const { chartConfig: { yScale } } = moreProps;

				const hovering1 = isHovering({
					x1Value, y1Value,
					x2Value: x1Value, y2Value,
					mouseXY,
					type,
					tolerance,
					xScale,
					yScale,
				});
				const hovering2 = isHovering({
					x1Value, y1Value: y2Value,
					x2Value, y2Value,
					mouseXY,
					type,
					tolerance,
					xScale,
					yScale,
				});
				const hovering3 = isHovering({
					x1Value: x2Value, y1Value,
					x2Value, y2Value,
					mouseXY,
					type,
					tolerance,
					xScale,
					yScale,
				});
				const hovering4 = isHovering({
					x1Value, y1Value,
					x2Value, y2Value: y1Value,
					mouseXY,
					type,
					tolerance,
					xScale,
					yScale,
				});
				return hovering1 || hovering2 || hovering3 || hovering4;
			} else if (type === "CIRCLE") {
				const { x1Value, x2Value, y1Value, y2Value } = this.props;
				const { mouseXY, xScale } = moreProps;
				const { chartConfig: { yScale } } = moreProps;
				const x1 = xScale(x1Value);
				const x2 = xScale(x2Value);
				const y1 = yScale(y1Value);
				const y2 = yScale(y2Value);
				if ( Math.pow(mouseXY[0] - (x1 + x2) / 2, 2) / Math.pow(Math.abs((x2 - x1) / 2), 2) +
				Math.pow(mouseXY[1] - (y1 + y2) / 2, 2) / Math.pow(Math.abs((y2 - y1) / 2), 2) <= 1) {
					return true;
				}
			}
		}
		return false;
	}
	drawOnCanvas(ctx, moreProps) {
		const { stroke, strokeWidth, strokeOpacity, type, fill, fillOpacity, text } = this.props;
		if (type === "ANGLE") {
			const { x1, y1, x2, y2, x3, y3 } = helper(this.props, moreProps);
			const rad = Math.atan2(y2 - y1, x2 - x1) || 0;
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			ctx.beginPath();
			ctx.setLineDash([10, 10]);
			ctx.moveTo(x1, y1);
			ctx.lineTo(x3, y3);
			ctx.lineTo(x1, y1);
			ctx.arc(x1, y1, x3 - x1, rad > 0 ? 0 : rad, rad > 0 ? rad : 0);
			ctx.lineTo(x1, y1);
			ctx.stroke();
			if (x3 && y3) {
        ctx.font = "15px Arial";
        ctx.fillStyle = text;
				ctx.fillText(Math.round(- Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180) + "°", x3 + 5, y3 + 10);
			}
		} else if (type === "RECTANGLE") {
			const { x1, y1, x2, y2 } = helper(this.props, moreProps);
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
			ctx.fillStyle = hexToRGBA(fill, fillOpacity);
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x1, y2);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x2, y1);
			ctx.lineTo(x1, y1);
			ctx.fill();
			ctx.stroke();
		} else if (type === "CIRCLE") {
			const { x1, y1, x2, y2 } = helper(this.props, moreProps);
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
			ctx.fillStyle = hexToRGBA(fill, fillOpacity);
			ctx.setLineDash([]);
			ctx.beginPath();
			ctx.ellipse((x1 + x2) / 2, (y1 + y2) / 2,
				Math.abs((x2 - x1) / 2), Math.abs((y2 - y1) / 2),
				2 * Math.PI, 0, 2 * Math.PI, true);
			ctx.fill();
			ctx.stroke();
		}
	}
	renderSVG(moreProps) {
		const { stroke, strokeWidth, strokeOpacity, strokeDasharray } = this.props;

		const lineWidth = strokeWidth;

		const { x1, y1, x2, y2 } = helper(this.props, moreProps);
		return (
			<line
				x1={x1} y1={y1} x2={x2} y2={y2}
				stroke={stroke} strokeWidth={lineWidth}
				strokeDasharray={getStrokeDasharray(strokeDasharray)}
				strokeOpacity={strokeOpacity} />
		);
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

			drawOn={["mousemove", "pan", "drag"]}
		/>;
	}
}

export function isHovering2(start, end, [mouseX, mouseY], tolerance) {
	const m = getSlope(start, end);

	if (isDefined(m)) {
		const b = getYIntercept(m, end);
		const y = m * mouseX + b;
		return (mouseY < y + tolerance)
			&& mouseY > (y - tolerance)
			&& mouseX > Math.min(start[0], end[0]) - tolerance
			&& mouseX < Math.max(start[0], end[0]) + tolerance;
	} else {
		return mouseY >= Math.min(start[1], end[1])
			&& mouseY <= Math.max(start[1], end[1])
			&& mouseX < start[0] + tolerance
			&& mouseX > start[0] - tolerance;
	}
}

export function isHovering({
	x1Value, y1Value,
	x2Value, y2Value,
	mouseXY,
	type,
	tolerance,
	xScale,
	yScale,
}) {

	const line = generateLine({
		type,
		start: [x1Value, y1Value],
		end: [x2Value, y2Value],
		xScale,
		yScale,
	});

	const start = [xScale(line.x1), yScale(line.y1)];
	const end = [xScale(line.x2), yScale(line.y2)];

	const m = getSlope(start, end);
	const [mouseX, mouseY] = mouseXY;

	if (isDefined(m)) {
		const b = getYIntercept(m, end);
		const y = m * mouseX + b;

		return mouseY < (y + tolerance)
			&& mouseY > (y - tolerance)
			&& mouseX > Math.min(start[0], end[0]) - tolerance
			&& mouseX < Math.max(start[0], end[0]) + tolerance;
	} else {
		return mouseY >= Math.min(start[1], end[1])
			&& mouseY <= Math.max(start[1], end[1])
			&& mouseX < start[0] + tolerance
			&& mouseX > start[0] - tolerance;
	}
}

function helper(props, moreProps) {
	const { x1Value, x2Value, y1Value, y2Value, type } = props;
	const { xScale, chartConfig: { yScale } } = moreProps;

	const modLine = generateLine({
		type,
		start: [x1Value, y1Value],
		end: [x2Value, y2Value],
		xScale,
		yScale,
	});

	if (type === "ANGLE") {
		const x1 = xScale(modLine.x1);
		const y1 = yScale(modLine.y1);
		const x2 = xScale(modLine.x2);
		const y2 = yScale(modLine.y2);
		const x3 = xScale(modLine.x1) + 50;
		const y3 = yScale(modLine.y1);

		return {
			x1, y1, x2, y2, x3, y3
		};
	} else if (type === "RECTANGLE" || type === "CIRCLE") {
		const x1 = xScale(modLine.x1);
		const y1 = yScale(modLine.y1);
		const x2 = xScale(modLine.x2);
		const y2 = yScale(modLine.y2);

		return {
			x1, y1, x2, y2
		};
	}

}

export function getSlope(start, end) {
	const m /* slope */ = end[0] === start[0]
		? undefined
		: (end[1] - start[1]) / (end[0] - start[0]);
	return m;
}
export function getYIntercept(m, end) {
	const b /* y intercept */ = -1 * m * end[0] + end[1];
	return b;
}

export function generateLine({
	type, start, end, xScale, yScale
}) {
	const m /* slope */ = getSlope(start, end);
	// console.log(end[0] - start[0], m)
	const b /* y intercept */ = getYIntercept(m, start);

	return getLineCoordinates({
		type, start, end, xScale, yScale, m, b
	});
}

function getLineCoordinates({
	start, end
}) {

	const [x1, y1] = start;
	const [x2, y2] = end;
	if (end[0] === start[0]) {
		return {
			x1,
			y1: start[1],
			x2: x1,
			y2: end[1],
		};
	}

	return {
		x1, y1,
		x2, y2,
	};
}

Angle.propTypes = {
	x1Value: PropTypes.any.isRequired,
	x2Value: PropTypes.any.isRequired,
	y1Value: PropTypes.any.isRequired,
	y2Value: PropTypes.any.isRequired,

	interactiveCursorClass: PropTypes.string,
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	strokeOpacity: PropTypes.number.isRequired,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),

	type: PropTypes.oneOf([
		"ANGLE",
		"RECTANGLE",
		"CIRCLE",
	]).isRequired,

	onEdge1Drag: PropTypes.func.isRequired,
	onEdge2Drag: PropTypes.func.isRequired,
	onDragStart: PropTypes.func.isRequired,
	onDrag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
	onHover: PropTypes.func,
	onUnHover: PropTypes.func,

	defaultClassName: PropTypes.string,

	r: PropTypes.number.isRequired,
	edgeFill: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	edgeStroke: PropTypes.string.isRequired,
	edgeStrokeWidth: PropTypes.number.isRequired,
	withEdge: PropTypes.bool.isRequired,
	children: PropTypes.func.isRequired,
	tolerance: PropTypes.number.isRequired,
	selected: PropTypes.bool.isRequired,
	fill: PropTypes.string.isRequired,
	fillOpacity: PropTypes.number.isRequired,
};

Angle.defaultProps = {
	onEdge1Drag: noop,
	onEdge2Drag: noop,
	onDragStart: noop,
	onDrag: noop,
	onDragComplete: noop,
	withEdge: false,
	children: noop,
	tolerance: 7,
	selected: false,
};

export default Angle;