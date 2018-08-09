"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isHovering2 = isHovering2;
exports.isHovering = isHovering;
exports.getSlope = getSlope;
exports.getYIntercept = getYIntercept;
exports.generateLine = generateLine;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Angle = function (_Component) {
	_inherits(Angle, _Component);

	function Angle(props) {
		_classCallCheck(this, Angle);

		var _this = _possibleConstructorReturn(this, (Angle.__proto__ || Object.getPrototypeOf(Angle)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(Angle, [{
		key: "isHover",
		value: function isHover(moreProps) {
			var _props = this.props,
			    tolerance = _props.tolerance,
			    onHover = _props.onHover,
			    type = _props.type;

			if ((0, _utils.isDefined)(onHover)) {
				if (type === "ANGLE") {
					var _props2 = this.props,
					    x1Value = _props2.x1Value,
					    x2Value = _props2.x2Value,
					    y1Value = _props2.y1Value,
					    y2Value = _props2.y2Value,
					    _type = _props2.type;
					var mouseXY = moreProps.mouseXY,
					    xScale = moreProps.xScale;
					var yScale = moreProps.chartConfig.yScale;


					var hovering = isHovering({
						x1Value: x1Value, y1Value: y1Value,
						x2Value: x2Value, y2Value: y2Value,
						mouseXY: mouseXY,
						type: _type,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					return hovering;
				} else if (type === "RECTANGLE") {
					var _props3 = this.props,
					    _x1Value = _props3.x1Value,
					    _x2Value = _props3.x2Value,
					    _y1Value = _props3.y1Value,
					    _y2Value = _props3.y2Value,
					    _type2 = _props3.type;
					var _mouseXY = moreProps.mouseXY,
					    _xScale = moreProps.xScale;
					var _yScale = moreProps.chartConfig.yScale;


					var hovering1 = isHovering({
						x1Value: _x1Value, y1Value: _y1Value,
						x2Value: _x1Value, y2Value: _y2Value,
						mouseXY: _mouseXY,
						type: _type2,
						tolerance: tolerance,
						xScale: _xScale,
						yScale: _yScale
					});
					var hovering2 = isHovering({
						x1Value: _x1Value, y1Value: _y2Value,
						x2Value: _x2Value, y2Value: _y2Value,
						mouseXY: _mouseXY,
						type: _type2,
						tolerance: tolerance,
						xScale: _xScale,
						yScale: _yScale
					});
					var hovering3 = isHovering({
						x1Value: _x2Value, y1Value: _y1Value,
						x2Value: _x2Value, y2Value: _y2Value,
						mouseXY: _mouseXY,
						type: _type2,
						tolerance: tolerance,
						xScale: _xScale,
						yScale: _yScale
					});
					var hovering4 = isHovering({
						x1Value: _x1Value, y1Value: _y1Value,
						x2Value: _x2Value, y2Value: _y1Value,
						mouseXY: _mouseXY,
						type: _type2,
						tolerance: tolerance,
						xScale: _xScale,
						yScale: _yScale
					});
					return hovering1 || hovering2 || hovering3 || hovering4;
				} else if (type === "CIRCLE") {
					var _props4 = this.props,
					    _x1Value2 = _props4.x1Value,
					    _x2Value2 = _props4.x2Value,
					    _y1Value2 = _props4.y1Value,
					    _y2Value2 = _props4.y2Value;
					var _mouseXY2 = moreProps.mouseXY,
					    _xScale2 = moreProps.xScale;
					var _yScale2 = moreProps.chartConfig.yScale;

					var x1 = _xScale2(_x1Value2);
					var x2 = _xScale2(_x2Value2);
					var y1 = _yScale2(_y1Value2);
					var y2 = _yScale2(_y2Value2);
					if (Math.pow(_mouseXY2[0] - (x1 + x2) / 2, 2) / Math.pow(Math.abs((x2 - x1) / 2), 2) + Math.pow(_mouseXY2[1] - (y1 + y2) / 2, 2) / Math.pow(Math.abs((y2 - y1) / 2), 2) <= 1) {
						return true;
					}
				}
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props5 = this.props,
			    stroke = _props5.stroke,
			    strokeWidth = _props5.strokeWidth,
			    strokeOpacity = _props5.strokeOpacity,
			    type = _props5.type,
			    fill = _props5.fill,
			    fillOpacity = _props5.fillOpacity,
			    fontFill = _props5.fontFill;

			if (type === "ANGLE") {
				var _helper = helper(this.props, moreProps),
				    x1 = _helper.x1,
				    y1 = _helper.y1,
				    x2 = _helper.x2,
				    y2 = _helper.y2,
				    x3 = _helper.x3,
				    y3 = _helper.y3;

				var rad = Math.atan2(y2 - y1, x2 - x1) || 0;
				ctx.lineWidth = strokeWidth;
				ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);
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
					ctx.fillStyle = fontFill;
					ctx.fillText(Math.round(-Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180) + "°", x3 + 5, y3 + 10);
				}
			} else if (type === "RECTANGLE") {
				var _helper2 = helper(this.props, moreProps),
				    _x = _helper2.x1,
				    _y = _helper2.y1,
				    _x2 = _helper2.x2,
				    _y2 = _helper2.y2;

				ctx.lineWidth = strokeWidth;
				ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);
				ctx.fillStyle = (0, _utils.hexToRGBA)(fill, fillOpacity);
				ctx.setLineDash([]);
				ctx.beginPath();
				ctx.moveTo(_x, _y);
				ctx.lineTo(_x, _y2);
				ctx.lineTo(_x2, _y2);
				ctx.lineTo(_x2, _y);
				ctx.lineTo(_x, _y);
				ctx.fill();
				ctx.stroke();
			} else if (type === "CIRCLE") {
				var _helper3 = helper(this.props, moreProps),
				    _x3 = _helper3.x1,
				    _y3 = _helper3.y1,
				    _x4 = _helper3.x2,
				    _y4 = _helper3.y2;

				ctx.lineWidth = strokeWidth;
				ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);
				ctx.fillStyle = (0, _utils.hexToRGBA)(fill, fillOpacity);
				ctx.setLineDash([]);
				ctx.beginPath();
				ctx.ellipse((_x3 + _x4) / 2, (_y3 + _y4) / 2, Math.abs((_x4 - _x3) / 2), Math.abs((_y4 - _y3) / 2), 2 * Math.PI, 0, 2 * Math.PI, true);
				ctx.fill();
				ctx.stroke();
			}
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props6 = this.props,
			    stroke = _props6.stroke,
			    strokeWidth = _props6.strokeWidth,
			    strokeOpacity = _props6.strokeOpacity,
			    strokeDasharray = _props6.strokeDasharray;


			var lineWidth = strokeWidth;

			var _helper4 = helper(this.props, moreProps),
			    x1 = _helper4.x1,
			    y1 = _helper4.y1,
			    x2 = _helper4.x2,
			    y2 = _helper4.y2;

			return _react2.default.createElement("line", {
				x1: x1, y1: y1, x2: x2, y2: y2,
				stroke: stroke, strokeWidth: lineWidth,
				strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray),
				strokeOpacity: strokeOpacity });
		}
	}, {
		key: "render",
		value: function render() {
			var _props7 = this.props,
			    selected = _props7.selected,
			    interactiveCursorClass = _props7.interactiveCursorClass;
			var _props8 = this.props,
			    onDragStart = _props8.onDragStart,
			    onDrag = _props8.onDrag,
			    onDragComplete = _props8.onDragComplete,
			    onHover = _props8.onHover,
			    onUnHover = _props8.onUnHover;


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

				drawOn: ["mousemove", "pan", "drag"]
			});
		}
	}]);

	return Angle;
}(_react.Component);

