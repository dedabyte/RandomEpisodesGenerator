// https://friends.fandom.com/wiki/List_of_Friends_Episodes

const $ = () => {
};

console.clear();

let episodes = [];

let trimmer = (text) => {
    let trimmed = text || '';

    // remove "
    trimmed = trimmed.replace(/"/gm, '');

    // remote line breaks
    trimmed = trimmed.replace(/(\r\n|\n|\r)/gm, '');

    return trimmed.trim();
};

let trimUrl = (url) => {
    if (!url) return null;
    return url.split('140?cb')[0];
};

let isLeadingTr = ($tr) => !!$tr.attr('bgcolor');

let isMetaTr = ($tr) => $tr.children().length > 1;

$('table').each(function () {
    const $table = $(this);

    const season = [];

    $table.find('tr').each(function () {

        const $tr = $(this);

        if (isLeadingTr($tr)) return;

        if (isMetaTr($tr)) {
            const episode = {};
            const $tds = $tr.find('td');

            episode.title = trimmer($tds.eq(3).text());
            episode.imageUrl = trimUrl($tds.eq(2).find('img').attr('src'));
            episode.airDate = trimmer($tds.eq(6).text());

            const $nextTr = $tr.next();
            episode.plot = trimmer($nextTr.text());

            season.push(episode);
        }

    });

    episodes.push(season);
});

console.log(JSON.stringify(episodes, null, 2));
