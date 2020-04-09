export const makeSE = (seasonIndex: number, episodeIndex: number) => `${seasonIndex}-${episodeIndex}`;

export const parseSE = (se: string) => {
	const split = se.split('-');
	return {
		sIdx: parseInt(split[0]),
		eIdx: parseInt(split[1]),
	}
};
