/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:01 AM -- December 20th, 2022.
 * Project: @formativesolutions/toolkit
 * 
 * @formativesolutions/toolkit - A toolkit of functions and functionality for
 * building Formative websites.
 * Copyright (C) 2022 Formative Solutions
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { CSSObject } from "@emotion/styled";

export type FlexAlignmentOption =
	| "start"
	| "center"
	| "end"
	| "stretch"
	| "space-around"
	| "space-between"
	| "space-evenly";

type FlexContainerAxisDefinitions = {
	mainAxis: FlexAlignmentOption,
	crossAxis: FlexAlignmentOption,
} | {
	bothAxis: FlexAlignmentOption,
};

export type FlexContainerConfiguration = {
	direction: "row" | "row-reverse" | "column" | "column-reverse",
	wrap: boolean,
} & FlexContainerAxisDefinitions;

export function flexContainer(
	config: Partial<FlexContainerConfiguration> = {}
): CSSObject {
	
	let fullConfig: FlexContainerConfiguration = {
		direction: "column",
		mainAxis: "center",
		crossAxis: "center",
		wrap: false,
		...config,
	};
	
	if ("bothAxis" in config &&
		config.bothAxis !== undefined &&
		config.bothAxis !== null) {
		
		fullConfig.mainAxis = fullConfig.crossAxis = config.bothAxis;
		
	}
	
	const valuesToPrepend: FlexAlignmentOption[] = ["start", "end"];
	
	if (valuesToPrepend.includes(fullConfig.mainAxis)) {
		
		fullConfig.mainAxis =
			`flex-${fullConfig.mainAxis}` as FlexAlignmentOption;
		
	}
	
	if (valuesToPrepend.includes(fullConfig.crossAxis)) {
		
		fullConfig.crossAxis =
			`flex-${fullConfig.crossAxis}` as FlexAlignmentOption;
		
	}
	
	return {
		display: "flex",
		flexDirection: fullConfig.direction,
		justifyContent: fullConfig.mainAxis,
		alignItems: fullConfig.crossAxis,
		flexWrap: fullConfig.wrap ? "wrap" : "nowrap",
	};
	
}
