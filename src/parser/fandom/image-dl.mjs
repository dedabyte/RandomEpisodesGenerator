import downloader from 'image-downloader';
import {data} from './fandom-data';

// const getUrl = (episode) => episode.imageUrl.replace('/scale-to-width-down/', '');
const imageSize = 700;
const getUrl = (episode) => episode.imageUrl + imageSize;

const makeSE = (sIdx, eIdx) => `${sIdx}-${eIdx}`;

const queue = [];

// const queue = [
//     {
//         "filename": '1-0',
//         "url": "https://vignette.wikia.nocookie.net/friends/images/f/f0/TOWRoss%27NewGirlfriend.png/revision/latest",
//     },
//     {
//         "filename": '1-2',
//         "url": "https://vignette.wikia.nocookie.net/friends/images/1/11/TOWHecklesDies.png/revision/latest",
//     },
// ];

const makeQueue = () => {
	data.forEach((season, sIdx) => {
		season.forEach((episode, eIdx) => {
			try {
				queue.push({
					filename: makeSE(sIdx, eIdx),
					url: getUrl(episode),
				});
			} catch (e) {
				console.log(makeSE(sIdx, eIdx))
			}
		});
	});
};

const downloadImages = async () => {
	for (const q of queue) {
		await downloader
			.image({
				url: q.url,
				dest: `./public/img/${q.filename}.png`,
				headers: {
					'accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
					'accept-encoding': 'gzip, deflate, br',
					'accept-language': 'en-US,en;q=0.9,sr;q=0.8',
					'cache-control': 'no-cache',
					'pragma': 'no-cache',
					'sec-fetch-dest': 'image',
					'sec-fetch-mode': 'no-cors',
					'sec-fetch-site': 'cross-site',
					'user-agent': 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Mobile Safari/537.36',
				}
			})
			.then(({filename, image}) => {
				console.log('Done', q.filename);
			})
			.catch((err) => console.error('Error', q.filename, err))
	}
};

makeQueue();
downloadImages();



