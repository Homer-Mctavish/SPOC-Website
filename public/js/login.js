const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("error")) {
    $('#error_msg').text(urlParams.get("error"));
}
function Register(){
        location.href="../html/register.html";
    }

$('form').on('submit', function (e) {
    let username = $('#username').val();
    let pass = $('#password').val();
    if(username.length===0) {
        e.preventDefault();
        $('#error_msg').text("Email cannot be empty");
    } else if(pass.length===0){
        e.preventDefault();
        $('#error_msg').text("Password cannot be empty");
    } else {
        console.log("Something failed, Sworrwy x<");
    }
});




$(document).ready(()=>{
    $.getJSON('/get_current_user').done((data)=>{
        if(data.message==="success"){
            const user = data.data;
            $('.login').remove();
            $('#showname').text(user.username);
        }else{
            $('.logout').remove();
        }
    })
})