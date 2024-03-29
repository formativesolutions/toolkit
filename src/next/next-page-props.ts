/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 11:38 AM - January 27th, 2023.
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

/**
 * The type of the single parameter of the default function exported from page
 * files in NextJS's `app/` directory.
 * 
 * @param {string} P A union of the strings that comprise the possible path
 * parameters for the page in question.
 * @param {string} S A union of the strings that comprise the possible query
 * parameters for the page in question.
 * @see {@link NextPage} The type of the function that takes objects of this
 * type as a parameter.
 */
export type NextPageProps<
	P extends string = string,
	S extends string = string,
> = {
	
	/**
	 * An object whose key-value pairs represent any path parameters present in
	 * the URL used to navigate to the current page.
	 */
	params: Record<P, string>;
	
	/**
	 * An object whose key-value pairs represent any query parameters present in
	 * the URL used to navigate to the current page.
	 */
	searchParams?: Record<S, string>;
	
};
