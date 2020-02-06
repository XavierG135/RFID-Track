$(document).ready(function() {
    $.get({
        url: 'https://lgk9c3wzdi.execute-api.us-east-2.amazonaws.com/dev/users' ,
        success: function(data) {
            var table = document.createElement('table');
            for (var i = 0; i < data.length; i++) {
                var tr = document.createElement('tr');
                var tdName = document.createElement('td');    
                var tdGender = document.createElement('td');
                var tdAge = document.createElement('td');
                var div = document.createElement('div');
                tdName.innerHTML = data[i].name.S;
                if (data[i].gender.BOOL) {
                    tdGender.innerHTML = 'Male';
                } else {
                    tdGender.innerHTML = 'Female';
                }
                tdAge.innerHTML = data[i].age.N;
                tr.appendChild(tdName);
                tr.appendChild(tdAge);
                tr.appendChild(tdGender);
                table.appendChild(tr);
                tr.className = 'user';
                tdName.className = 'name';
                tdGender.className = 'gender';
                tdAge.className = 'age';
                //div.className = 'user';
                
            }
            document.getElementById('content').appendChild(table);
            table.className = 'users';
        }
    });

    

});