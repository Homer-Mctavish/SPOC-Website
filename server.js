const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const fs = require('fs')


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "MyLittleSecretThatIdontWantOthersToKnow",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/spocDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });


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


const presSchema = new mongoose.Schema({
    Candidate: {
        type: String
    },
    Votes: {
        type: Number
    }
})
const vpSchema = new mongoose.Schema({
    Candidate: {
        type: String
    },
    Votes: {
        type: Number
    }
})
const secrSchema = new mongoose.Schema({
    Candidate: {
        type: String
    },
    Votes: {
        type: Number
    }
})
const tresSchema = new mongoose.Schema({
    Candidate: {
        type: String
    },
    Votes: {
        type: Number
    }
})

const voterSchema = new mongoose.Schema({
    username: {
        type: String
    }
})


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        minlength: 3
    },
    password: {
        require: true,
        type: String
    },
    email: {
        type: String,
        require: true
    },
    profile: {
        type: String,
        require: true
    },
    posts: [
        forumPostSchema
    ]
})



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


userSchema.plugin(passportLocalMongoose)

const Post = mongoose.model('Post', forumPostSchema)
const Voted = mongoose.model('Voted', voterSchema)

const User = mongoose.model('User', userSchema);

const Pres = mongoose.model('Pres', presSchema);
const Vp = mongoose.model('Vp', vpSchema);
const Secr = mongoose.model('Secr', secrSchema);
const Tres = mongoose.model('Tres', tresSchema);
const event = mongoose.model('event', eventSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const date = new Date()
const year = date.getFullYear();

// console.log(year)


app.listen(3000, function () {
    console.log("server started at 3000");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/html/index.html");
});

app.get('/forum', (req, res) => {
    if (req.query.error) {
        res.redirect("/html/forum.html?error=" + req.query.error);
    } else {
        res.redirect("/html/forum.html");
    }
});

app.get('/get_post_by_id',
    function (req, res) {
        // console.log(req.query.movie_id);
        Post.find({"_id": req.query.post_id},
            function (err,
                      data) {
                if (err || data.length === 0) {
                    res.send({
                        "message": "internal database error",
                        "data": {}
                    });
                } else {
                    res.send({
                        "message": "success",
                        "data": data[0]
                    })
                }
            });
    });

app.get("/get_all_posts", function (req, res) {
    Post.find(function (err, data) {


        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

app.get("/get_event_by_id", function (req, res) {
    event.find({"_id": req.query.event_id}, function (err, data) {
        if (err || data.length === 0) {
            console.log('ERROR! not sending to JSON')
            res.send({
                "message": "internal database error",
                "data": {}
            });
        } else {
            console.log('s8c')

            res.send({
                "message": "success",
                "data": data[0]
            })
        }
    });
});


app.get("/get_pres", function (req, res) {
    Pres.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});
app.get("/get_vp", function (req, res) {
    Vp.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});
app.get("/get_secr", function (req, res) {
    Secr.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});
app.get("/get_tres", function (req, res) {
    Tres.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});


app.get('/forum_edit', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.query.error) {
            res.redirect("/html/forum_edit.html?error=" + req.query.error);
        } else {
            res.redirect("/html/forum_edit.html");
        }
    } else {
        res.redirect("/login")
    }

})
;

app.get("/get_posts_by_filters", (req, res) => {

    console.log(req.query.search_key)


    const sk = req.query.search_key;

    Post.find(
        {
            $or: [
                {title: {$regex: sk}},
                {tags: {$regex: sk}}
            ]
        },
        (err, data) => {
            if (err) {
                res.send({
                    "message": "error",
                    "data": []
                })
            } else {
                //console.log(data)
                res.send({
                    "message": "success",
                    "data": data
                })
            }
        }
    )
})

app.post("/forum_edit", (req, res) => {

    const tagArr = req.body.tags.split(', ')

    const timeTime = new Date().toLocaleTimeString();
    const dateDate = new Date().toLocaleDateString()
    console.log(timeTime + ' ' + dateDate);


    const post = {
        title: req.body.title,
        url: req.body.url,
        postdetail: req.body.postdetail,
        username: req.user.username,
        tags: tagArr,
        timepost: {
            time: timeTime,
            date: dateDate
        }
    }

    console.log(req.body.tags)

    if (req.body._id) {

        User.updateOne(
            {_id: req.user._id},
            {$push: {posts: post}},
            {runValidators: true},
            (err, info) => {
                if (err) {
                    console.log(info)
                } else {
                    console.log("success user update")
                }
            }
        )


        Post.updateOne(
            {_id: req.body._id},
            {$set: post},
            {runValidators: true},
            (err, info) => {
                if (err) {
                    res.redirect('/html/forum_edit.html?error_message='
                        + err["message"]
                        + "&input=" + JSON.stringify(post)
                        + "&postId=" + req.body._id);
                } else {
                    res.redirect('/html/post_detail.html?post_id=' + req.body._id)
                }
            }
        )

    } else {

        const np = new Post(post);

        User.updateOne(
            {_id: req.user._id},
            {$push: {posts: post}},
            {runValidators: true},
            (err, info) => {
                if (err) {
                    //console.log(info)
                } else {
                    console.log("success user update")
                }
            }
        )

        np.save((err, new_post) => {
            if (err) {
                console.log(err["message"]);
                res.redirect('/html/forum_edit.html?error_message=' + err["message"]
                    + "&input=" + JSON.stringify(post) + "&post_id=" + req.body._id)
            } else {
                console.log(new_post._id)
                console.log(new_post)
                res.redirect('/html/post_detail.html?post_id=' + new_post._id)
                //res.redirect('/forum')

            }
        })
    }
});

app.post('/delete_post_by_id', (req, res) => {
    Post.deleteOne(
        {"_id": req.body._id},
        {},
        (err) => {
            if (err) {
                res.send({
                    "message": "database deletion error"
                })
            } else {
                res.send({
                    "message": "success"
                })
            }
        }
    )
});


app.get('/get_user_by_id',
    function (req, res) {
        User.find({"_id": req.query.user_id}, function (err, data) {
            if (err || data.length === 0) {
                console.log('ERROR! not sending to JSON')
                res.send({
                    "message": "internal database error",
                    "data": {}
                });
            } else {
                console.log('s8c')

                res.send({
                    "message": "success",
                    "data": data[0]
                })
            }
        });
    });


app.get('/get_current_user', function (req, res) {
    if (req.isAuthenticated()) {
        res.send({
            message: "success",
            data: req.user

        })
    } else {
        res.send({
            message: "user not found",
            data: {}
        })
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});


app.get('/register', (req, res) => {
    if (req.query.error) {
        res.redirect("/html/register.html?error=" + req.query.error);
    } else {
        res.redirect("/html/register.html");
    }
});

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/")
    } else {
        if (req.query.error) {
            res.sendFile("/html/login.html?error=" + req.query.error);
        } else {
            res.redirect("/html/login.html");
        }
    }
});

