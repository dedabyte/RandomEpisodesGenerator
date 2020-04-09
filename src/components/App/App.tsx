import React, { useState } from 'react';
import c from './App.module.scss';
import cls from 'classnames';
import { ProgressBar } from '../ProgressBar';
import { makeSE } from '../../utils';
import { GeneratedData } from "../../types";
import { generateNextEpisode } from "../../utils/generator";
import { Circle } from "../Info";

export const App = () => {
	const [init, setInit] = useState(false);

	const [generated, setGenerated] = useState<GeneratedData>({
		seasonIndex: -1,
		seasonProgress: '0%',
		episodeIndex: -1,
		episodeProgress: '0%',
		episode: null,
	});

	const [isChanging, setIsChanging] = useState(false);

	const [showPlot, setShowPlot] = useState(true);

	const handleGenerate = () => {
		const generatedData = generateNextEpisode();

		if (init) {
			setIsChanging(true);
			setTimeout(() => setIsChanging(false), 700);
		}

		setInit(true);

		setGenerated(generatedData);
	};

	const handleTogglePlot = () => setShowPlot(!showPlot);

	return (
		<div id="app" className={cls(init && c.init)}>

			{init && <Circle/>}

			<div className={c.titleWrap}>
				<div className={c.title}/>
				<div className={c.subtitle}>Random Episodes Generator</div>
			</div>

			<div className={c.descriptionLine}>
				<div className={c.descriptionWrap}>

					<div className={c.progressWrap}>
						<ProgressBar title={'SEASON'} value={generated.seasonIndex + 1} progress={generated.seasonProgress}/>
						<div className={c.progressDivider}/>
						<ProgressBar title={'EPISODE'} value={generated.episodeIndex + 1} progress={generated.episodeProgress}/>
					</div>

					<div className={cls(c.episodeWrap, isChanging && c.changeEpisode)}>
						<div className={c.title}>{generated.episode?.title}</div>
						<div className={c.cover}
								 style={{ backgroundImage: `url(./img/${makeSE(generated.seasonIndex, generated.episodeIndex)}.png)` }}>
							<div className={cls(c.plotWrap, !showPlot && c.hide)} onClick={handleTogglePlot}>
								<div className={cls(c.plot, !showPlot && c.hide)}>{generated.episode?.plot}</div>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div className={c.bodyWrap}/>

			<button className={c.generateButton} onClick={handleGenerate} disabled={isChanging}>Pick next episode!</button>

		</div>
	);
};
