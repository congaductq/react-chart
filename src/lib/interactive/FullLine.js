

import React, { Component } from "react";
import PropTypes from "prop-types";

import { isDefined, noop } from "../utils";
import {
	terminate,
	saveNodeType,
	isHoverForInteractiveType,
} from "./utils";
import EachFullLine from "./wrapper/EachFullLine";
import MouseLocationIndicator from "./components/MouseLocationIndicator";
import HoverTextNearMouse from "./components/HoverTextNearMouse";
import GenericChartComponent from "../GenericChartComponent";
import { getMouseCanvas } from "../GenericComponent";

class FullLine extends Component {
	constructor(props) {
		super(props);

		this.handleStart = this.handleStart.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.handleDrawChannel = this.handleDrawChannel.bind(this);
		this.handleDragChannel = this.handleDragChannel.bind(this);
		this.handleDragChannelComplete = this.handleDragChannelComplete.bind(this);

		this.terminate = terminate.bind(this);
		this.saveNodeType = saveNodeType.bind(this);

		this.getSelectionState = isHoverForInteractiveType("trends")
			.bind(this);

		this.nodes = [];
		this.state = {
		};
	}
	handleDragChannel(index, newXYValue) {
		this.setState({
			override: {
				index,
				...newXYValue
			}
		});
	}
	handleDragChannelComplete(moreProps) {
		const { override } = this.state;
		const { trends } = this.props;
		if (isDefined(override)) {
			const { index, ...rest } = override;
			const newTrends = trends
				.map((each, idx) => idx === index
					? { ...each, ...rest, selected: true }
					: each);
			this.setState({
				override: null,
			}, () => {
				this.props.onComplete(newTrends, moreProps);
			});
		}
	}
	handleDrawChannel(xyValue) {
		this.mouseMoved = true;
		this.setState({
			current: {
				startXY: xyValue,
			}
		});
	}
	handleStart(xyValue, moreProps, e) {
		this.mouseMoved = false;
		this.setState({
			current: {
				startXY: xyValue,
			}
		}, () => {
			this.props.onStart(moreProps, e);
		});
	}
	handleEnd(xyValue, moreProps, e) {
		const { trends, appearance, type } = this.props;
		const newTrends = [
			...trends.map(d => ({ ...d, selected: false })),
			{
				selected: true,
				startXY: xyValue,
				appearance,
				type,
			}
		];
		this.setState({
			current: null,
			trends: newTrends
		}, () => {
			this.props.onComplete(newTrends, moreProps, e);
		});
	}
	render() {
		const { appearance, enabled, currentPositionRadius, currentPositionStroke,
			currentPositionOpacity, currentPositionStrokeWidth, trends, hoverText, type
		} = this.props;
		const { current, override } = this.state;
		const overrideIndex = isDefined(override) ? override.index : null;
		const tempChannel = isDefined(current)
			? <EachFullLine
				type={type}
				interactive={false}
				{...current}
				appearance={appearance}
				hoverText={hoverText} />
			: null;
		return <g>
			{trends.map((each, idx) => {
				const eachAppearance = isDefined(each.appearance)
					? { ...appearance, ...each.appearance }
					: appearance;
				return <EachFullLine key={idx}
					type={each.type}
					ref={this.saveNodeType(idx)}
					index={idx}
					selected={each.selected}
					hoverText={hoverText}
					{...(idx === overrideIndex ? override : each)}
					appearance={eachAppearance}
					onDrag={this.handleDragChannel}
					onDragComplete={this.handleDragChannelComplete}
				/>;
			})}
			{tempChannel}
			<MouseLocationIndicator
				enabled={enabled}
				snap={false}
				r={currentPositionRadius}
				stroke={currentPositionStroke}
				opacity={currentPositionOpacity}
				strokeWidth={currentPositionStrokeWidth}
				onClick={this.handleEnd}
				onMouseMove={this.handleDrawChannel}
			/>
		</g>;
	}
}


FullLine.propTypes = {
	type: PropTypes.oneOf([
		"VERTICAL",
		"HORIZONTAL",
	]).isRequired,
	enabled: PropTypes.bool.isRequired,

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
		r: PropTypes.number.isRequired,
	}).isRequired
};

FullLine.defaultProps = {
	type: "VERTICAL",
	onStart: noop,
	onComplete: noop,
	onSelect: noop,

	currentPositionStroke: "#000000",
	currentPositionOpacity: 1,
	currentPositionStrokeWidth: 3,
	currentPositionRadius: 4,

	hoverText: {
		...HoverTextNearMouse.defaultProps,
		enable: true,
		bgHeight: 18,
		bgWidth: 120,
		text: "Click to select object",
	},
	trends: [],
	appearance: {
		stroke: "#000000",
		strokeOpacity: 1,
		strokeWidth: 1,
		fill: "#8AAFE2",
		fillOpacity: 0.7,
		edgeStroke: "#000000",
		edgeFill: "#FFFFFF",
		edgeFill2: "#250B98",
		edgeStrokeWidth: 1,
		r: 5,
	}
};

export default FullLine;
