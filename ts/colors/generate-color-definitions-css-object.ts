/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 9:44 AM -- December 20th, 2022.
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

import { colorNameToCSSVar } from "./color-name-to-css-var.js";

/**
 * Creates an Emotion-style object/map from CSS variables names (generated with
 * {@link colorNameToCSSVar}) to color values.
 *
 * @param {Record<string, string>} map An object mapping from color names to
 * valid CSS color values.
 * @returns {Record<string, string>} A new object mapping from valid CSS
 * variable identifiers to CSS color values.
 */
export function generateColorDefinitionsCSSObject(
	map: Record<string, string>): Record<string, string> {
	
	return Object.fromEntries(
		Object.entries(map).map(
			([colorName, colorValue]: [string, string]): [string, string] =>
				[colorNameToCSSVar(colorName, false), colorValue]
		)
	);
	
}
