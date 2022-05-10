const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let {PythonShell} = require('python-shell')


const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
        {id: 'likes', title: 'Likes'},
        {id: 'thingy', title: 'Video/Post/Image'}
    ]
});

const csvWriter2 = createCsvWriter({
    path: 'pres.csv',
    header: [
        {id: 'votes', title: 'Votes'},
        {id: 'candidate', title: 'Candidate'}
    ]
});

const csvWriter3 = createCsvWriter({
    path: 'out3.csv',
    header: [
        {id: 'attendees', title: 'Attendees'},
        {id: 'event', title: 'Event'}
    ]
});

const csvWriter4 = createCsvWriter({
    path: 'out4.csv',
    header: [
        {id: 'logins', title: 'Logins'}
    ]
});

const data = [
    {
        likes: 43,
        thingy:'feoirjgeg'
    }, {
        likes: 35,
        thingy: 'geruotgh'
    }, {
        likes: 56,
        thingy:'erog'
    },{
        likes: 21,
        thingy:'eogherge'
    },{
        likes: 20,
        thingy: 'gerugh'
    },{
        likes: 1,
        thingy:'etrghe'
    },{
        likes:3,
        thingy:'geitruhg'
    }
];
const data4=[
    {
        logins: 34
    },    {
        logins: 54
    },    {
        logins: 87
    },    {
        logins: 2
    },    {
        logins: 45
    },    {
        logins: 21
    },    {
        logins: 34
    },
]

const data3=[
    {
        attendees: 96,
        event:"Minesweeper tournament"
    },    {
        attendees: 21,
        event:"Mario Kart Tournament"
    },    {
        attendees: 4,
        event:"Elden Ring PVP"
    },    {
        attendees: 5,
        event:"Pokemon Showdown"
    },    {
        attendees: 21,
        event:"MTG Draft"
    },    {
        attendees: 65,
        event:"Masquerade"
    },    {
        attendees: 33,
        event:"Poker Night"
    },
]

const data2=[
    {
        votes: 12,
        candidate:"Joe BIDEN"
    },    {
        votes: 43,
        candidate:"Donaldius Trumpeth"
    },    {
        votes: 99,
        candidate:"Jeb!"
    },    {
        votes: 54,
        candidate:"Barry Bamba"
    },    {
        votes: 1,
        candidate:"Killary"
    },    {
        votes: 78,
        candidate:"The Noid"
    },    {
        votes: 1,
        candidate:"Sam Spearing"
    },
]


csvWriter
    .writeRecords(data)
    .then(()=> console.log('CSV file 1 was written successfully'));
csvWriter2
    .writeRecords(data2)
    .then(()=> console.log('CSV file 2 was written successfully'));
csvWriter3
    .writeRecords(data3)
    .then(()=> console.log('CSV file 3 was written successfully'));
csvWriter4
    .writeRecords(data4)
    .then(()=> console.log('CSV file 4 was written successfully'));

$(document).ready(function () {

    PythonShell.run('Data.py', null, function (err) {
        if (err) throw err;
        console.log('finished 1');
    });
    PythonShell.run('Data2.py', null, function (err) {
        if (err) throw err;
        console.log('finished 2');
    });
    PythonShell.run('Data3.py', null, function (err) {
        if (err) throw err;
        console.log('finished 3');
    });
});