/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 12:47 PM -- April 7th, 2023
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

import type { Metadata, ResolvingMetadata } from "next";
import type { NextPageProps } from "./next-page-props";

// TypeScript for some reason believes Metadata to be (at least partially?)
// equivalent to the 'any' type, so ESLint was seeing a 'redundant type' issue. 
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

/**
 * The type of the NextJS 'generateMetadata' function responsible for
 * dynamically generating a {@link Metadata} object for a given route (either
 * from a `page` or `layout` file inside the `app/` directory of a Next app).
 * 
 * @param {string} P A union of the strings that comprise the possible path
 * parameters for the page or layout for which metadata is being generated.
 * @param {string} S A union of the strings that comprise the possible query
 * parameters for the page or layout for which metadata is being generated.
 */
export type NextGenerateMetadata<
	P extends string = string,
	S extends string = string,
> = (
	props: NextPageProps<P, S>,
	parent?: ResolvingMetadata,
) => (Metadata | Promise<Metadata>);
