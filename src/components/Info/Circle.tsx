import React, { useState } from 'react';
import c from './Circle.module.scss';
import cls from 'classnames';
import { GeneratedProgressData } from "../../types";
import { getProgress } from "../../utils/generator";
import { ProgressBar } from "../ProgressBar";

export const Circle: React.FC = () => {
	const [shown, setShown] = useState(false);
	const [startHide, setStartHide] = useState(false);
	const [progress, setProgress] = useState<GeneratedProgressData | null>(null);

	const circleClass = cls(c.circle, startHide ? c.collapsed : c.expanded);
	const dropClass = cls(c.drop, startHide ? c.hidden : c.shown);

	const handleAnimationEnd = () => {
		if (startHide) {
			setShown(false);
			setStartHide(false);
			setProgress(null);
		} else {
			setProgress(getProgress());
		}
	}

	const handleShowInfo = () => setShown(true)

	const handleHideInfo = () => setStartHide(true);

	return (
		<>
			<div onClick={handleShowInfo} className={c.hamburger}/>
			{shown && (
				<>
					<div className={dropClass} onClick={handleHideInfo}/>
					<div className={circleClass} onAnimationEnd={handleAnimationEnd}/>
				</>
			)}
			{!!progress && !startHide && (
				<div className={c.progressWrap}>
					<ProgressBar
						title={''}
						value={progress.currentEpisodeNumber} progress={progress.progress}/>
					<div className={c.progressText}>
						You watched<br/>
						<span className={c.ep}>{progress.currentEpisodeNumber}</span> out of <span
						className={c.all}>{progress.allEpisodesCount}</span><br/>
						episodes.
					</div>
				</div>
			)}
		</>
	);
}
