/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 4:54 PM -- July 24th, 2023
 * Project: @formativesolutions/toolkit
 * 
 * @formativesolutions/toolkit - A toolkit of functions and functionality for
 * building Formative websites.
 * Copyright (C) 2023 Formative Solutions
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

/* eslint-disable @typescript-eslint/no-explicit-any -- We're using any to
 * reflect the fact that the function can truly accept any type as input. 
 */

/* eslint-disable @typescript-eslint/no-redundant-type-constituents --
 * Explicitly providing redundant types in unions allows for more readable
 * code and better type inference, therefore a better DX.
 */

/**
 * An object whose keys are strings (representing class names) and whose values
 * are booleans or values that can be evaluated as booleans (representing
 * whether or not the class name should be included in the output string).
 */
type ClassNameObject =
	Record<string, boolean | (() => boolean) | any>;

/**
 * A utility function for generating a string of CSS class names from a variety
 * of input types.
 * 
 * @param {Array<string | string[] | ClassNameObject | any>} input A variadic
 * array of strings, arrays of strings, or objects whose keys are strings and
 * whose values are booleans or values that can be evaluated as booleans.
 * Objects will be evaluated by iterating over their key/value pairs and
 * including all keys in the output string whose values are truthy.
 * @returns {string} A string of CSS class names constructed from the input.
 */
export function classy(
	...input: Array<string | string[] | ClassNameObject | any>
): string {
	
	// Create our initial empty array of strings/class names.
	let classNames: string[] = [];
	
	// Iterate over the input array.
	for (const item of input) {
		
		// Skip null or undefined values.
		if (item === undefined || item === null) continue;
		
		// Add strings as-is.
		else if (typeof item === "string") classNames.push(item);
		
		// Recursive into arrays and add the results.
		else if (Array.isArray(item)) {
			
			classNames.push(classy(...item as Iterable<any>));
			
		}
		
		// Iterate over objects, evaluating their key/value pairs.
		else if (typeof item === "object") {
			
			const entries: Array<[string, any]> =
				Object.entries(item as object);
			
			// Iterate over each key/value pair in the object.
			for (const [className, condition] of entries) {
				
				// Check the truthiness of a pair by evaluating it if it is a
				// function, or otherwise by casting it to a boolean.
				const isTruthy: boolean = typeof condition === "function" ?
					Boolean((condition as (() => any))()) :
					Boolean(condition);
				
				// If the pair is truthy, add the key (the class name) to the
				// array of class names after explicitly casting it to a string.
				if (isTruthy) classNames.push(className.toString());
				
			}
			
		}
		
		// Implicitly skip all other values.
		
	}
	
	/* eslint-disable id-length -- Disabled rule so that anonymous functions can
	 * use more terse parameter names.
	 */
	
	// Split all strings on whitespace, then flatten the resulting array back
	// into a single-dimensional array of strings.
	classNames = classNames.map((x: string): string[] => x.split(/\s+/gui))
		.flat(Infinity) as string[];
	
	// Trims all strings;
	classNames = classNames.map((x: string): string => x.trim());
	
	// Deduplicates the array of strings.
	classNames = [...new Set(classNames)];
	
	// Removes all empty strings from the array.
	classNames = classNames.filter((x: string): boolean => x.length > 0);
	
	// Join the array of strings into a single string, separated by spaces and
	// return the result.
	return classNames.join(" ");

}
