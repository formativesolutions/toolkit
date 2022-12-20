/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:07 AM -- December 20th, 2022.
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

import { ReactElement } from "react";
import { css, SerializedStyles } from "@emotion/react";

const containerStyles: SerializedStyles = css({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	boxShadow: "inset 0 10px 5px -5px #0006",
	padding: "15px",
	lineHeight: 1,
	backgroundColor: "#3D4886",
	color: "white",
});

const textStyles: SerializedStyles = css({
	display: "inline",
	fontSize: "0.75rem",
	fontWeight: "bold",
	textAlign: "center",
	lineHeight: 1.3,
});

const linkStyles: SerializedStyles = css({
	all: "inherit",
});

export default function FormativeSolutionsSubfooter(): ReactElement {
	
	return (
		<div css={containerStyles}>
			<p css={textStyles}>
				This site proudly powered and supported by the team at{" "}
				<a css={linkStyles}
				   href="https://formativesolutions.io/">Formative Solutions</a>
				.
			</p>
		</div>
	);
	
}
