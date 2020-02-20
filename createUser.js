$(document).ready(function() {
    document.getElementById('enterData').addEventListener("click", function(){
        var gender;
        if (document.getElementById("userGender").value=="true") {
            gender = true;
        } else {
            gender = false;
        }
        $.post({
            url: 'https://lgk9c3wzdi.execute-api.us-east-2.amazonaws.com/dev/users/',
            contentType: 'application/json',
            data:JSON.stringify({
                message: "crespo is a simp",
                name: document.getElementById("userName").value ,
                age: parseInt(document.getElementById("userAge").value),
                gender: gender,
                grade: parseInt(document.getElementById("userGrade").value),
                id: document.getElementById("userID").value
            }) ,
            success: function(data) {
            alert("User Successfully Added");

            }
        })
    })
});