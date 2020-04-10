export const makeSE = (seasonIndex: number, episodeIndex: number) => `${seasonIndex}-${episodeIndex}`;

export const parseSE = (se: string) => {
	const split = se.split('-');
	return {
		sIdx: parseInt(split[0]),
		eIdx: parseInt(split[1]),
	}
};

export const triggerAnimation = (ref: any, className: string) => {
	if (!ref) {
		console.warn('triggerAnimation: ref is null');
		return;
	}
	ref.classList.add(className);
	ref.addEventListener('animationend', () => ref.classList.remove(className), { once: true });
}
