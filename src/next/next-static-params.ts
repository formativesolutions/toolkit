/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 1:11 PM -- April 7th, 2023
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
 * A type responsible for representing an array of possible path parameter
 * combinations for a given route. This type is expected to be returned from
 * instances of the `generateStaticParams` function, and is used to inform
 * Next's static page generation abilities.
 * 
 * @param {string} P A union of the strings that comprise the possible path
 * parameters for the route (page or layout) in question.
 * @see {@link NextGenerateStaticParams} for more information regarding the
 * function that is expected to return this type.
 */
export type NextStaticParams<P extends string = string> =
	Array<Record<P, string>>;
