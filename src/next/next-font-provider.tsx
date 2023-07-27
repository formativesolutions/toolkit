/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 8:13 PM -- July 24th, 2023
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
import type { ReactNode, FunctionComponent, ReactElement } from "react";
import type { NextFont } from "next/dist/compiled/@next/font";

/* eslint-disable @typescript-eslint/no-redundant-type-constituents --
 * Explicitly including the given strings allows for better type inference.
 */
export type Props = Readonly<{
	fonts: Record<"standard" | "header" | string, NextFont>;
	children: ReactNode;
}>;

const NextFontProvider: FunctionComponent<Props> = ({
	fonts,
	children,
}: Props): ReactElement => {
	
	const fontDeclarations: string[] = Object.entries(fonts).map(
		([name, font]: [string, NextFont]): string => {
			
			const sanitizedFontName: string =
				name.replace(/[^a-z0-9]+/gui, "-").toLowerCase();
			
			return `--font-${sanitizedFontName}: ${font.style.fontFamily};`;
			
		}
	);
	
	const styleText: string = `
:root {
	${fontDeclarations.join("\n\t")}
}
`;
	
	/* eslint-disable react/no-danger -- We need to set the inner HTML this way
	 * to prevent SSR/CSR differences for server components.
	 */
	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: styleText }} />
			{children}
		</>
	);
	
};

export default NextFontProvider;
