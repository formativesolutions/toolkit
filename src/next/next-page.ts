/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 11:35 AM - January 27th, 2023.
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

import type { ReactNode } from "react";
import type { NextPageProps } from "./next-page-props.js";

/**
 * The type of the default exported function from page files in NextJS's `app/`
 * directory.
 * 
 * @param {string} P A union of the strings that comprise the possible path
 * parameters for this page.
 * @param {string} S A union of the strings that comprise the possible query
 * parameters for this page.
 * @see {@link NextPageProps} The type of the object passed as a parameter to
 * this function.
 */
export type NextPage<
	P extends string = string,
	S extends string = string,
> = (props: NextPageProps<P, S>) => ReactNode | Promise<ReactNode>;