function isHovering2(start, end, _ref, tolerance) {
	var _ref2 = _slicedToArray(_ref, 2),
	    mouseX = _ref2[0],
	    mouseY = _ref2[1];

	var m = getSlope(start, end);

	if ((0, _utils.isDefined)(m)) {
		var b = getYIntercept(m, end);
		var y = m * mouseX + b;
		return mouseY < y + tolerance && mouseY > y - tolerance && mouseX > Math.min(start[0], end[0]) - tolerance && mouseX < Math.max(start[0], end[0]) + tolerance;
	} else {
		return mouseY >= Math.min(start[1], end[1]) && mouseY <= Math.max(start[1], end[1]) && mouseX < start[0] + tolerance && mouseX > start[0] - tolerance;
	}
}

function isHovering(_ref3) {
	var x1Value = _ref3.x1Value,
	    y1Value = _ref3.y1Value,
	    x2Value = _ref3.x2Value,
	    y2Value = _ref3.y2Value,
	    mouseXY = _ref3.mouseXY,
	    type = _ref3.type,
	    tolerance = _ref3.tolerance,
	    xScale = _ref3.xScale,
	    yScale = _ref3.yScale;


	var line = generateLine({
		type: type,
		start: [x1Value, y1Value],
		end: [x2Value, y2Value],
		xScale: xScale,
		yScale: yScale
	});

	var start = [xScale(line.x1), yScale(line.y1)];
	var end = [xScale(line.x2), yScale(line.y2)];

	var m = getSlope(start, end);

	var _mouseXY3 = _slicedToArray(mouseXY, 2),
	    mouseX = _mouseXY3[0],
	    mouseY = _mouseXY3[1];

	if ((0, _utils.isDefined)(m)) {
		var b = getYIntercept(m, end);
		var y = m * mouseX + b;

		return mouseY < y + tolerance && mouseY > y - tolerance && mouseX > Math.min(start[0], end[0]) - tolerance && mouseX < Math.max(start[0], end[0]) + tolerance;
	} else {
		return mouseY >= Math.min(start[1], end[1]) && mouseY <= Math.max(start[1], end[1]) && mouseX < start[0] + tolerance && mouseX > start[0] - tolerance;
	}
}

