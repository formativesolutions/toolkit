/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 5:31 PM -- January 8th, 2023
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

import type { ReactNode } from "react";

/**
 * The type of the single parameter of the default function exported from layout
 * files in NextJS's `app/` directory.
 *
 * @param {string} P A union of the strings that comprise the possible path
 * parameters to pages using the layout in question. Note that only path
 * parameters earlier in the routing chain than the given layout will be
 * available for use.
 * @see NextLayout The type of the function that takes objects of this type as a
 * parameter.
 */
export type NextLayoutProps<P extends string = string> = {
	
	/**
	 * Represents the content unique to a given page that is using this layout.
	 */
	children: ReactNode;
	
	/**
	 * Represents the path parameters that Next has extracted from the current
	 * route.
	 */
	params: Record<P, string>;
	
};
