/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 9:22 AM -- December 20th, 2022.
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

/**
 * Formats a color name (such as 'PALE_GREEN') into a valid format for a CSS
 * variable identifier (such as '--color-pale-green').
 *
 * @param {string} colorName The original color name (i.e. 'PALE_GREEN').
 * @param {boolean} includeVar true if the resultant CSS variable identifier
 * should be wrapped in 'var(...)' before being returned. Defaults to true.
 * @returns {string} The formatted CSS variable identifier for the original
 * color name (i.e. '--color-pale-green').
 */
export function colorNameToCSSVar(colorName: string,
								  includeVar: boolean = true): string {
	
	let result: string = `--color-${colorName.toLowerCase().replace("_", "-")}`;
	
	if (includeVar) result = `var(${result})`;
	
	return result;
	
}
