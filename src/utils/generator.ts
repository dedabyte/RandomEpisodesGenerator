import { data } from '../data';
import { makeSE, parseSE } from './index';
import { ls, LsKeys } from './ls';
import { shuffle } from './shuffle';
import { GeneratedData, GeneratedProgressData } from "../types";

const { friends: friendsData } = data;

let seArr: string[] = [];
let lastIdx: number = -1;

const makeSEArr = () => {
	const seArr: string[] = [];
	friendsData.forEach((season, sIdx) => {
		season.forEach((episode, eIdx) => {
			seArr.push(makeSE(sIdx, eIdx));
		});
	});
	return shuffle(seArr);
};

const makeNewData = () => {
	seArr = makeSEArr();
	lastIdx = -1;
	ls.set(LsKeys.SHUFFLED, seArr);
	ls.set(LsKeys.SHUFFLED_INDEX, lastIdx);
}

const generateNextIdx = (skipSave: boolean = false) => {
	++lastIdx;
	if (!skipSave) {
		saveIndex();
	}
	return lastIdx;
}

export const initData = () => {
	const seArrLS = ls.get(LsKeys.SHUFFLED);
	const lastIdxLS = ls.get(LsKeys.SHUFFLED_INDEX);

	if (seArrLS !== null && lastIdxLS !== null) {
		seArr = seArrLS;
		lastIdx = lastIdxLS;
	} else {
		makeNewData();
	}
};

export const saveIndex = () => ls.set(LsKeys.SHUFFLED_INDEX, lastIdx);

export const generateNextEpisode = (skipSave: boolean = false): GeneratedData => {
	console.log('generateNextEpisode');
	if (lastIdx >= seArr.length - 1) {
		makeNewData();
	}

	const nextIdx = generateNextIdx(skipSave);
	const { sIdx, eIdx } = parseSE(seArr[nextIdx]);

	return {
		seasonIndex: sIdx,
		seasonProgress: `${sIdx + 1}0%`,
		episodeIndex: eIdx,
		episodeProgress: `${Math.round((eIdx + 1) / friendsData[sIdx].length * 100)}%`,
		episode: friendsData[sIdx][eIdx],
	};
};

export const getProgress = (): GeneratedProgressData => {
	return {
		allEpisodesCount: seArr.length,
		currentEpisodeNumber: lastIdx + 1,
		progress: `${Math.round((lastIdx + 1) / seArr.length * 100)}%`
	}
}
