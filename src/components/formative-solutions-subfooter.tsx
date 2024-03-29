/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 10:07 AM -- December 20th, 2022.
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

import styles from "./formative-solutions-subfooter.module.scss";
import * as React from "react";
import type { ReactElement } from "react";

const SITE_LINK: string = "https://formativesolutions.io/";

export function FormativeSolutionsSubfooter(): ReactElement {
	
	return (
		<div className={styles.subfooter__container}>
			<p className={styles.subfooter__text}>
				This site proudly powered and supported by the team
				at{" "}<a className={styles.subfooter__link}
						  href={SITE_LINK}>Formative Solutions</a>.
			</p>
		</div>
	);
	
}
