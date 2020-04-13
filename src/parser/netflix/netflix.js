let episodes = [];

const int = (v) => parseInt(v, 10);

const getSeasonIndex = () => int(document.querySelector('.nfDropDown').textContent.split('Season ')[1]) - 1;

const getEpisodesLinks = () => {
	const episodesData = [];
	document.querySelectorAll('.episodePlay').forEach((node) => {
		const episodeIndex = int(node.attributes['aria-label'].value.split('Episode ')[1]) - 1;
		const href = 'https://www.netflix.com' + node.attributes['href'].value.split('?')[0];
		episodesData.push({
			episodeIndex,
			href,
		});
	});
	return episodesData;
}

const scrape = () => {
	const sIdx = getSeasonIndex();
	episodes[sIdx] = episodes[sIdx] || [];

	const seasonArr = episodes[sIdx];
	const visibleEpisodes = getEpisodesLinks();
	visibleEpisodes.forEach((e) => {
		if (!seasonArr[e.episodeIndex]) {
			seasonArr[e.episodeIndex] = e;
		}
	});
}

const createButton = () => {
	const button = document.createElement('BUTTON');
	button.style.position = 'fixed';
	button.style.top = '0px';
	button.style.zIndex = '1000000';
	button.style.color = 'black';
	button.textContent = 'SCRAPE';
	button.onclick = scrape;
	return document.body.appendChild(button);
}

createButton();

/* ---------- */

const mergeData = (netflixData, fandomData) => {
	fandomData.forEach((season, sIdx) => {
		season.forEach((episode, eIdx) => {
			const netflixObject = netflixData[sIdx][eIdx];
			if (netflixObject && netflixObject.episodeIndex === eIdx) {
				episode.netflixUrl = netflixObject.href;
			} else {
				console.log('missing netflix object', sIdx, eIdx, episode);
			}
		});
	});
}
