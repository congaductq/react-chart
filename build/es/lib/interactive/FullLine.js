var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import { isDefined, noop } from "../utils";
import { terminate, saveNodeType, isHoverForInteractiveType, getValueFromOverride } from "./utils";
import EachFullLine from "./wrapper/EachFullLine";
import HoverTextNearMouse from "./components/HoverTextNearMouse";
import GenericChartComponent from "../GenericChartComponent";
import { getMouseCanvas } from "../GenericComponent";

var FullLine = function (_Component) {
	_inherits(FullLine, _Component);

	function FullLine(props) {
		_classCallCheck(this, FullLine);

		var _this = _possibleConstructorReturn(this, (FullLine.__proto__ || Object.getPrototypeOf(FullLine)).call(this, props));

		_this.handleEnd = _this.handleEnd.bind(_this);
		_this.handleDrawChannel = _this.handleDrawChannel.bind(_this);
		_this.handleDragChannel = _this.handleDragChannel.bind(_this);
		_this.handleDragChannelComplete = _this.handleDragChannelComplete.bind(_this);

		_this.terminate = terminate.bind(_this);
		_this.saveNodeType = saveNodeType.bind(_this);

		_this.getSelectionState = isHoverForInteractiveType("trends").bind(_this);

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

			if (isDefined(override)) {
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

			if (isDefined(current)) {
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

			if (isDefined(current)) {
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

			var tempChannel = isDefined(current) && isDefined(current.x) && isDefined(current.y) ? React.createElement(EachFullLine, _extends({
				type: type,
				interactive: false
			}, current, {
				appearance: appearance,
				hoverText: hoverText })) : null;
			return React.createElement(
				"g",
				null,
				trends.map(function (each, idx) {
					var eachAppearance = isDefined(each.appearance) ? _extends({}, appearance, each.appearance) : appearance;
					return React.createElement(EachFullLine, { key: idx,
						type: each.type,
						ref: _this4.saveNodeType(idx),
						index: idx,
						selected: each.selected,
						hoverText: hoverText,
						x: getValueFromOverride(override, idx, "x", each.x),
						y: getValueFromOverride(override, idx, "y", each.y),
						appearance: eachAppearance,
						onDrag: _this4.handleDragChannel,
						onDragComplete: _this4.handleDragChannelComplete
					});
				}),
				tempChannel,
				React.createElement(GenericChartComponent, {
					onClick: this.handleEnd,
					onMouseMove: this.handleDrawChannel,
					svgDraw: noop,
					canvasDraw: noop,
					canvasToDraw: getMouseCanvas,
					drawOn: ["mousemove", "pan"]
				}),
				";"
			);
		}
	}]);

	return FullLine;
}(Component);

FullLine.propTypes = {
	type: PropTypes.oneOf(["VERTICAL", "HORIZONTAL"]).isRequired,
	snap: PropTypes.bool.isRequired,
	enabled: PropTypes.bool.isRequired,
	snapTo: PropTypes.func,
	shouldDisableSnap: PropTypes.func.isRequired,

	onStart: PropTypes.func.isRequired,
	onComplete: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,

	currentPositionStroke: PropTypes.string,
	currentPositionStrokeWidth: PropTypes.number,
	currentPositionOpacity: PropTypes.number,
	currentPositionRadius: PropTypes.number,

	hoverText: PropTypes.object.isRequired,
	trends: PropTypes.array.isRequired,

	appearance: PropTypes.shape({
		stroke: PropTypes.string.isRequired,
		strokeOpacity: PropTypes.number.isRequired,
		strokeWidth: PropTypes.number.isRequired,
		fill: PropTypes.string.isRequired,
		fillOpacity: PropTypes.number.isRequired,
		edgeStroke: PropTypes.string.isRequired,
		edgeFill: PropTypes.string.isRequired,
		edgeFill2: PropTypes.string.isRequired,
		edgeStrokeWidth: PropTypes.number.isRequired,
		r: PropTypes.number.isRequired
	}).isRequired
};

FullLine.defaultProps = {
	type: "VERTICAL",
	onStart: noop,
	onComplete: noop,
	onSelect: noop,
	shouldDisableSnap: function shouldDisableSnap(e) {
		return e.button === 2 || e.shiftKey;
	},

	currentPositionStroke: "#000000",
	currentPositionOpacity: 1,
	currentPositionStrokeWidth: 3,
	currentPositionRadius: 4,

	hoverText: _extends({}, HoverTextNearMouse.defaultProps, {
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

export default FullLine;
//# sourceMappingURL=FullLine.js.map