app.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect("/");
    } else {
        res.redirect('/')
    }
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err) => {
        if (err) {
            res.redirect("/html/login.html?error=Database error");
        } else {
            const authenticate = passport.authenticate('local', {
                successRedirect: "/",
                failureRedirect: "/html/login.html?error= username and password do not match"
            })
            authenticate(req, res);
        }
    })
});


app.post('/register', (req, res) => {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        profile: req.body.avatar
    }

    console.log(req.body)


    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/html/register.html?error=' + err);

        } else {
            console.log(user);
            const authenticate = passport.authenticate('local');
            authenticate(req, res, () => {
                res.redirect("/html/account.html");
            });
        }
    })
});
app.get("/account", (req, res) => {
    //save the user
    const user = {
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.email,
        profile: req.body.avatar
    }
    if (req.isAuthenticated()) {
        res.redirect("/html/account.html");
    } else {
        res.redirect("/html/login.html");
    }
});

app.get('/reply', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.query.error) {
            res.redirect("/html/reply.html?error=" + req.query.error);
        } else {
            res.redirect("/html/reply.html");
        }
    }
})

app.post('/reply', (req, res) => {

    const post_id = req.body._id

    const timeTime = new Date().toLocaleTimeString();
    const dateDate = new Date().toLocaleDateString()

    const replyInfo = {
        username: req.user.username,
        replyText: req.body.replyText,
        timereply: {
            time: timeTime,
            date: dateDate
        }
    }
    console.log(post_id)
    console.log(replyInfo)

    if (req.body._id) {
        Post.updateOne(
            {_id: post_id},
            {
                $push: {
                    replys: replyInfo
                }
            },
            {},
            (err) => {
                if (err) {
                    res.send({
                        message: "database error"
                    })
                } else {
                    // res.send({
                    //     message:"success"
                    // })
                    res.redirect('/html/post_detail.html?post_id=' + post_id)
                }
            }
        )
    } else {
        res.redirect('/forum')
    }
})

app.get('/election', (req, res) => {
    if (req.query.error) {
        res.redirect("/html/election.html?error=" + req.query.error);
    } else {
        res.redirect("/html/election.html");
    }
});

app.get('/election_vote', (req, res) => {

    if (req.query.error) {
        res.redirect("/html/election_vote.html?error=" + req.query.error);
    } else {
        res.redirect("/html/election_vote.html");
    }
})

console.log(Voted)

