import downloader from 'image-downloader';
import { data } from './fandom-data';

const getUrl = (episode) => episode.imageUrl.replace('/scale-to-width-down/', '');

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
                dest: `./src/assets/img/${q.filename}.png`,
            })
            .then(({ filename, image }) => {
                console.log('Done', q.filename);
            })
            .catch((err) => console.error('Error', q.filename, err))
    }
};

makeQueue();
downloadImages();



