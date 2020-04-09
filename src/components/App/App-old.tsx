import React, { useState } from 'react';
import c from './App.module.scss';
import cls from 'classnames';
import { data } from '../../data';
import { ProgressBar } from '../ProgressBar';
import { makeSE } from '../../utils';

const rnd = (minimum: number, maximum: number) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

export const App = () => {
	const { friends: friendsData } = data;

	const [init, setInit] = useState(false);

	const [generated, setGenerated] = useState<{
		season: number,
		seasonProgress: string;
		episode: number,
		episodeProgress: string;
	}>({
		season: -1,
		seasonProgress: '0%',
		episode: -1,
		episodeProgress: '0%',
	});

	const [isChanging, setIsChanging] = useState(false);

	const [showPlot, setShowPlot] = useState(true);

	const handleGenerate = () => {
		const seasonIndex = rnd(0, friendsData.length - 1);
		const season = friendsData[seasonIndex];
		const episodeIndex = rnd(0, season.length - 1);

		if (init) {
			setIsChanging(true);
			setTimeout(() => setIsChanging(false), 700);
		}

		setInit(true);

		setGenerated({
			season: seasonIndex,
			seasonProgress: `${seasonIndex + 1}0%`,
			episode: episodeIndex,
			episodeProgress: `${Math.round((episodeIndex + 1) / season.length * 100)}%`,
		});
	};

	const handleTogglePlot = () => setShowPlot(!showPlot);

	const episode = generated.season >= 0 ? friendsData[generated.season][generated.episode] : null;

	return (
		<div id="app" className={cls(init && c.init)}>

			<div className={c.titleWrap}>
				<div className={c.title}/>
				<div className={c.subtitle}>❤ Random Episodes Generator ❤</div>
			</div>

			<div className={c.descriptionLine}>
				<div className={c.descriptionWrap}>

					<div className={c.progressWrap}>
						<ProgressBar title={'SEASON'} value={generated.season + 1} progress={generated.seasonProgress}/>
						<div className={c.progressDivider}/>
						<ProgressBar title={'EPISODE'} value={generated.episode + 1} progress={generated.episodeProgress}/>
					</div>

					<div className={cls(c.episodeWrap, isChanging && c.changeEpisode)}>
						<div className={c.title}>{episode?.title}</div>
						<div className={c.cover}
								 style={{ backgroundImage: `url(./img/${makeSE(generated.season, generated.episode)}.png)` }}>
							<div className={cls(c.plotWrap, !showPlot && c.hide)} onClick={handleTogglePlot}>
								<div className={cls(c.plot, !showPlot && c.hide)}>{episode?.plot}</div>
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
