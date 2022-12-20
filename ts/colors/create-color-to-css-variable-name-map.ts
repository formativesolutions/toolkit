/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 9:43 AM -- December 20th, 2022.
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

import { ColorMap } from "./color-map.js";
import { colorNameToCSSVar } from "./color-name-to-css-var.js";

/**
 * Maps an object from being a human-readable color names to CSS color values
 * map, to being a human-readable color names to CSS variable identifier string
 * map.
 *
 * In other words:
 *   Map<Color Names, Color Values) -> Map<Color Names, CSS Variable Names>
 *
 * This function is intended to be used alongside
 * {@link generateColorDefinitionsCSSObject}.
 *
 * @param {ColorMap<Color>} rawMapping The source color name to color value map.
 * @returns {ColorMap<Color>} A new mapping from color names to the CSS variable
 * identifier for the CSS variable that represents the provided color.
 */
export function createColorToCSSVariableNameMap<Color extends string>(
	rawMapping: ColorMap<Color>): ColorMap<Color> {
	
	return Object.fromEntries(
		Object.entries(rawMapping).map(
			([colorName]: [string, unknown]): [Color, string] =>
				[colorName as Color, colorNameToCSSVar(colorName)]
		)
	) as ColorMap<Color>;
	
}
