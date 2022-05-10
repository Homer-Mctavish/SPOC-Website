// function get_car_personal(car){
//     return `<li className="list-group-item">
//     <div className="row">
//                     <div class="col">${car.year}</div>
//                     <div class="col">${car.make}</div>
//                     <div class="col">${car.model}</div>
//                     <div class="col">${car.color}</div>
//                     <div class="col">${car.price}</div>
//     </div>
// </li>`
// }

//testing commit again


function load_user(user) {
    $('#name').text(user.username);
    $('#profile_img').attr('src', user.profile);
    $('#email').text("Email: " + user.email);

}

function get_post_object(post, idx) {


    //console.log(post.timepost[0].date)
    return `<li class="list-group-item" data-p="${post._id}">
                <div class="row ${idx % 2 === 0 ? 'even_row' : 'odd_row'}">
                    <div class="row infoDiv">
                    <div class="col-3">
                        <h2 class="post_title">${post.title}</h2>
                    </div>
                    <div class="col-3">    
                        <p class="tags">${post.postdetail}</p>
                    </div>
                    <div class="col-3">    
                        <p class="tags">Tags: ${post.tags}</p>
                    </div>
                    <div class="col-3">
                        <p class="time">${post.timepost[0].date} ${post.timepost[0].time}</p>
                    </div>
                    </div>
              
                </div>
          </li>`
}

function showList(posts) {
    $('#post_list').empty();
    posts.forEach((post, idx) => {
        $('#post_list').append(get_post_object(post, idx));
    });

    $('.post_title').hover(function () {
        $(this).toggleClass('highlight_forum')
        // console.log("hovering")

    })

    $('.post_title').on('click', function () {
        const post_id = $(this).parents('li').attr('data-p');
        location.href = "post_detail.html?post_id=" + post_id;
    });
}


$(document).ready(function () {
    $.getJSON("/get_all_tags")
        .done(function (data) {
            console.log(data.data)
            if (data.message === "success") {
                data.data.forEach(likedtag => {
                    //$('#tag_list_personal').append(get_tags(likedtag));
                })
            }
        });
    $.getJSON('/get_current_user')
        .done(function (data) {
            if (data["message"] === "success") {
                let user = data["data"];
                showList(user.posts);
                console.log(data)
                load_user(user);
                $('.login').remove();
                $('#showname').text(user.username);


            } else {
                $('.logout').remove();
            }
        });
});