function helper(props, moreProps) {
	var x1Value = props.x1Value,
	    x2Value = props.x2Value,
	    y1Value = props.y1Value,
	    y2Value = props.y2Value,
	    type = props.type;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;


	var modLine = generateLine({
		type: type,
		start: [x1Value, y1Value],
		end: [x2Value, y2Value],
		xScale: xScale,
		yScale: yScale
	});

	if (type === "ANGLE") {
		var x1 = xScale(modLine.x1);
		var y1 = yScale(modLine.y1);
		var x2 = xScale(modLine.x2);
		var y2 = yScale(modLine.y2);
		var x3 = xScale(modLine.x1) + 50;
		var y3 = yScale(modLine.y1);

		return {
			x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3
		};
	} else if (type === "RECTANGLE" || type === "CIRCLE") {
		var _x5 = xScale(modLine.x1);
		var _y5 = yScale(modLine.y1);
		var _x6 = xScale(modLine.x2);
		var _y6 = yScale(modLine.y2);

		return {
			x1: _x5, y1: _y5, x2: _x6, y2: _y6
		};
	}
}

function getSlope(start, end) {
	var m /* slope */ = end[0] === start[0] ? undefined : (end[1] - start[1]) / (end[0] - start[0]);
	return m;
}
function getYIntercept(m, end) {
	var b /* y intercept */ = -1 * m * end[0] + end[1];
	return b;
}

function generateLine(_ref4) {
	var type = _ref4.type,
	    start = _ref4.start,
	    end = _ref4.end,
	    xScale = _ref4.xScale,
	    yScale = _ref4.yScale;

	var m /* slope */ = getSlope(start, end);
	// console.log(end[0] - start[0], m)
	var b /* y intercept */ = getYIntercept(m, start);

	return getLineCoordinates({
		type: type, start: start, end: end, xScale: xScale, yScale: yScale, m: m, b: b
	});
}

function getLineCoordinates(_ref5) {
	var start = _ref5.start,
	    end = _ref5.end;

	var _start = _slicedToArray(start, 2),
	    x1 = _start[0],
	    y1 = _start[1];

	var _end = _slicedToArray(end, 2),
	    x2 = _end[0],
	    y2 = _end[1];

	if (end[0] === start[0]) {
		return {
			x1: x1,
			y1: start[1],
			x2: x1,
			y2: end[1]
		};
	}

	return {
		x1: x1, y1: y1,
		x2: x2, y2: y2
	};
}

Angle.propTypes = {
	x1Value: _propTypes2.default.any.isRequired,
	x2Value: _propTypes2.default.any.isRequired,
	y1Value: _propTypes2.default.any.isRequired,
	y2Value: _propTypes2.default.any.isRequired,

	interactiveCursorClass: _propTypes2.default.string,
	stroke: _propTypes2.default.string.isRequired,
	strokeWidth: _propTypes2.default.number.isRequired,
	strokeOpacity: _propTypes2.default.number.isRequired,
	strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),

	type: _propTypes2.default.oneOf(["ANGLE", "RECTANGLE", "CIRCLE"]).isRequired,

	onEdge1Drag: _propTypes2.default.func.isRequired,
	onEdge2Drag: _propTypes2.default.func.isRequired,
	onDragStart: _propTypes2.default.func.isRequired,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onHover: _propTypes2.default.func,
	onUnHover: _propTypes2.default.func,

	defaultClassName: _propTypes2.default.string,

	r: _propTypes2.default.number.isRequired,
	edgeFill: _propTypes2.default.string.isRequired,
	fontFill: _propTypes2.default.string.isRequired,
	edgeStroke: _propTypes2.default.string.isRequired,
	edgeStrokeWidth: _propTypes2.default.number.isRequired,
	withEdge: _propTypes2.default.bool.isRequired,
	children: _propTypes2.default.func.isRequired,
	tolerance: _propTypes2.default.number.isRequired,
	selected: _propTypes2.default.bool.isRequired,
	fill: _propTypes2.default.string.isRequired,
	fillOpacity: _propTypes2.default.number.isRequired
};

Angle.defaultProps = {
	onEdge1Drag: _utils.noop,
	onEdge2Drag: _utils.noop,
	onDragStart: _utils.noop,
	onDrag: _utils.noop,
	onDragComplete: _utils.noop,
	withEdge: false,
	children: _utils.noop,
	tolerance: 7,
	selected: false
};

exports.default = Angle;
//# sourceMappingURL=Angle.js.map