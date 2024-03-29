/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 10:02 AM -- December 20th, 2022.
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

import * as React from "react";
import type { ReactElement } from "react";

export type ColumnDefinition<T> = {
	header: string;
	tooltip?: string;
	getColumnValue(data: T, rowIndex: number, columnIndex: number): string;
	compareFunction?(a: URL, b: URL): number;
};

export type Props<T> = {
	data: T[];
	columns: Array<ColumnDefinition<T>>;
};

export function Table<T>({ columns, data }: Props<T>): ReactElement {
	
	return (
		<div>
			<header />
		</div>
	);
	
}

// const myURLs: URL[] = [
// 	new URL("https://google.com/"),
// 	new URL("http://10.0.2.120/foo/bar"),
// 	new URL("https://piratebay.sf/"),
// ];
//	
// const myTable: ReactElement = (
// 	<Table<URL> data={myURLs} columns={[
// 		{
// 			header: "Protocol",
// 			getColumnValue: (data: URL): string => data.protocol,
// 		},
// 		{
// 			header: "Host",
// 			getColumnValue: (data: URL): string => data.host,
// 		},
// 		{
// 			header: "Path",
// 			getColumnValue: (data: URL): string => data.pathname,
// 		},
// 	]} />
// );