app.post('/election_vote', async (req, res) => {
    const votes = {
        pres: req.body.presVote,
        vice: req.body.viceVote,
        secr: req.body.secrVote,
        tres: req.body.tresVote
    }

    let presVote = 0;
    let viceVote = 0;
    let secrVote = 0;
    let tresVote = 0;

    let presId = null;
    let viceId = null;
    let secrId = null;
    let tresId = null;

    if (req.isAuthenticated()) {
        console.log(req.user.username)

        console.log("new user added")
        const username = {
            username: req.user.username
        }
        const nc = new Voted(username);
        nc.save((err, added) => {
            if (err) {
                console.log(err["message"]);
                //res.send("Database Error!")

            } else {
                console.log(added._id + "This is new")
            }
        })
    } else {
        res.location("/login")
    }
    await Pres.find({Candidate: votes.pres}, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            //console.log(data[0]._id)
            presVote = data[0].Votes;
            presId = data[0]._id
            presVote++;

        }
    }).clone()

    await Vp.find({Candidate: votes.vice}, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            //console.log(data[0].Votes)
            viceVote = data[0].Votes;
            viceId = data[0]._id
            viceVote++;

        }
    }).clone()

    await Secr.find({Candidate: votes.secr}, (error, data) => {
        if (error) {
            //console.log(error)
        } else {
            //console.log(data[0].Votes)
            secrVote = data[0].Votes
            secrId = data[0]._id
            secrVote++;

        }
    }).clone()

    await Tres.find({Candidate: votes.tres}, (error, data) => {
        if (error) {
            //console.log(error)
        } else {
            //console.log(data[0].Votes)
            tresVote = data[0].Votes;
            tresId = data[0]._id
            tresVote++;


        }
    }).clone()
    //
    //
    // console.log(presVote + " heck")
    // console.log(viceVote + " darn")
    // console.log(secrVote + " frick")
    // console.log(tresVote + " poop")


    if (presId) {
        Pres.updateOne(
            {_id: presId},
            {
                $set: {
                    Votes: presVote
                }
            },
            {},
            (err) => {
                if (err) {
                    res.send({
                        message: "database error " + err
                    })
                } else {
                    // res.send({
                    //     message:"success"
                    // })
                    // res.redirect('/html/post_detail.html?post_id=' + post_id)
                }
            }
        )
    }
    if (viceId) {
        Vp.updateOne(
            {_id: viceId},
            {
                $set: {
                    Votes: viceVote
                }
            },
            {},
            (err) => {
                if (err) {
                    res.send({
                        message: "database error " + err
                    })
                } else {
                    // res.send({
                    //     message:"success"
                    // })
                    // res.redirect('/html/post_detail.html?post_id=' + post_id)
                }
            }
        )
    }
    if (secrId) {
        Pres.updateOne(
            {_id: secrId},
            {
                $set: {
                    Votes: secrVote
                }
            },
            {},
            (err) => {
                if (err) {
                    res.send({
                        message: "database error " + err
                    })
                } else {
                    // res.send({
                    //     message:"success"
                    // })
                    // res.redirect('/html/post_detail.html?post_id=' + post_id)
                }
            }
        )
    }
    if (tresId) {
        Pres.updateOne(
            {_id: tresId},
            {
                $set: {
                    Votes: tresVote
                }
            },
            {},
            (err) => {
                if (err) {
                    res.send({
                        message: "database error " + err
                    })
                } else {
                    // res.send({
                    //     message:"success"
                    // })
                    // res.redirect('/html/post_detail.html?post_id=' + post_id)
                }
            }
        )
    }

    res.redirect('/election')

})

app.get('/archives', (req, res) => {
    if (req.query.error) {
        res.redirect("/html/post_archive.html?error=" + req.query.error);
    } else {
        res.redirect("/html/post_archive.html");
    }
});


app.get('/analytics', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.query.error) {
            res.redirect("/html/analytics.html?error=" + req.query.error);
        } else {
            res.redirect("/html/analytics.html");
        }
    } else {
        res.redirect('/login')
    }
})


app.get('/events', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.query.error) {
            res.redirect("/html/events.html?error=" + req.query.error);
        } else {
            res.redirect("/html/events.html");
        }
    } else {
        res.redirect('/login')
    }
})

app.post ('/update_posts', (req, res) => {
    const post = {
        stock_num:req.body.username,
        make:req.body.title,
        model:req.body.url,
        year:req.body.detail,
        color:req.body.tags,
        price:req.body.replys,
        timepost:req.body.timepost
    }
    console.log(post);
    if(req.body.stock_num){
        Post.create(post, function(err, data){
            if(err){
                res.send({
                    "message":"database error",
                    "data":[]
                })
            }else{
                res.send({
                    "message":"success",
                    "data":data
                })
            }
        })
    }else{
        console.log("No bitches?")
    }
})

