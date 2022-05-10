function fillPost(post) {
    $('#title').val(post.title);
    $('#url').val(post.url);
    $('#postdetail').val(post.postdetail);
    $('#tags').val(post.tags);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const errorMessage = urlParams.get('error_message');
const input = JSON.parse(urlParams.get('input'));
const post_id = urlParams.get('post_id');


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


$('form').on('submit', function (e) {
    let sub = {
        title: $('#title').val(),
        url: $('#url').val(),
        postdetail: $('#postdetail').val(),
        tags: $('#tags').val()
    }
    if(sub.title.length === 0  ) {
        e.preventDefault();
        $('#error_msg').text("Title cannot be empty");
    }else if(sub.postdetail.length===0) {
        e.preventDefault();
        $('#error_msg').text("Details cannot be empty");
    }else if(sub.tags.length===0) {
        e.preventDefault();
        $('#error_msg').text("Tags cannot be empty");
    }


    if (post_id) {
        $('form').append(() => {
            const input = $("<input>")
                .attr('name', '_id')
                .attr('value', post_id)
            return input;
        })
    }
});

if (errorMessage) {
    fillPost(input);
}


if (post_id && !errorMessage) {
    $.getJSON('/get_post_by_id?post_id=' + post_id).done((data) => {
        if (data['message'] = 'success') {
            //console.log(data.data)
            fillPost(data.data)
        }
    })
}

function OnCancel() {
    if (post_id) {
        return
    } else {
        window.location.href = "/forum"
    }
}
