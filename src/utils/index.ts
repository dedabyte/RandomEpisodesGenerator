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

declare const cordova: any;

export const openUrlInExternalApp = (url?: string) => {
	try {
		if (url && cordova && cordova.InAppBrowser) {
			cordova.InAppBrowser.open(url, '_system');
		} else if (!url) {
			console.warn('openUrlInExternalApp', 'url is missing');
		} else if (!cordova) {
			console.warn('openUrlInExternalApp', 'cordova is missing');
		} else if (!cordova.InAppBrowser) {
			console.warn('openUrlInExternalApp', 'cordova.InAppBrowser is missing');
		}
	} catch (e) {
		console.warn('openUrlInExternalApp', 'shit got fucked up', e);
	}
}
