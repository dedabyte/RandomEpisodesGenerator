import React, { useEffect, useRef, useState } from 'react';
import c from './App.module.scss';
import cls from 'classnames';
import { ProgressBar } from '../ProgressBar';
import { makeSE, openUrlInExternalApp, triggerAnimation } from '../../utils';
import { GeneratedData } from '../../types';
import { generateNextEpisode, saveIndex } from '../../utils/generator';
import { Info } from '../Info';

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

	const titleWrapRef = useRef(null);
	const progressWrapRef = useRef(null);
	const episodeWrapRef = useRef(null);

	useEffect(
		() => setGenerated(generateNextEpisode(true)),
		[]
	);

	const handleGenerate = () => {
		if (init) {
			setIsChanging(true);
			setTimeout(() => setIsChanging(false), 700);

			setGenerated(generateNextEpisode());
		} else {
			triggerAnimation(titleWrapRef.current, c.initTitleWrap);
			triggerAnimation(progressWrapRef.current, c.initProgressWrap);
			triggerAnimation(episodeWrapRef.current, c.initEpisodeWrap);
			setInit(true);
			saveIndex();
		}
	};

	const handleTogglePlot = () => setShowPlot(!showPlot);

	const handleNetflixButton = () => openUrlInExternalApp(generated.episode?.netflixUrl);

	return (
		<div id="app" className={cls(init && c.init)}>

			{init && <Info/>}

			<div className={c.titleWrap} ref={titleWrapRef}>
				<div className={c.title}/>
				<div className={c.subtitle}>Random Episodes Generator</div>
			</div>

			<div className={c.progressWrap} ref={progressWrapRef}>
				<ProgressBar title={'SEASON'} value={generated.seasonIndex + 1} progress={generated.seasonProgress}/>
				<div className={c.progressDivider}/>
				<ProgressBar title={'EPISODE'} value={generated.episodeIndex + 1} progress={generated.episodeProgress}/>
			</div>

			<div className={cls(c.episodeWrap, isChanging && c.changeEpisode)} ref={episodeWrapRef}>
				<div className={c.title}>{generated.episode?.title}</div>
				<div className={c.cover}
						 style={{ backgroundImage: `url(./img/${makeSE(generated.seasonIndex, generated.episodeIndex)}.png)` }}>
					<div className={cls(c.plotWrap, !showPlot && c.hide)} onClick={handleTogglePlot}>
						<div className={cls(c.plot, !showPlot && c.hide)}>{generated.episode?.plot}</div>
					</div>
					<button className={c.netflixButton} onClick={handleNetflixButton}>NETFLIX &rarr;</button>
				</div>
			</div>

			<button className={c.generateButton} onClick={handleGenerate} disabled={isChanging}>Pick next episode!</button>

		</div>
	);
};
