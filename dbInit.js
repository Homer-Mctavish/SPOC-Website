const mongoose = require("mongoose");
const csvParse = require("csv-parser")
const fs = require('fs');

const results1 = [];
const results2 = [];
const results3 = [];
const results4 = [];

const postresult = [];
let postlist =[];

let presList = [];
let vpList = [];
let secrList = [];
let tresList = [];


mongoose.connect('mongodb://localhost:27017/spocDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

//I thought this was america! Why can I make multiple databases at the same
// time to make it more complicated than it should be.'land of the free'

// mongoose.connect('mongodb://localhost:27017/ElectVpDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });
// mongoose.connect('mongodb://localhost:27017/ElectSecrDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });
// mongoose.connect('mongodb://localhost:27017/ElectTresDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });

const presSchema = {
    Votes: Number,
    Candidate: String
}
const vpSchema = {
    Votes: Number,
    Candidate: String
}
const secrSchema = {
    Votes: Number,
    Candidate: String
}
const tresSchema = {
    Votes: Number,
    Candidate: String
}


const timeSchema = {
    time: {
        type: String
    },
    date: {
        type: String
    }
}

const replySchema = {

    username: {
        type: String
    },
    replyText: {
        type: String
    },
    timereply: [
        timeSchema
    ]


}

const eventSchema = {

    name:{
        type: String
    },
    date: {
        type: String
    },
    location: {
        type: String
    },
    detail: {type: String
    }
}

const forumPostSchema = {
    title: {
        type: String,
        require: [true, "Title cannot be empty!"]
    },
    url: {
        type: String,
        require: [false]
    },
    postdetail: {
        type: String,
        require: [true, "Description cannot be empty!"],
        max: 500
    },
    tags: [{
        type: String,
        require: [true, "Tags cannot be empty!"]
    }],
    username: {
        type: String
    },
    replys: [
        replySchema
    ],
    timepost: [
        timeSchema
    ]

}

const Post = mongoose.model('Post', forumPostSchema)


const Pres = mongoose.model('Pres', presSchema);
const Vp = mongoose.model('Vp', vpSchema);
const Secr = mongoose.model('Secr', secrSchema);
const Tres = mongoose.model('Tres', tresSchema);
const event = mongoose.model('event', eventSchema);



fs.createReadStream(__dirname + "/public/js/data/pres.csv")
    .pipe(csvParse({}))
    .on('data', (data) => results1.push(data)).on('end', () => {
    results1.forEach(function (info) {
        presList.push({
            Votes: info["Votes"],
            Candidate:info["Candidate"]

        })
    })
    Pres.insertMany(presList, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all data saved");
            //mongoose.connection.close();
        }
    });

})


fs.createReadStream(__dirname + "/public/js/data/vpElect.csv")
    .pipe(csvParse({}))
    .on('data', (data) => results2.push(data)).on('end', () => {
    //console.log(results)
    results2.forEach(function (info) {
        vpList.push({
            Votes: info["Votes"],
            Candidate:info["Candidate"]

        })
    })
    Vp.insertMany(vpList, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all data saved");
            //mongoose.connection.close();
        }
    });

})
fs.createReadStream(__dirname + "/public/js/data/secrElect.csv")
    .pipe(csvParse({}))
    .on('data', (data) => results3.push(data)).on('end', () => {

    results3.forEach(function (info) {
        secrList.push({
            Votes: info["Votes"],
            Candidate:info["Candidate"]

        })
    })
    Secr.insertMany(secrList, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all data saved");
            //mongoose.connection.close();
        }
    });

})
fs.createReadStream(__dirname + "/public/js/data/tresElect.csv")
    .pipe(csvParse({}))
    .on('data', (data) => results4.push(data)).on('end', () => {
    //console.log(results)
    results4.forEach(function (info) {
        tresList.push({
            Votes: info["Votes"],
            Candidate:info["Candidate"]

        })
    })
    //console.log(carList)
    Tres.insertMany(tresList, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all data saved");
            //mongoose.connection.close();
        }
    });

})
const rawdata = fs.readFileSync(__dirname+ "/public/js/data/posts.json")
jsonList = JSON.parse(rawdata);


    jsonList.forEach(function (info) {
        postlist.push({
            "title": info["title"],
            "url":info["url"],
            "postdetail":info["postdetail"],
            "username":info["username"],
            "tags": info["tags"],
            "timepost": info["timepost"],
            "replys": info["replys"]


        })
    })
    Post.insertMany(postlist, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all data saved");
            //mongoose.connection.close();
        }
    });


//const rawdata = fs.readFileSync(__dirname + "/data100.csv");
//const dataString = rawdata.toString()
//const dataParse = JSON.parse(dataString)
//console.log(dataParse)