$(document).ready(() => {
    $.getJSON('/get_current_user').done((data) => {
        if (data.message === "success") {
            const user = data.data;
            $('.login').remove();
            $('#showname').text(user.username);
        } else {
            $('.logout').remove();
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

            // chart1 = new CanvasJS.Chart("chartContainer1", {
            //     title: {
            //         text: "President:"
            //     },
            //     data: [{
            //         type: "bar",
            //         dataPoints: PresDps
            //     }]
            // });
            // chart1.render();

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

            // chart2 = new CanvasJS.Chart("chartContainer2", {
            //     title: {
            //         text: "Vice President:"
            //     },
            //     data: [{
            //         type: "bar",
            //         dataPoints: ViceDps
            //     }]
            // });
            // chart2.render();
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

            // console.log(SecrDps)
            // chart3 = new CanvasJS.Chart("chartContainer3", {
            //     title: {
            //         text: "Secretary:"
            //     },
            //     data: [{
            //         type: "bar",
            //         dataPoints: SecrDps
            //     }]
            // });
            // chart3.render();
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
            // chart4 = new CanvasJS.Chart("chartContainer4", {
            //     title: {
            //         text: "Treasurer:"
            //     },
            //     data: [{
            //         type: "bar",
            //         dataPoints: TresDps
            //     }]
            // });
            // chart4.render();
        }
    });


