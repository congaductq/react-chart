"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Path = require("d3-path");

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _StraightLine = require("./StraightLine");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullLine = function (_Component) {
	_inherits(FullLine, _Component);

	function FullLine(props) {
		_classCallCheck(this, FullLine);

		var _this = _possibleConstructorReturn(this, (FullLine.__proto__ || Object.getPrototypeOf(FullLine)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(FullLine, [{
		key: "isHover",
		value: function isHover(moreProps) {
			var _props = this.props,
			    tolerance = _props.tolerance,
			    onHover = _props.onHover,
			    startXY = _props.startXY,
			    type = _props.type;
			var mouseXY = moreProps.mouseXY,
			    xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale;

			if ((0, _utils.isDefined)(onHover) && (0, _utils.isDefined)(startXY)) {
				var _startXY = _slicedToArray(startXY, 2),
				    x1 = _startXY[0],
				    y1 = _startXY[1];

				if (type === "VERTICAL") {
					var lineHover = (0, _StraightLine.isHovering)({
						x1Value: x1,
						y1Value: y1 - 10000,
						x2Value: x1,
						y2Value: y1 + 10000,
						type: "LINE",
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					return lineHover;
				} else if (type === "HORIZONTAL") {
					var _lineHover = (0, _StraightLine.isHovering)({
						x1Value: x1 - 5000,
						y1Value: y1,
						x2Value: x1 + 5000,
						y2Value: y1,
						type: "LINE",
						mouseXY: mouseXY,
						tolerance: tolerance,
						xScale: xScale,
						yScale: yScale
					});
					return _lineHover;
				}
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props2 = this.props,
			    stroke = _props2.stroke,
			    strokeWidth = _props2.strokeWidth,
			    strokeOpacity = _props2.strokeOpacity;

			var line = helper(this.props, moreProps);

			if ((0, _utils.isDefined)(line)) {
				var x1 = line.x1,
				    y1 = line.y1,
				    x2 = line.x2,
				    y2 = line.y2;

				ctx.lineWidth = strokeWidth;
				ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
			}
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props3 = this.props,
			    stroke = _props3.stroke,
			    strokeWidth = _props3.strokeWidth,
			    strokeOpacity = _props3.strokeOpacity;

			var _helper = helper(this.props, moreProps),
			    line1 = _helper.line1,
			    line2 = _helper.line2;

			if ((0, _utils.isDefined)(line1)) {
				var x1 = line1.x1,
				    y1 = line1.y1,
				    x2 = line1.x2,
				    y2 = line1.y2;

				var line = (0, _utils.isDefined)(line2) ? _react2.default.createElement("line", {
					strokeWidth: strokeWidth,
					stroke: stroke,
					strokeOpacity: strokeOpacity,
					x1: x1,
					y1: line2.y1,
					x2: x2,
					y2: line2.y2
				}) : null;
				var area = (0, _utils.isDefined)(line2) ? _react2.default.createElement("path", {
					d: getPath(line1, line2)
				}) : null;

				return _react2.default.createElement(
					"g",
					null,
					_react2.default.createElement("line", {
						strokeWidth: strokeWidth,
						stroke: stroke,
						strokeOpacity: strokeOpacity,
						x1: x1,
						y1: y1,
						x2: x2,
						y2: y2
					}),
					line,
					area
				);
			}
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

	return FullLine;
}(_react.Component);

function getPath(line1, line2) {
	var ctx = (0, _d3Path.path)();
	ctx.moveTo(line1.x1, line1.y1);
	ctx.lineTo(line1.x2, line1.y2);
	ctx.lineTo(line1.x2, line2.y2);
	ctx.lineTo(line1.x1, line2.y1);

	ctx.closePath();
	return ctx.toString();
}

function helper(props, moreProps) {
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;
	var startXY = props.startXY,
	    type = props.type;

	var _startXY2 = _slicedToArray(startXY, 2),
	    x1Value = _startXY2[0],
	    y1Value = _startXY2[1];

	var x1 = void 0,
	    x2 = void 0,
	    y1 = void 0,
	    y2 = void 0;
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
	return { x1: x1, y1: y1, x2: x2, y2: y2 };
}

FullLine.propTypes = {
	startXY: _propTypes2.default.string,
	interactiveCursorClass: _propTypes2.default.string,
	stroke: _propTypes2.default.string.isRequired,
	strokeWidth: _propTypes2.default.number.isRequired,
	fill: _propTypes2.default.string.isRequired,
	fillOpacity: _propTypes2.default.number.isRequired,
	strokeOpacity: _propTypes2.default.number.isRequired,

	type: _propTypes2.default.oneOf(["VERTICAL", "HORIZONTAL"]).isRequired,

	onDragStart: _propTypes2.default.func.isRequired,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onHover: _propTypes2.default.func,
	onUnHover: _propTypes2.default.func,

	defaultClassName: _propTypes2.default.string,

	tolerance: _propTypes2.default.number.isRequired,
	selected: _propTypes2.default.bool.isRequired
};

FullLine.defaultProps = {
	onDragStart: _utils.noop,
	onDrag: _utils.noop,
	onDragComplete: _utils.noop,

	strokeWidth: 1,
	tolerance: 4,
	selected: false
};

exports.default = FullLine;
//# sourceMappingURL=FullLine.js.map