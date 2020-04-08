// https://en.wikipedia.org/wiki/Friends_(season_X)

const $ = () => {};

let episodes = [];

let trimmer = (text) => {
    let trimmed = text || '';

    // remove "
    trimmed = trimmed.replace(/"/gm, '');

    // remote line breaks
    trimmed  = trimmed.replace(/(\r\n|\n|\r)/gm, '');

    return trimmed.trim();
};

$('table.wikiepisodetable tbody').find('tr.vevent').each(function(index){
    const $tr = $(this);
    const $tds = $tr.children();

    const episode = index + 1;
    const title = trimmer($tds.eq(2).text());
    const description = trimmer($tr.next().find('td').text());

    episodes.push({
        episode,
        title,
        description,
    });
});

console.log(JSON.stringify(episodes, null, 2));
