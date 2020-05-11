"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _utils = require("../../utils");

var _StraightLine = require("./StraightLine");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelWithArea = function (_Component) {
	_inherits(ChannelWithArea, _Component);

	function ChannelWithArea(props) {
		_classCallCheck(this, ChannelWithArea);

		var _this = _possibleConstructorReturn(this, (ChannelWithArea.__proto__ || Object.getPrototypeOf(ChannelWithArea)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(ChannelWithArea, [{
		key: "isHover",
		value: function isHover(moreProps) {
			var _props = this.props,
			    startXY = _props.startXY,
			    endXY = _props.endXY,
			    finishXY = _props.finishXY,
			    tolerance = _props.tolerance,
			    onHover = _props.onHover,
			    type = _props.type;
			var mouseXY = moreProps.mouseXY,
			    xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale;

			if ((0, _utils.isDefined)(onHover) && finishXY) {
				if (type === "PITCHFORK") {
					var x1 = startXY[0];
					var y1 = startXY[1];
					var x2 = endXY[0];
					var y2 = endXY[1];
					var x3 = finishXY[0];
					var y3 = finishXY[1];
					var x4 = (x2 + x3) / 2;
					var y4 = (y2 + y3) / 2;
					var slope = (0, _StraightLine.getSlope)([x1, y1], [x4, y4]);
					var xDirection = x4 - x1 > 0;
					var ray2 = this.getRayCoordinates({ end: [x2, y2], xDirection: xDirection, slope: slope });
					var ray3 = this.getRayCoordinates({ end: [x3, y3], xDirection: xDirection, slope: slope });
					var line14Hovering = (0, _StraightLine.isHovering)({
						x1Value: x1,
						y1Value: y1,
						x2Value: x4,
						y2Value: y4,
						type: "LINE",
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					var line23Hovering = (0, _StraightLine.isHovering)({
						x1Value: x2,
						y1Value: y2,
						x2Value: x3,
						y2Value: y3,
						type: "LINE",
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					var line2Hovering = (0, _StraightLine.isHovering)({
						x1Value: ray2.x1,
						y1Value: ray2.y1,
						x2Value: ray2.x2,
						y2Value: ray2.y2,
						type: "LINE",
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					var line3Hovering = (0, _StraightLine.isHovering)({
						x1Value: ray3.x1,
						y1Value: ray3.y1,
						x2Value: ray3.x2,
						y2Value: ray3.y2,
						type: "LINE",
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					return line2Hovering || line3Hovering || line23Hovering || line14Hovering;
				} else if (type === "TRIANGLE") {
					var _x = startXY[0];
					var _y = startXY[1];
					var _x2 = endXY[0];
					var _y2 = endXY[1];
					var _x3 = finishXY[0];
					var _y3 = finishXY[1];
					var line1 = (0, _StraightLine.isHovering)({
						x1Value: _x,
						y1Value: _y,
						x2Value: _x2,
						y2Value: _y2,
						type: "LINE",
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					var line2 = (0, _StraightLine.isHovering)({
						x1Value: _x3,
						y1Value: _y3,
						x2Value: _x2,
						y2Value: _y2,
						type: "LINE",
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					var line3 = (0, _StraightLine.isHovering)({
						x1Value: _x,
						y1Value: _y,
						x2Value: _x3,
						y2Value: _y3,
						type: "LINE",
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					return line1 || line2 || line3;
				}
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var type = this.props.type;

			if (type === "PITCHFORK") {
				var _props2 = this.props,
				    stroke = _props2.stroke,
				    strokeMedianOne = _props2.strokeMedianOne,
				    strokeMedianHalf = _props2.strokeMedianHalf,
				    strokeWidth = _props2.strokeWidth,
				    strokeOpacity = _props2.strokeOpacity,
				    fillOpacity = _props2.fillOpacity,
				    startXY = _props2.startXY,
				    endXY = _props2.endXY,
				    finishXY = _props2.finishXY;
				var xScale = moreProps.xScale,
				    yScale = moreProps.chartConfig.yScale;

				if ((0, _utils.isDefined)(endXY) && !(0, _utils.isDefined)(finishXY)) {
					var x1 = xScale(startXY[0]);
					var y1 = yScale(startXY[1]);
					var x2 = xScale(endXY[0]);
					var y2 = yScale(endXY[1]);
					ctx.lineWidth = strokeWidth;
					ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);
					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.stroke();
					ctx.closePath();
					ctx.fill();
				} else {
					var _x4 = xScale(startXY[0]);
					var _y4 = yScale(startXY[1]);
					var _x5 = xScale(endXY[0]);
					var _y5 = yScale(endXY[1]);
					var x3 = xScale(finishXY[0]);
					var y3 = yScale(finishXY[1]);
					var x4 = (_x5 + x3) / 2;
					var y4 = (_y5 + y3) / 2;
					var x5 = (_x5 + x4) / 2;
					var y5 = (_y5 + y4) / 2;
					var x6 = (x4 + x3) / 2;
					var y6 = (y4 + y3) / 2;
					var slope = (0, _StraightLine.getSlope)([_x4, _y4], [x4, y4]);
					var xDirection = x4 - _x4 > 0;
					var ray4 = this.getRayCoordinates({ end: [x4, y4], xDirection: xDirection, slope: slope });
					var ray2 = this.getRayCoordinates({ end: [_x5, _y5], xDirection: xDirection, slope: slope });
					var ray3 = this.getRayCoordinates({ end: [x3, y3], xDirection: xDirection, slope: slope });
					var ray5 = this.getRayCoordinates({ end: [x5, y5], xDirection: xDirection, slope: slope });
					var ray6 = this.getRayCoordinates({ end: [x6, y6], xDirection: xDirection, slope: slope });

					ctx.lineWidth = strokeWidth;
					ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);
					ctx.beginPath();
					ctx.moveTo(_x5, _y5);
					ctx.lineTo(x4, y4);
					ctx.moveTo(x3, y3);
					ctx.lineTo(x4, y4);
					ctx.moveTo(_x4, _y4);
					ctx.lineTo(x4, y4);
					ctx.moveTo(ray4.x1, ray4.y1);
					ctx.lineTo(ray4.x2, ray4.y2);
					ctx.moveTo(ray2.x1, ray2.y1);
					ctx.lineTo(ray2.x2, ray2.y2);
					ctx.moveTo(ray3.x1, ray3.y1);
					ctx.lineTo(ray3.x2, ray3.y2);
					ctx.stroke();

					ctx.fillStyle = (0, _utils.hexToRGBA)(strokeMedianOne, fillOpacity);
					ctx.beginPath();
					ctx.moveTo(_x5, _y5);
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
					ctx.fillStyle = (0, _utils.hexToRGBA)(strokeMedianHalf, fillOpacity);
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
			} else if (type === "TRIANGLE") {
				var _props3 = this.props,
				    _stroke = _props3.stroke,
				    _strokeWidth = _props3.strokeWidth,
				    _strokeOpacity = _props3.strokeOpacity,
				    fill = _props3.fill,
				    _fillOpacity = _props3.fillOpacity,
				    _startXY = _props3.startXY,
				    _endXY = _props3.endXY,
				    _finishXY = _props3.finishXY;
				var _xScale = moreProps.xScale,
				    _yScale = moreProps.chartConfig.yScale;

				if ((0, _utils.isDefined)(_endXY) && !(0, _utils.isDefined)(_finishXY)) {
					var _x6 = _xScale(_startXY[0]);
					var _y6 = _yScale(_startXY[1]);
					var _x7 = _xScale(_endXY[0]);
					var _y7 = _yScale(_endXY[1]);
					ctx.lineWidth = _strokeWidth;
					ctx.strokeStyle = (0, _utils.hexToRGBA)(_stroke, _strokeOpacity);
					ctx.beginPath();
					ctx.moveTo(_x6, _y6);
					ctx.lineTo(_x7, _y7);
					ctx.stroke();
					ctx.closePath();
					ctx.fill();
				} else {
					var _x8 = _xScale(_startXY[0]);
					var _y8 = _yScale(_startXY[1]);
					var _x9 = _xScale(_endXY[0]);
					var _y9 = _yScale(_endXY[1]);
					var _x10 = _xScale(_finishXY[0]);
					var _y10 = _yScale(_finishXY[1]);
					ctx.lineWidth = _strokeWidth;
					ctx.strokeStyle = (0, _utils.hexToRGBA)(_stroke, _strokeOpacity);
					ctx.fillStyle = (0, _utils.hexToRGBA)(fill, _fillOpacity);
					ctx.beginPath();
					ctx.moveTo(_x8, _y8);
					ctx.lineTo(_x9, _y9);
					ctx.lineTo(_x10, _y10);
					ctx.lineTo(_x8, _y8);
					ctx.fill();
					ctx.stroke();
				}
			}
		}
	}, {
		key: "getRayCoordinates",
		value: function getRayCoordinates(_ref) {
			var end = _ref.end,
			    xDirection = _ref.xDirection,
			    slope = _ref.slope;

			if (xDirection) {
				return {
					x1: end[0],
					y1: end[1],
					x2: end[0] + 1000,
					y2: slope * (end[0] + 1000) + (0, _StraightLine.getYIntercept)(slope, end)
				};
			} else {
				return {
					x1: end[0],
					y1: end[1],
					x2: end[0] - 1000,
					y2: slope * (end[0] - 1000) + (0, _StraightLine.getYIntercept)(slope, end)
				};
			}
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			return moreProps;
		}
	}, {
		key: "render",
		value: function render() {
			var _props4 = this.props,
			    selected = _props4.selected,
			    interactiveCursorClass = _props4.interactiveCursorClass;
			var _props5 = this.props,
			    onDragStart = _props5.onDragStart,
			    onDrag = _props5.onDrag,
			    onDragComplete = _props5.onDragComplete,
			    onHover = _props5.onHover,
			    onUnHover = _props5.onUnHover;


			return _react2.default.createElement(_GenericChartComponent2.default, {
				isHover: this.isHover,

				svgDraw: this.renderSVG,
				canvasToDraw: _GenericComponent.getMouseCanvas,
				canvasDraw: this.drawOnCanvas,

				interactiveCursorClass: interactiveCursorClass,
				selected: selected,

				onDragStart: onDragStart,
				onDrag: onDrag,
				onDragComplete: onDragComplete,
				onHover: onHover,
				onUnHover: onUnHover,

				drawOn: ["mousemove", "mouseleave", "pan", "drag"]
			});
		}
	}]);

	return ChannelWithArea;
}(_react.Component);

ChannelWithArea.propTypes = {
	interactiveCursorClass: _propTypes2.default.shape(),
	startXY: _propTypes2.default.shape(),
	endXY: _propTypes2.default.shape(),
	finishXY: _propTypes2.default.shape(),
	stroke: _propTypes2.default.string.isRequired,
	strokeMedianOne: _propTypes2.default.string.isRequired,
	strokeMedianHalf: _propTypes2.default.string.isRequired,
	strokeWidth: _propTypes2.default.number.isRequired,
	fill: _propTypes2.default.string.isRequired,
	fillOpacity: _propTypes2.default.number.isRequired,
	strokeOpacity: _propTypes2.default.number.isRequired,
	type: _propTypes2.default.oneOf(["PITCHFORK", // extends from -Infinity to +Infinity
	"TRIANGLE"] // extends to +/-Infinity in one direction
	),
	onDragStart: _propTypes2.default.func.isRequired,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onHover: _propTypes2.default.func,
	onUnHover: _propTypes2.default.func,

	defaultClassName: _propTypes2.default.string,

	tolerance: _propTypes2.default.number.isRequired,
	selected: _propTypes2.default.bool.isRequired
};

ChannelWithArea.defaultProps = {
	onDragStart: _utils.noop,
	onDrag: _utils.noop,
	onDragComplete: _utils.noop,
	strokeWidth: 1,
	tolerance: 4,
	selected: false
};

exports.default = ChannelWithArea;
//# sourceMappingURL=PitchFork.js.map