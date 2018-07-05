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
import PitchFork from "../components/PitchFork";
import HoverTextNearMouse from "../components/HoverTextNearMouse";

var EachPitchFork = function (_Component) {
	_inherits(EachPitchFork, _Component);

	function EachPitchFork(props) {
		_classCallCheck(this, EachPitchFork);

		var _this = _possibleConstructorReturn(this, (EachPitchFork.__proto__ || Object.getPrototypeOf(EachPitchFork)).call(this, props));

		_this.handleChangeStart = _this.handleChangeStart.bind(_this);
		_this.handleChangeEnd = _this.handleChangeEnd.bind(_this);
		_this.handleChangeFinish = _this.handleChangeFinish.bind(_this);
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

	_createClass(EachPitchFork, [{
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
			    startXY = _props.startXY,
			    endXY = _props.endXY,
			    finishXY = _props.finishXY;


			this.dragStart = {
				startXY: startXY, endXY: endXY, finishXY: finishXY
			};
		}
	}, {
		key: "handleChannelDrag",
		value: function handleChannelDrag(moreProps) {
			var _props2 = this.props,
			    index = _props2.index,
			    onDrag = _props2.onDrag;
			var _dragStart = this.dragStart,
			    startXY = _dragStart.startXY,
			    endXY = _dragStart.endXY,
			    finishXY = _dragStart.finishXY;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    fullData = moreProps.fullData;
			var startPos = moreProps.startPos,
			    mouseXY = moreProps.mouseXY;


			var x1 = xScale(startXY[0]);
			var y1 = yScale(startXY[1]);
			var x2 = xScale(endXY[0]);
			var y2 = yScale(endXY[1]);
			var x3 = xScale(finishXY[0]);
			var y3 = yScale(finishXY[1]);

			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];

			var newStartX = getXValue(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);
			var newStartY = yScale.invert(y1 - dy);
			var newEndX = getXValue(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
			var newEndY = yScale.invert(y2 - dy);
			var newFinishX = getXValue(xScale, xAccessor, [x3 - dx, y3 - dy], fullData);
			var newFinishY = yScale.invert(y3 - dy);
			onDrag(index, {
				startXY: [newStartX, newStartY],
				endXY: [newEndX, newEndY],
				finishXY: [newFinishX, newFinishY]
			});
		}
	}, {
		key: "handleChangeStart",
		value: function handleChangeStart(moreProps) {
			var _props3 = this.props,
			    index = _props3.index,
			    onDrag = _props3.onDrag;
			var _dragStart2 = this.dragStart,
			    startXY = _dragStart2.startXY,
			    endXY = _dragStart2.endXY,
			    finishXY = _dragStart2.finishXY;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    fullData = moreProps.fullData;
			var startPos = moreProps.startPos,
			    mouseXY = moreProps.mouseXY;


			var x2 = xScale(startXY[0]);
			var y2 = yScale(startXY[1]);

			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];

			var newFinishX = getXValue(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
			var newFinishY = yScale.invert(y2 - dy);
			onDrag(index, { endXY: endXY, finishXY: finishXY,
				startXY: [newFinishX, newFinishY]
			});
		}
	}, {
		key: "handleChangeEnd",
		value: function handleChangeEnd(moreProps) {
			var _props4 = this.props,
			    index = _props4.index,
			    onDrag = _props4.onDrag;
			var _dragStart3 = this.dragStart,
			    startXY = _dragStart3.startXY,
			    endXY = _dragStart3.endXY,
			    finishXY = _dragStart3.finishXY;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    fullData = moreProps.fullData;
			var startPos = moreProps.startPos,
			    mouseXY = moreProps.mouseXY;


			var x2 = xScale(endXY[0]);
			var y2 = yScale(endXY[1]);

			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];

			var newFinishX = getXValue(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
			var newFinishY = yScale.invert(y2 - dy);
			onDrag(index, { startXY: startXY, finishXY: finishXY,
				endXY: [newFinishX, newFinishY]
			});
		}
	}, {
		key: "handleChangeFinish",
		value: function handleChangeFinish(moreProps) {
			var _props5 = this.props,
			    index = _props5.index,
			    onDrag = _props5.onDrag;
			var _dragStart4 = this.dragStart,
			    startXY = _dragStart4.startXY,
			    endXY = _dragStart4.endXY,
			    finishXY = _dragStart4.finishXY;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    xAccessor = moreProps.xAccessor,
			    fullData = moreProps.fullData;
			var startPos = moreProps.startPos,
			    mouseXY = moreProps.mouseXY;


			var x2 = xScale(finishXY[0]);
			var y2 = yScale(finishXY[1]);

			var dx = startPos[0] - mouseXY[0];
			var dy = startPos[1] - mouseXY[1];

			var newFinishX = getXValue(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
			var newFinishY = yScale.invert(y2 - dy);

			onDrag(index, { startXY: startXY, endXY: endXY,
				finishXY: [newFinishX, newFinishY]
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
			var _props6 = this.props,
			    startXY = _props6.startXY,
			    endXY = _props6.endXY,
			    finishXY = _props6.finishXY,
			    type = _props6.type,
			    interactive = _props6.interactive,
			    hoverText = _props6.hoverText,
			    appearance = _props6.appearance,
			    selected = _props6.selected,
			    onDragComplete = _props6.onDragComplete;
			var edgeFill = appearance.edgeFill,
			    edgeFill2 = appearance.edgeFill2,
			    stroke = appearance.stroke,
			    strokeMedianOne = appearance.strokeMedianOne,
			    strokeMedianHalf = appearance.strokeMedianHalf,
			    strokeWidth = appearance.strokeWidth,
			    strokeOpacity = appearance.strokeOpacity,
			    fill = appearance.fill,
			    fillOpacity = appearance.fillOpacity;
			var hover = this.state.hover;

			var hoverTextEnabled = hoverText.enable,
			    restHoverTextProps = _objectWithoutProperties(hoverText, ["enable"]);

			var hoverHandler = interactive ? { onHover: this.handleHover, onUnHover: this.handleHover } : {};

			var startEdge = isDefined(startXY) && isDefined(endXY) ? React.createElement(
				"g",
				null,
				this.getEdgeCircle({
					xy: startXY,
					dragHandler: this.handleChangeStart,
					cursor: "react-stockcharts-move-cursor",
					fill: edgeFill,
					edge: "startEdge"
				}),
				this.getEdgeCircle({
					xy: endXY,
					dragHandler: this.handleChangeEnd,
					cursor: "react-stockcharts-move-cursor",
					fill: edgeFill,
					edge: "endEdge"
				})
			) : null;
			var endEdge = isDefined(finishXY) ? React.createElement(
				"g",
				null,
				this.getEdgeCircle({
					xy: finishXY,
					dragHandler: this.handleChangeFinish,
					cursor: "react-stockcharts-move-cursor",
					fill: edgeFill2,
					edge: "finishEdge"
				})
			) : null;
			return React.createElement(
				"g",
				null,
				React.createElement(PitchFork, _extends({
					ref: this.saveNodeType("channel"),
					selected: selected || hover

				}, hoverHandler, {

					startXY: startXY,
					endXY: endXY,
					finishXY: finishXY,
					type: type,
					stroke: stroke,
					strokeMedianOne: strokeMedianOne,
					strokeMedianHalf: strokeMedianHalf,
					strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
					strokeOpacity: strokeOpacity,
					fill: fill,
					fillOpacity: fillOpacity,
					interactiveCursorClass: "react-stockcharts-move-cursor",
					onDragStart: this.handleDragStart,
					onDrag: this.handleChannelDrag,
					onDragComplete: onDragComplete
				})),
				startEdge,
				endEdge,
				React.createElement(HoverTextNearMouse, _extends({
					show: hoverTextEnabled && hover && !selected
				}, restHoverTextProps))
			);
		}
	}]);

	return EachPitchFork;
}(Component);

EachPitchFork.propTypes = {
	type: PropTypes.oneOf(["PITCHFORK", // extends from -Infinity to +Infinity
	"TRIANGLE"] // extends to +/-Infinity in one direction
	),
	startXY: PropTypes.arrayOf(PropTypes.number).isRequired,
	endXY: PropTypes.arrayOf(PropTypes.number).isRequired,
	finishXY: PropTypes.arrayOf(PropTypes.number),

	interactive: PropTypes.bool.isRequired,
	selected: PropTypes.bool.isRequired,
	hoverText: PropTypes.object.isRequired,

	appearance: PropTypes.shape({
		stroke: PropTypes.string.isRequired,
		strokeMedianOne: PropTypes.string.isRequired,
		strokeMedianHalf: PropTypes.string.isRequired,
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

	index: PropTypes.number,
	onDrag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired
};

EachPitchFork.defaultProps = {
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

export default EachPitchFork;
//# sourceMappingURL=EachPitchFork.js.map