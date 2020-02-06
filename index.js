$(document).ready(function() {
    $.get({
        url: 'https://lgk9c3wzdi.execute-api.us-east-2.amazonaws.com/dev/users' ,
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var div = document.createElement('div');
                div.innerHTML = data[i].name.S;
                div.className = 'user';
                document.getElementById('content').appendChild(div);
            }
        }
    });

    

});