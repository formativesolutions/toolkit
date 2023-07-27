/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 1:13 PM -- April 7th, 2023
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

import type { NextStaticParams } from "./next-static-params";

/**
 * The type of the NextJS 'generateStaticParams' function responsible for
 * generating a static list of possible path parameters/path parameter
 * combinations object for a given route (either from a `page` or `layout` file
 * inside the `app/` directory of a Next app) that is used to inform Next's
 * static page generation abilities.
 * 
 * @param {string} P A union of the strings that comprise the possible path
 * parameters for the route (page or layout) in question.
 * @see {@link NextStaticParams} for more information regarding the type that is
 * expected to be returned from this function.
 */
export type NextGenerateStaticParams<P extends string = string> =
	() => Promise<NextStaticParams<P>>;
