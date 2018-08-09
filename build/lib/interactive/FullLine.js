"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils");

var _utils2 = require("./utils");

var _EachFullLine = require("./wrapper/EachFullLine");

var _EachFullLine2 = _interopRequireDefault(_EachFullLine);

var _HoverTextNearMouse = require("./components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../GenericComponent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullLine = function (_Component) {
	_inherits(FullLine, _Component);

	function FullLine(props) {
		_classCallCheck(this, FullLine);

		var _this = _possibleConstructorReturn(this, (FullLine.__proto__ || Object.getPrototypeOf(FullLine)).call(this, props));

		_this.handleEnd = _this.handleEnd.bind(_this);
		_this.handleDrawChannel = _this.handleDrawChannel.bind(_this);
		_this.handleDragChannel = _this.handleDragChannel.bind(_this);
		_this.handleDragChannelComplete = _this.handleDragChannelComplete.bind(_this);

		_this.terminate = _utils2.terminate.bind(_this);
		_this.saveNodeType = _utils2.saveNodeType.bind(_this);

		_this.getSelectionState = (0, _utils2.isHoverForInteractiveType)("trends").bind(_this);

		_this.nodes = [];
		_this.state = {};
		return _this;
	}

	_createClass(FullLine, [{
		key: "handleDragChannel",
		value: function handleDragChannel(index, newXYValue) {
			this.setState({
				override: _extends({
					index: index
				}, newXYValue)
			});
		}
	}, {
		key: "handleDragChannelComplete",
		value: function handleDragChannelComplete(moreProps) {
			var _this2 = this;

			var override = this.state.override;

			if ((0, _utils.isDefined)(override)) {
				var trends = this.props.trends;

				var newTrends = trends.map(function (each, idx) {
					return idx === override.index ? _extends({}, each, {
						x: override.x,
						y: override.y,
						selected: true
					}) : _extends({}, each, {
						selected: false
					});
				});

				this.setState({
					override: null
				}, function () {
					_this2.props.onComplete(newTrends, moreProps);
				});
			}
		}
	}, {
		key: "handleDrawChannel",
		value: function handleDrawChannel(moreProps) {
			var current = this.state.current;

			if ((0, _utils.isDefined)(current)) {
				var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
				    mouseY = _moreProps$mouseXY[1],
				    yScale = moreProps.chartConfig.yScale,
				    xAccessor = moreProps.xAccessor,
				    currentItem = moreProps.currentItem;

				var xyValue = [xAccessor(currentItem), yScale.invert(mouseY)];
				this.setState({
					current: {
						x: xyValue[0],
						y: xyValue[1]
					}
				});
			}
		}
	}, {
		key: "handleEnd",
		value: function handleEnd(moreProps, e) {
			var _this3 = this;

			var current = this.state.current;

			if ((0, _utils.isDefined)(current)) {
				var _props = this.props,
				    trends = _props.trends,
				    appearance = _props.appearance,
				    type = _props.type;

				var _moreProps$mouseXY2 = _slicedToArray(moreProps.mouseXY, 2),
				    mouseY = _moreProps$mouseXY2[1],
				    yScale = moreProps.chartConfig.yScale,
				    xAccessor = moreProps.xAccessor,
				    currentItem = moreProps.currentItem;

				var xyValue = [xAccessor(currentItem), yScale.invert(mouseY)];
				var newTrends = [].concat(_toConsumableArray(trends.map(function (d) {
					return _extends({}, d, { selected: false });
				})), [{
					selected: true,
					x: xyValue[0],
					y: xyValue[1],
					appearance: appearance,
					type: type
				}]);
				this.setState({
					current: null,
					trends: newTrends
				}, function () {
					_this3.props.onComplete(newTrends, moreProps, e);
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			var _props2 = this.props,
			    appearance = _props2.appearance,
			    trends = _props2.trends,
			    hoverText = _props2.hoverText,
			    type = _props2.type;
			var _state = this.state,
			    current = _state.current,
			    override = _state.override;

			var tempChannel = (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.x) && (0, _utils.isDefined)(current.y) ? _react2.default.createElement(_EachFullLine2.default, _extends({
				type: type,
				interactive: false
			}, current, {
				appearance: appearance,
				hoverText: hoverText })) : null;
			return _react2.default.createElement(
				"g",
				null,
				trends.map(function (each, idx) {
					var eachAppearance = (0, _utils.isDefined)(each.appearance) ? _extends({}, appearance, each.appearance) : appearance;
					return _react2.default.createElement(_EachFullLine2.default, { key: idx,
						type: each.type,
						ref: _this4.saveNodeType(idx),
						index: idx,
						selected: each.selected,
						hoverText: hoverText,
						x: (0, _utils2.getValueFromOverride)(override, idx, "x", each.x),
						y: (0, _utils2.getValueFromOverride)(override, idx, "y", each.y),
						appearance: eachAppearance,
						onDrag: _this4.handleDragChannel,
						onDragComplete: _this4.handleDragChannelComplete
					});
				}),
				tempChannel,
				_react2.default.createElement(_GenericChartComponent2.default, {
					onClick: this.handleEnd,
					onMouseMove: this.handleDrawChannel,
					svgDraw: _utils.noop,
					canvasDraw: _utils.noop,
					canvasToDraw: _GenericComponent.getMouseCanvas,
					drawOn: ["mousemove", "pan"]
				}),
				";"
			);
		}
	}]);

	return FullLine;
}(_react.Component);

FullLine.propTypes = {
	type: _propTypes2.default.oneOf(["VERTICAL", "HORIZONTAL"]).isRequired,
	snap: _propTypes2.default.bool.isRequired,
	enabled: _propTypes2.default.bool.isRequired,
	snapTo: _propTypes2.default.func,
	shouldDisableSnap: _propTypes2.default.func.isRequired,

	onStart: _propTypes2.default.func.isRequired,
	onComplete: _propTypes2.default.func.isRequired,
	onSelect: _propTypes2.default.func.isRequired,

	currentPositionStroke: _propTypes2.default.string,
	currentPositionStrokeWidth: _propTypes2.default.number,
	currentPositionOpacity: _propTypes2.default.number,
	currentPositionRadius: _propTypes2.default.number,

	hoverText: _propTypes2.default.object.isRequired,
	trends: _propTypes2.default.array.isRequired,

	appearance: _propTypes2.default.shape({
		stroke: _propTypes2.default.string.isRequired,
		strokeOpacity: _propTypes2.default.number.isRequired,
		strokeWidth: _propTypes2.default.number.isRequired,
		fill: _propTypes2.default.string.isRequired,
		fillOpacity: _propTypes2.default.number.isRequired,
		edgeStroke: _propTypes2.default.string.isRequired,
		edgeFill: _propTypes2.default.string.isRequired,
		edgeFill2: _propTypes2.default.string.isRequired,
		edgeStrokeWidth: _propTypes2.default.number.isRequired,
		r: _propTypes2.default.number.isRequired
	}).isRequired
};

FullLine.defaultProps = {
	type: "VERTICAL",
	onStart: _utils.noop,
	onComplete: _utils.noop,
	onSelect: _utils.noop,
	shouldDisableSnap: function shouldDisableSnap(e) {
		return e.button === 2 || e.shiftKey;
	},

	currentPositionStroke: "#000000",
	currentPositionOpacity: 1,
	currentPositionStrokeWidth: 3,
	currentPositionRadius: 4,

	hoverText: _extends({}, _HoverTextNearMouse2.default.defaultProps, {
		enable: true,
		bgHeight: 18,
		bgWidth: 90,
		text: "Click to select"
	}),
	trends: [],
	appearance: {
		stroke: "#000000",
		strokeOpacity: 1,
		strokeWidth: 1,
		fill: "#8AAFE2",
		fillOpacity: 0.6,
		edgeStroke: "#000000",
		edgeFill: "#FFFFFF",
		edgeFill2: "#250B98",
		edgeStrokeWidth: 1,
		r: 5
	}
};

exports.default = FullLine;
//# sourceMappingURL=FullLine.js.map