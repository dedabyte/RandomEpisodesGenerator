import { data } from '../data';
import { makeSE, parseSE } from './index';
import { ls, LsKeys } from './ls';
import { shuffle } from './shuffle';
import { GeneratedData } from "../types";

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
	// return seArr;
	return shuffle(seArr);
};

const makeNewData = () => {
	seArr = makeSEArr();
	lastIdx = -1;
	ls.set(LsKeys.SHUFFLED, seArr);
	ls.set(LsKeys.SHUFFLED_INDEX, lastIdx);
}

const initData = () => {
	if (seArr.length && lastIdx >= 0) {
		return;
	}

	const seArrLS = ls.get(LsKeys.SHUFFLED);
	const lastIdxLS = ls.get(LsKeys.SHUFFLED_INDEX);

	if (seArrLS && lastIdxLS) {
		seArr = seArrLS;
		lastIdx = lastIdxLS;
	} else {
		makeNewData();
	}
};

const generateNextIdx = () => {
	++lastIdx;
	ls.set(LsKeys.SHUFFLED_INDEX, lastIdx);
	return lastIdx;
}

export const generateNextEpisode = (): GeneratedData => {
	initData();

	if (lastIdx >= seArr.length - 1) {
		makeNewData();
	}

	const nextIdx = generateNextIdx();
	const { sIdx, eIdx } = parseSE(seArr[nextIdx]);

	return {
		seasonIndex: sIdx,
		seasonProgress: `${sIdx + 1}0%`,
		episodeIndex: eIdx,
		episodeProgress: `${Math.round((eIdx + 1) / friendsData[sIdx].length * 100)}%`,
		episode: friendsData[sIdx][eIdx],
	};
};
