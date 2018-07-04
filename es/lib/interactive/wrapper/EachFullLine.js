var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import { isDefined, noop } from "../../utils";
import { getXValue } from "../../utils/ChartDataUtil";
import { saveNodeType, isHover } from "../utils";

import ClickableCircle from "../components/ClickableCircle";
import FullLineComponent from "../components/FullLine";
import HoverTextNearMouse from "../components/HoverTextNearMouse";

var FullLine = function (_Component) {
	_inherits(FullLine, _Component);

	function FullLine(props) {
		_classCallCheck(this, FullLine);

		var _this = _possibleConstructorReturn(this, (FullLine.__proto__ || Object.getPrototypeOf(FullLine)).call(this, props));

		_this.handleLineDrag = _this.handleLineDrag.bind(_this);

		_this.handleDragStart = _this.handleDragStart.bind(_this);
		_this.handleChannelDrag = _this.handleChannelDrag.bind(_this);

		_this.getEdgeCircle = _this.getEdgeCircle.bind(_this);
		_this.handleHover = _this.handleHover.bind(_this);

		_this.isHover = isHover.bind(_this);
		_this.saveNodeType = saveNodeType.bind(_this);
		_this.nodes = {};

		_this.state = {
			hover: false
		};
		return _this;
	}

	_createClass(FullLine, [{
		key: "handleHover",
		value: function handleHover(moreProps) {
			if (this.state.hover !== moreProps.hovering) {
				this.setState({
					hover: moreProps.hovering
				});
			}
		}
	}, {
		key: "handleDragStart",
		value: function handleDragStart() {
			var _props = this.props,
			    x = _props.x,
			    y = _props.y;


			this.dragStart = {
				x: x, y: y
			};
		}
	}, {
		key: "handleChannelDrag",
		value: function handleChannelDrag(moreProps) {
			var _props2 = this.props,
			    index = _props2.index,
			    onDrag = _props2.onDrag;
			var _dragStart = this.dragStart,
			    x = _dragStart.x,
			    y = _dragStart.y;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    fullData = moreProps.fullData;
			var startPos = moreProps.startPos,
			    mouseXY = moreProps.mouseXY;


			var x1 = xScale(x);
			var y1 = yScale(y);

			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];

			var newX1Value = getXValue(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);
			var newY1Value = yScale.invert(y1 - dy);

			onDrag(index, {
				x: newX1Value,
				y: newY1Value
			});
		}
	}, {
		key: "handleLineDrag",
		value: function handleLineDrag(moreProps) {
			var _props3 = this.props,
			    index = _props3.index,
			    onDrag = _props3.onDrag;
			var _dragStart2 = this.dragStart,
			    x = _dragStart2.x,
			    y = _dragStart2.y;
			var startPos = moreProps.startPos,
			    mouseXY = moreProps.mouseXY,
			    xAccessor = moreProps.xAccessor,
			    xScale = moreProps.xScale,
			    fullData = moreProps.fullData,
			    yScale = moreProps.chartConfig.yScale;


			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];

			var x1 = xScale(x);
			var y1 = yScale(y);

			var newX1Value = getXValue(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);
			var newY1Value = yScale.invert(y1 - dy);

			onDrag(index, {
				x: newX1Value,
				y: newY1Value
			});
		}
	}, {
		key: "getEdgeCircle",
		value: function getEdgeCircle(_ref) {
			var xy = _ref.xy,
			    dragHandler = _ref.dragHandler,
			    cursor = _ref.cursor,
			    fill = _ref.fill,
			    edge = _ref.edge;
			var hover = this.state.hover;
			var appearance = this.props.appearance;
			var edgeStroke = appearance.edgeStroke,
			    edgeStrokeWidth = appearance.edgeStrokeWidth,
			    r = appearance.r;
			var selected = this.props.selected;
			var onDragComplete = this.props.onDragComplete;


			return React.createElement(ClickableCircle, {
				ref: this.saveNodeType(edge),

				show: selected || hover,
				cx: xy[0],
				cy: xy[1],
				r: r,
				fill: fill,
				stroke: edgeStroke,
				strokeWidth: edgeStrokeWidth,
				interactiveCursorClass: cursor,

				onDragStart: this.handleDragStart,
				onDrag: dragHandler,
				onDragComplete: onDragComplete });
		}
	}, {
		key: "render",
		value: function render() {
			var _props4 = this.props,
			    x = _props4.x,
			    y = _props4.y,
			    interactive = _props4.interactive,
			    hoverText = _props4.hoverText,
			    appearance = _props4.appearance,
			    onDragComplete = _props4.onDragComplete,
			    selected = _props4.selected,
			    type = _props4.type;
			var edgeFill = appearance.edgeFill,
			    stroke = appearance.stroke,
			    strokeWidth = appearance.strokeWidth,
			    strokeOpacity = appearance.strokeOpacity,
			    fill = appearance.fill,
			    fillOpacity = appearance.fillOpacity;
			var hover = this.state.hover;

			var hoverTextEnabled = hoverText.enable,
			    restHoverTextProps = _objectWithoutProperties(hoverText, ["enable"]);

			var hoverHandler = interactive ? { onHover: this.handleHover, onUnHover: this.handleHover } : {};

			var line1Edge = isDefined(x) && isDefined(y) ? React.createElement(
				"g",
				null,
				this.getEdgeCircle({
					xy: [x, y],
					dragHandler: this.handleLineDrag,
					cursor: "react-stockcharts-move-cursor",
					fill: edgeFill,
					edge: "fullLineEdge"
				})
			) : null;
			return React.createElement(
				"g",
				null,
				React.createElement(FullLineComponent, _extends({
					ref: this.saveNodeType("fullLine"),
					selected: selected || hover

				}, hoverHandler, {
					type: type,
					startXY: [x, y],
					stroke: stroke,
					strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
					strokeOpacity: strokeOpacity,
					fill: fill,
					fillOpacity: fillOpacity,
					interactiveCursorClass: "react-stockcharts-move-cursor",
					onDragStart: this.handleDragStart,
					onDrag: this.handleChannelDrag,
					onDragComplete: onDragComplete
				})),
				line1Edge,
				React.createElement(HoverTextNearMouse, _extends({
					show: hoverTextEnabled && hover && !selected
				}, restHoverTextProps))
			);
		}
	}]);

	return FullLine;
}(Component);

FullLine.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
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
		r: PropTypes.number.isRequired
	}).isRequired,
	type: PropTypes.oneOf(["VERTICAL", "HORIZONTAL"]).isRequired,
	index: PropTypes.number,
	onDrag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired
};

FullLine.defaultProps = {
	yDisplayFormat: function yDisplayFormat(d) {
		return d.toFixed(2);
	},
	interactive: true,
	selected: false,

	onDrag: noop,
	onDragComplete: noop,
	hoverText: {
		enable: false
	}
};

export default FullLine;
//# sourceMappingURL=EachFullLine.js.map