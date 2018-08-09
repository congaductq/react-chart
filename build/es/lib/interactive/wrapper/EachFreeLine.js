var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import { ascending as d3Ascending } from "d3-array";
import { noop, strokeDashTypes } from "../../utils";
import { saveNodeType, isHover } from "../utils";
import { getXValue } from "../../utils/ChartDataUtil";

import FreeLineComponent from "../components/FreeLine";
import ClickableCircle from "../components/ClickableCircle";
import HoverTextNearMouse from "../components/HoverTextNearMouse";

var EachTrendLine = function (_Component) {
	_inherits(EachTrendLine, _Component);

	function EachTrendLine(props) {
		_classCallCheck(this, EachTrendLine);

		var _this = _possibleConstructorReturn(this, (EachTrendLine.__proto__ || Object.getPrototypeOf(EachTrendLine)).call(this, props));

		_this.handleEdge1Drag = _this.handleEdge1Drag.bind(_this);
		_this.handleEdge2Drag = _this.handleEdge2Drag.bind(_this);
		_this.handleLineDragStart = _this.handleLineDragStart.bind(_this);
		_this.handleLineDrag = _this.handleLineDrag.bind(_this);

		_this.handleEdge1DragStart = _this.handleEdge1DragStart.bind(_this);
		_this.handleEdge2DragStart = _this.handleEdge2DragStart.bind(_this);

		_this.handleDragComplete = _this.handleDragComplete.bind(_this);

		_this.handleHover = _this.handleHover.bind(_this);

		_this.isHover = isHover.bind(_this);
		_this.saveNodeType = saveNodeType.bind(_this);
		_this.nodes = {};

		_this.state = {
			hover: false
		};
		return _this;
	}

	_createClass(EachTrendLine, [{
		key: "handleLineDragStart",
		value: function handleLineDragStart() {
			var positionList = this.props.positionList;


			this.dragStart = {
				positionList: positionList
			};
		}
	}, {
		key: "handleLineDrag",
		value: function handleLineDrag(moreProps) {
			var _props = this.props,
			    index = _props.index,
			    onDrag = _props.onDrag;
			var positionList = this.dragStart.positionList;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    fullData = moreProps.fullData;
			var startPos = moreProps.startPos,
			    mouseXY = moreProps.mouseXY;

			var convertedList = new Array();
			positionList.forEach(function (element) {
				convertedList.push([xScale(element[0]), yScale(element[1])]);
			});
			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];
			var posList = convertedList.map(function (x) {
				return [getXValue(xScale, xAccessor, [x[0] - dx, x[1] - dy], fullData), yScale.invert(x[1] - dy)];
			});

			onDrag(index, {
				positionList: posList
			});
		}
	}, {
		key: "handleEdge1DragStart",
		value: function handleEdge1DragStart() {
			this.setState({
				anchor: "edge2"
			});
		}
	}, {
		key: "handleEdge2DragStart",
		value: function handleEdge2DragStart() {
			this.setState({
				anchor: "edge1"
			});
		}
	}, {
		key: "handleDragComplete",
		value: function handleDragComplete() {
			var _props2;

			this.setState({
				anchor: undefined
			});
			(_props2 = this.props).onDragComplete.apply(_props2, arguments);
		}
	}, {
		key: "handleEdge1Drag",
		value: function handleEdge1Drag(moreProps) {
			var _props3 = this.props,
			    index = _props3.index,
			    onDrag = _props3.onDrag;
			var _props4 = this.props,
			    x2Value = _props4.x2Value,
			    y2Value = _props4.y2Value;

			var _getNewXY = getNewXY(moreProps),
			    _getNewXY2 = _slicedToArray(_getNewXY, 2),
			    x1Value = _getNewXY2[0],
			    y1Value = _getNewXY2[1];

			onDrag(index, {
				x1Value: x1Value,
				y1Value: y1Value,
				x2Value: x2Value,
				y2Value: y2Value
			});
		}
	}, {
		key: "handleEdge2Drag",
		value: function handleEdge2Drag(moreProps) {
			var _props5 = this.props,
			    index = _props5.index,
			    onDrag = _props5.onDrag;
			var _props6 = this.props,
			    x1Value = _props6.x1Value,
			    y1Value = _props6.y1Value;

			var _getNewXY3 = getNewXY(moreProps),
			    _getNewXY4 = _slicedToArray(_getNewXY3, 2),
			    x2Value = _getNewXY4[0],
			    y2Value = _getNewXY4[1];

			onDrag(index, {
				x1Value: x1Value,
				y1Value: y1Value,
				x2Value: x2Value,
				y2Value: y2Value
			});
		}
	}, {
		key: "handleHover",
		value: function handleHover(moreProps) {
			if (this.state.hover !== moreProps.hovering) {
				this.setState({
					hover: moreProps.hovering
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _props7 = this.props,
			    positionList = _props7.positionList,
			    stroke = _props7.stroke,
			    strokeWidth = _props7.strokeWidth,
			    strokeOpacity = _props7.strokeOpacity,
			    strokeDasharray = _props7.strokeDasharray,
			    r = _props7.r,
			    edgeStrokeWidth = _props7.edgeStrokeWidth,
			    edgeFill = _props7.edgeFill,
			    fill = _props7.fill,
			    fillOpacity = _props7.fillOpacity,
			    edgeStroke = _props7.edgeStroke,
			    edgeInteractiveCursor = _props7.edgeInteractiveCursor,
			    lineInteractiveCursor = _props7.lineInteractiveCursor,
			    hoverText = _props7.hoverText,
			    selected = _props7.selected,
			    onDragComplete = _props7.onDragComplete;
			var _state = this.state,
			    hover = _state.hover,
			    anchor = _state.anchor;
			// console.log("SELECTED ->", selected);

			var hoverTextEnabled = hoverText.enable,
			    restHoverTextProps = _objectWithoutProperties(hoverText, ["enable"]);

			return React.createElement(
				"g",
				null,
				React.createElement(FreeLineComponent, {
					ref: this.saveNodeType("line"),
					selected: selected || hover,
					onHover: this.handleHover,
					onUnHover: this.handleHover,
					positionList: positionList,
					stroke: stroke,
					fill: fill,
					fillOpacity: fillOpacity,
					strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
					strokeOpacity: strokeOpacity,
					strokeDasharray: strokeDasharray,
					interactiveCursorClass: lineInteractiveCursor,
					onDragStart: this.handleLineDragStart,
					onDrag: this.handleLineDrag,
					onDragComplete: onDragComplete }),
				React.createElement(ClickableCircle, {
					ref: this.saveNodeType("edge1"),
					show: selected || hover,
					cx: positionList[0][0],
					cy: positionList[0][1],
					r: r,
					fill: edgeFill,
					stroke: anchor === "edge1" ? stroke : edgeStroke,
					strokeWidth: edgeStrokeWidth,
					strokeOpacity: 1,
					interactiveCursorClass: edgeInteractiveCursor,
					onDragStart: this.handleLineDragStart,
					onDrag: this.handleLineDrag,
					onDragComplete: this.handleDragComplete }),
				React.createElement(ClickableCircle, {
					ref: this.saveNodeType("edge2"),
					show: selected || hover,
					cx: positionList[positionList.length - 1][0],
					cy: positionList[positionList.length - 1][1],
					r: r,
					fill: edgeFill,
					stroke: anchor === "edge2" ? stroke : edgeStroke,
					strokeWidth: edgeStrokeWidth,
					strokeOpacity: 1,
					interactiveCursorClass: edgeInteractiveCursor,
					onDragStart: this.handleLineDragStart,
					onDrag: this.handleLineDrag,
					onDragComplete: this.handleDragComplete }),
				React.createElement(HoverTextNearMouse, _extends({
					show: hoverTextEnabled && hover && !selected
				}, restHoverTextProps))
			);
		}
	}]);

	return EachTrendLine;
}(Component);

export function getNewXY(moreProps) {
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale,
	    xAccessor = moreProps.xAccessor,
	    plotData = moreProps.plotData,
	    mouseXY = moreProps.mouseXY;

	var mouseY = mouseXY[1];

	var x = getXValue(xScale, xAccessor, mouseXY, plotData);

	var _yScale$domain$slice$ = yScale.domain().slice().sort(d3Ascending),
	    _yScale$domain$slice$2 = _slicedToArray(_yScale$domain$slice$, 2),
	    small = _yScale$domain$slice$2[0],
	    big = _yScale$domain$slice$2[1];

	var y = yScale.invert(mouseY);
	var newY = Math.min(Math.max(y, small), big);
	return [x, newY];
}

EachTrendLine.propTypes = {
	positionList: PropTypes.arrayOf(PropTypes.any).isRequired,
	index: PropTypes.number,
	onDrag: PropTypes.func.isRequired,
	onEdge1Drag: PropTypes.func.isRequired,
	onEdge2Drag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	onUnSelect: PropTypes.func.isRequired,

	r: PropTypes.number.isRequired,
	strokeOpacity: PropTypes.number.isRequired,
	defaultClassName: PropTypes.string,

	selected: PropTypes.bool,

	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),

	edgeStrokeWidth: PropTypes.number.isRequired,
	edgeStroke: PropTypes.string.isRequired,
	edgeInteractiveCursor: PropTypes.string.isRequired,
	lineInteractiveCursor: PropTypes.string.isRequired,
	edgeFill: PropTypes.string.isRequired,
	hoverText: PropTypes.object.isRequired,
	fill: PropTypes.string.isRequired,
	fillOpacity: PropTypes.number.isRequired
};

EachTrendLine.defaultProps = {
	onDrag: noop,
	onEdge1Drag: noop,
	onEdge2Drag: noop,
	onDragComplete: noop,
	onSelect: noop,
	onUnSelect: noop,

	selected: false,

	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	fill: "#8AAFE2",
	fillOpacity: 0.5,
	edgeStrokeWidth: 2,
	r: 5,
	strokeWidth: 1,
	strokeOpacity: 0.7,
	strokeDasharray: "Solid",
	hoverText: {
		enable: false
	}
};

export default EachTrendLine;
//# sourceMappingURL=EachFreeLine.js.map