function showevent(event){
        return `<h1>${event.name}</h1>
        <div className="row">
                <div className="card col-sm-12 col-lg-8">
                        <div className="card-body">
                                <div className="row justify-content-between">
                                        <div className="col-5">
                                                <h4>${event.date}</h4>
                                        </div>
                                        <div className="col-5">
                                                <h4>${event.location}</h4>
                                        </div>
                                </div>
                                <hr>
                                        <div className="mr-5">
                                                <p>
                                                   ${event.detail}
                                                </p>

                                        </div>
                        </div>
                </div>
                <div className="card col-sm-12 col-lg-4">
                        <img src="../img/event3.png" id="event_img">

                </div>

        </div>`

}

$(document).ready(()=>{
        $.getJSON('/get_current_user').done((data)=>{
                if(data.message==="success"){
                        const user = data.data;
                        $('.login').remove();
                        $('#showname').text(user.username);
                        $.getJSON('/get_event_by_id').done((data)=>{
                                const event=data.data;
                                showevent(event);
                        })
                }else{
                        $('.logout').remove();
                }
        })
})