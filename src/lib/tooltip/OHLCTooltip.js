

import React, { Component } from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import displayValuesFor from "./displayValuesFor";
import GenericChartComponent from "../GenericChartComponent";

import { isDefined, functor } from "../utils";
import ToolTipText from "./ToolTipText";
import ToolTipTSpanLabel from "./ToolTipTSpanLabel";

class OHLCTooltip extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
	}
	renderSVG(moreProps) {
		const { displayValuesFor } = this.props;
		const {
			xDisplayFormat,
			accessor,
			volumeFormat,
			ohlcFormat,
			percentFormat,
			tooltipDefault
		} = this.props;

		const { chartConfig: { width, height } } = moreProps;
		const { displayXAccessor } = moreProps;

		const currentItem = displayValuesFor(this.props, moreProps);

		let displayDate, open, high, low, close, volume, percent, max_cap;
		displayDate = open = high = low = close = volume = percent = max_cap = null;

		if (isDefined(currentItem) && isDefined(accessor(currentItem))) {
			const item = accessor(currentItem);
			volume = isDefined(item.volume) ? volumeFormat(item.volume) : null;
			max_cap = isDefined(item.max_cap) ? volumeFormat(item.max_cap) : null;

			displayDate = xDisplayFormat(displayXAccessor(item));
			open = ohlcFormat(item.open);
			high = ohlcFormat(item.high);
			low = ohlcFormat(item.low);
			close = ohlcFormat(item.close);
			percent = percentFormat((item.close - item.open) / item.open);
		} else if (tooltipDefault) {
			volume = isDefined(tooltipDefault.volume) ? volumeFormat(tooltipDefault.volume) : null;
			max_cap = isDefined(tooltipDefault.max_cap) ? volumeFormat(tooltipDefault.max_cap) : null;
			displayDate = xDisplayFormat(displayXAccessor(tooltipDefault));
			open = ohlcFormat(tooltipDefault.open);
			high = ohlcFormat(tooltipDefault.high);
			low = ohlcFormat(tooltipDefault.low);
			close = ohlcFormat(tooltipDefault.close);
		}

		const { origin: originProp } = this.props;
		const origin = functor(originProp);
		const [x, y] = origin(width, height);

		const itemsToDisplay = {
			displayDate,
			open,
			high,
			low,
			close,
			percent,
			volume,
			max_cap,
			x,
			y
		};
		return this.props.children(this.props, moreProps, itemsToDisplay);
	}
	render() {
		return (
			<GenericChartComponent
				clip={false}
				svgDraw={this.renderSVG}
				drawOn={["mousemove"]}
			/>
		);
	}
}

OHLCTooltip.propTypes = {
	className: PropTypes.string,
	accessor: PropTypes.func,
	xDisplayFormat: PropTypes.func,
	children: PropTypes.func,
	volumeFormat: PropTypes.func,
	percentFormat: PropTypes.func,
	ohlcFormat: PropTypes.func,
	origin: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	onClick: PropTypes.func,
	displayValuesFor: PropTypes.func,
	textFill: PropTypes.string,
	labelFill: PropTypes.string,
	displayTexts: PropTypes.object,
	tooltipDefault: PropTypes.object,
};

const displayTextsDefault = {
	d: "Date: ",
	o: " O: ",
	h: " H: ",
	l: " L: ",
	c: " C: ",
	v: " Vol: ",
	m: " Cap: ",
	na: "n/a"
};

OHLCTooltip.defaultProps = {
	accessor: d => {
		return {
			date: d.date,
			open: d.open,
			high: d.high,
			low: d.low,
			close: d.close,
			volume: d.volume,
			max_cap: d.max_cap,
		};
	},
	xDisplayFormat: timeFormat("%Y-%m-%d"),
	volumeFormat: format(".4s"),
	percentFormat: format(".2%"),
	ohlcFormat: format(".2f"),
	displayValuesFor: displayValuesFor,
	origin: [0, 0],
	children: defaultDisplay,
	displayTexts: displayTextsDefault,
};

function defaultDisplay(props, moreProps, itemsToDisplay) {

	/* eslint-disable */
	const {
		className,
		textFill,
		labelFill,
		onClick,
		fontFamily,
		fontSize,
		displayTexts
	} = props;
	/* eslint-enable */

	const {
		displayDate,
		open,
		high,
		low,
		close,
		volume,
		max_cap,
		x,
		y
	} = itemsToDisplay;
	return (
		<g
			className={`react-stockcharts-tooltip-hover ${className}`}
			transform={`translate(${x}, ${y})`}
			onClick={onClick}
		>
			<ToolTipText
				x={0}
				y={0}
				fontFamily={fontFamily}
				fontSize={fontSize}
			>
				<ToolTipTSpanLabel
					fill={labelFill}
					key="label"
					x={0}
					dy="5">{displayTexts.d}</ToolTipTSpanLabel>
				<tspan key="value" fill={textFill}>{displayDate}</tspan>
				{
					isDefined(open) ? (
						<React.Fragment>
							<ToolTipTSpanLabel fill={labelFill} key="label_C">{displayTexts.o}</ToolTipTSpanLabel>
							<tspan key="value_C" fill={textFill}>{open}</tspan>
						</React.Fragment>
					) : ""
				}
				{
					isDefined(high) ? (
						<React.Fragment><ToolTipTSpanLabel fill={labelFill} key="label_C">{displayTexts.h}</ToolTipTSpanLabel><tspan key="value_C" fill={textFill}>{high}</tspan></React.Fragment>
					) : ""
				}
				{
					isDefined(low) ? (
						<React.Fragment><ToolTipTSpanLabel fill={labelFill} key="label_C">{displayTexts.l}</ToolTipTSpanLabel><tspan key="value_C" fill={textFill}>{low}</tspan></React.Fragment>
					) : ""
				}
				{
					isDefined(close) ? (
						<React.Fragment><ToolTipTSpanLabel fill={labelFill} key="label_C">{displayTexts.c}</ToolTipTSpanLabel><tspan key="value_C" fill={textFill}>{close}</tspan></React.Fragment>
					) : ""
				}
				{
					isDefined(volume) ? (
						<React.Fragment><ToolTipTSpanLabel fill={labelFill} key="label_Vol">{displayTexts.v}</ToolTipTSpanLabel><tspan key="value_Vol" fill={textFill}>{volume}</tspan></React.Fragment>
					) : ""
				}
				{
					isDefined(max_cap) ? (
						<React.Fragment><ToolTipTSpanLabel fill={labelFill} key="label_Cap">{displayTexts.m}</ToolTipTSpanLabel><tspan key="value_Cap" fill={textFill}>{max_cap}</tspan></React.Fragment>
					) : ""
				}
			</ToolTipText>
		</g>
	);
}

export default OHLCTooltip;
