export interface EpisodeData {
	title: string;
	plot: string;
	imageUrl?: string;
	airDate?: string;
}

export interface GeneratedData {
	seasonIndex: number;
	seasonProgress: string;
	episodeIndex: number;
	episodeProgress: string;
	episode: EpisodeData | null;
}

export interface GeneratedProgressData {
	allEpisodesCount: number;
	currentEpisodeNumber: number;
	progress: string;
}
