const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const post_id = urlParams.get('post_id');

function get_post_block(post, idx) {
    return `<div class="post_block ${idx % 2 === 0 ? 'even_row' : 'odd_row'}">
                <div class="row">
                   <div class="col-md-4 col-lg-2">${post.username}</div>
                    <div class="col-md-4 col-lg-1">${post.title}</div>
                    <div class="col-md-4 col-lg-3">${post.postdetail}</div>
                    <div class="col-md-2 col-lg-1">${post.tags}</div>
                    <div class="col-md-3 col-lg-2">${post.replys.length}</div>
                    <div class="col-md-4 col-lg-1">${post.timepost[0].date} ${post.timepost[0].time}</div>
                    <div class="col-md-3 col-lg-1 d-flex justify-content-end" data-username="${post.username}" data-title="${post.title}" data-url="${post.url}" data-detail="${post.detail}" data-tags="${post.tags}" data-replys="${post.replys}"data-timepost="${post.timepost}">
                        <button class="btn like btn-outline-primary" value="0">
                        Like</button>
                    </div>
                </div>
            </div>`
}

function showList(posts) {
    $('#fav_list').empty();

    posts.forEach((post,idx)=>{
        $('#fav_list')
            .append(get_post_block(post,idx))
    })

}
$(document).ready(()=>{
    $.getJSON('/get_current_user').done((data)=>{
        if(data.message==="success"){
            const user = data.data;
            $('.login').remove();
            $('#showname').text(user.fullname);
            $.getJSON('/get_all_posts').done(function (data) {
                console.log("sent")
                if (data.message === "success") {
                    /*        filterList(data.data);*/
                    showList(data.data);
                    console.log(data)
                }
            })
            $('.like').on('click', function () {
                const post_username = $(this).parents('div').attr('data-username');
                const post_title = $(this).parents('div').attr('data-title');
                const post_url = $(this).parents('div').attr('data-url');
                const post_detail =$(this).parents('div').attr('data-detail');
                const post_tags = $(this).parents('div').attr('data-tags');
                const post_replys = $(this).parents('div').attr('data-replys');
                const post_timepost = $(this).parents('div').attr('data-timepost');
                $.post('/update_posts', {username:post_username, title:post_title,url:post_url,detail:post_detail,tags:post_tags,replys:post_replys,timepost:post_timepost}).done(
                    (data)=>{
                        if(data.message==="success"){
                            console.log("winrar!");
                        }else{
                            //handling database error
                            console.log("bot");
                        }
                    }
                )
            });
        }else{
            $('.logout').remove();
            $('.like').on('click', function () {
                location.href = "/login";
            });
        }
    })
})


let PresDps = [];
let ViceDps = [];
let SecrDps = [];
let TresDps = [];


let countpres = 1;
let countvp = 1
let countsecr = 1
let counttres = 1

let chart1;
let chart2;
let chart3;
let chart4;

$.getJSON("/get_pres")
    .done(function (data) {
        if (data.message === "success") {
            ////console.log(data.data)
            data.data.forEach(function (data, idx) {
                console.log(data.Votes)

                PresDps.push({
                    label: data.Candidate,
                    y: data.Votes
                })
                console.log(PresDps)

                $("#presnum").text(countpres + " Candidates")

                //console.log(presInfo)
                countpres++;

            })

            chart1 = new CanvasJS.Chart("chartContainer1", {
                title: {
                    text: "President:"
                },
                data: [{
                    type: "pie",
                    dataPoints: PresDps
                }]
            });
            chart1.render();

        }
    });

$.getJSON("/get_vp")
    .done(function (data) {
        if (data.message === "success") {
            //console.log(data.data)
            let count = 0;
            data.data.forEach(function (data, idx) {
                ////console.log(data)

                ViceDps.push({
                    label: data.Candidate,
                    y: data.Votes
                })
                $("#vpnum").text(countvp + " Candidates")                // viceInfo.push([data.Candidate ,data.Votes, count])
                //console.log(viceInfo)
                countvp++;

            })

            chart2 = new CanvasJS.Chart("chartContainer2", {
                title: {
                    text: "Vice President:"
                },
                data: [{
                    type: "pie",
                    dataPoints: ViceDps
                }]
            });
            chart2.render();
        }
    });

$.getJSON("/get_secr")
    .done(function (data) {
        if (data.message === "success") {
            let count = 0;
            data.data.forEach(function (data, idx) {
                //console.log(data)

                SecrDps.push({
                    label: data.Candidate,
                    y: data.Votes
                })
                $("#secnum").text(countsecr + " Candidates")                // secrInfo.name.push(data.Candidate);
                // secrInfo.idx.push(count);
                // secrInfo.push([data.Candidate ,data.Votes, count])
                //console.log(viceInfo)
                countsecr++;

            })

            console.log(SecrDps)
            chart3 = new CanvasJS.Chart("chartContainer3", {
                title: {
                    text: "Secretary:"
                },
                data: [{
                    type: "pie",
                    dataPoints: SecrDps
                }]
            });
            chart3.render();
        }
    });


$.getJSON("/get_tres")
    .done(function (data) {
        if (data.message === "success") {
            data.data.forEach(function (data, idx) {
                //console.log(data.Candidate)

                TresDps.push({
                    label: data.Candidate,
                    y: data.Votes
                })

                $("#tresnum").text(counttres + " Candidates")                // tresInfo.push([data.Candidate , data.Votes, count])
                //console.log(tresInfo)
                counttres++;

            })
            chart4 = new CanvasJS.Chart("chartContainer4", {
                title: {
                    text: "Treasurer:"
                },
                data: [{
                    type: "pie",
                    dataPoints: TresDps
                }]
            });
            chart4.render();
        }
    });
