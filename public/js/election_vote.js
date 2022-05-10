$(document).ready(() => {
    $.getJSON('/get_current_user').done((data) => {
        if (data.message === "success") {
            const user = data.data;
            $('.login').remove();
            $('#showname').text(user.username);
        } else {
            location.href = "/login"
            $('.logout').remove();
        }
    })
})

function listCand(person, idx) {
    return `
       <option value="${person.Candidate}"  candID="${idx}"></option>
 
    `
}

let presInfo = []
$.getJSON("/get_pres")
    .done(function (data) {
        if (data.message === "success") {
            ////console.log(data.data)
            let count = 0;
            data.data.forEach(function (data, idx) {
                ////console.log(data)
                $("#pres").append(listCand(data, idx))
                presInfo.push([data.Candidate ,data.Votes, count])
                //console.log(presInfo)
                count++;

            })
        }
    });
let viceInfo = []
$.getJSON("/get_vp")
    .done(function (data) {
        if (data.message === "success") {
            //console.log(data.data)
            let count = 0;
            data.data.forEach(function (data, idx) {
                ////console.log(data)
                $("#vice").append(listCand(data, idx))
                viceInfo.push([data.Candidate ,data.Votes, count])
                //console.log(viceInfo)
                count++;

            })
        }
    });
let secrInfo = [];
$.getJSON("/get_secr")
    .done(function (data) {
        if (data.message === "success") {
            let count = 0;
            data.data.forEach(function (data, idx) {
                ////console.log(data)
                $("#secr").append(listCand(data, idx))
                // secrInfo.name.push(data.Candidate);
                // secrInfo.idx.push(count);
                secrInfo.push([data.Candidate ,data.Votes, count])
                //console.log(viceInfo)
                count++;

            })
        }
    });

let tresInfo = []
$.getJSON("/get_tres")
    .done(function (data) {
        if (data.message === "success") {
            let count = 0;
            data.data.forEach(function (data, idx) {
                ////console.log(data.Candidate)

                $("#tres").append(listCand(data, idx))
                tresInfo.push([data.Candidate , data.Votes, count])
                //console.log(tresInfo)
                count++;

            })
        }
    });

$('form').on('submit',function (set){
    const voteNames = {
        presVote: $('#presVote').val(),
        viceVote: $('#viceVote').val(),
        secrVote: $('#secrVote').val(),
        tresVote: $('#tresVote').val(),
    }

    if(voteNames.presVote.length===0) {
        set.preventDefault();
        $('#error_msg').text("President Vote cannot be empty");
    } else if(voteNames.viceVote.length===0) {
        set.preventDefault();
        $('#error_msg').text("Vice President Vote cannot be empty");
    } else if(voteNames.secrVote.length===0) {
        set.preventDefault();
        $('#error_msg').text("Secretary Vote cannot be empty");
    } else if(voteNames.tresVote.length===0) {
        set.preventDefault();
        $('#error_msg').text("Treasurer Vote cannot be empty");
    }

})
