var nav_state = false;
var nav = document.getElementById("header");
var nav_toggle_flag = false;

function showNavbar() {
    nav_toggle_flag = true;
    if (!nav_state) {
        nav.style.width = "300px";
        nav_state = true;
    } else {
        nav.style.width = "0px";
        nav_state = false;
    }
}
window.onclick = function(event) {
    if (!nav_toggle_flag) {
        if (nav_state) {
            nav.style.width = "0px";
            nav_state = false;
        }
    }
    nav_toggle_flag = false;
}

$(document).ready(function() {
    $('#reservation').bind('submit', function(event) {
        event.preventDefault();
        var form_data = new FormData(document.querySelector("form"));
        console.log(form_data);
        if (!form_data.has("time_1[]" || "time_2[]" || "insurance[]") ||
            $('#first_name').val() == "" || $('#last_name').val() == "" ||
            $('#first_name2').val() == "" || $('#last_name2').val() == "" || $('#tel_number').val() == "" ||
            $('#email').val() == "" || $('#letter').val() == "" || $('#prefecture').val() == "" ||
            $('#city').val() == "" || $('#address').val() == "" || $('#child_rearing').val() == ""
        ) {
            document.getElementById("field_error").style.visibility = "visible";

            if (!form_data.has("time_1[]")) {
                document.getElementById("time_error1").style.visibility = "visible";
            } else {
                document.getElementById("time_error1").style.visibility = "hidden";
            }

            if (!form_data.has("time_2[]")) {
                document.getElementById("time_error2").style.visibility = "visible";
            } else {
                document.getElementById("time_error2").style.visibility = "hidden";
            }

            if (!form_data.has("insurance[]")) {
                document.getElementById("insurance_error").style.visibility = "visible";
            } else {
                document.getElementById("insurance_error").style.visibility = "hidden";
            }

            if ($('#first_name').val() == "") {
                document.getElementById("first_name_error").style.visibility = "visible";
            } else {
                document.getElementById("first_name_error").style.visibility = "hidden";
            }

            if ($('#last_name').val() == "") {
                document.getElementById("last_name_error").style.visibility = "visible";
            } else {
                document.getElementById("last_name_error").style.visibility = "hidden";
            }

            if ($('#first_name2').val() == "") {
                document.getElementById("first_name_error2").style.visibility = "visible";
            } else {
                document.getElementById("first_name_error2").style.visibility = "hidden";
            }

            if ($('#last_name2').val() == "") {
                document.getElementById("last_name_error2").style.visibility = "visible";
            } else {
                document.getElementById("last_name_error2").style.visibility = "hidden";
            }

            if ($('#tel_number').val() == "") {
                document.getElementById("tel_number_error").style.visibility = "visible";
            } else {
                document.getElementById("tel_number_error").style.visibility = "hidden";
            }

            if ($('#email').val() == "") {
                document.getElementById("email_error").style.visibility = "visible";
            } else {
                document.getElementById("email_error").style.visibility = "hidden";
            }

            if ($('#letter').val() == "") {
                document.getElementById("letter_error").style.visibility = "visible";
            } else {
                document.getElementById("letter_error").style.visibility = "hidden";
            }

            if ($('#prefecture').val() == "") {
                document.getElementById("prefecture_error").style.visibility = "visible";
            } else {
                document.getElementById("prefecture_error").style.visibility = "hidden";
            }

            if ($('#city').val() == "") {
                document.getElementById("city_error").style.visibility = "visible";
            } else {
                document.getElementById("city_error").style.visibility = "hidden";
            }

            if ($('#address').val() == "") {
                document.getElementById("address_error").style.visibility = "visible";
            } else {
                document.getElementById("address_error").style.visibility = "hidden";
            }

            if ($('#child_rearing').val() == "") {
                document.getElementById("child_rearing_error").style.visibility = "visible";
            } else {
                document.getElementById("child_rearing_error").style.visibility = "hidden";
            }

            console.log('error occurred');
            return false;
        } else {
            document.getElementById("field_error").style.visibility = "hidden";
            // TODO:: ajax
            //
            var time_1 = [];
            var time_2 = [];
            var insurance = [];
            var url = "./back_end.php";
            $('input[name="time_1[]"]:checked').each(function() {
                time_1.push($(this).val());
            });
            $('input[name="time_2[]"]:checked').each(function() {
                time_2.push($(this).val());
            });
            $('input[name="insurance[]"]:checked').each(function() {
                insurance.push($(this).val());
            });
            $.ajax({
                url: url,
                type: "POST",
                data: {
                    time_1: time_1,
                    time_2: time_2,
                    insurance: insurance,
                    first_shoot: $('#first_shoot').val(),
                    second_shoot: $('#second_shoot').val(),
                    first_name: $('#first_name').val(),
                    last_name: $('#last_name').val(),
                    first_name2: $('#first_name2').val(),
                    last_name2: $('#last_name2').val(),
                    tel_number: $('#tel_number').val(),
                    email: $('#email').val(),
                    letter: $('#letter').val(),
                    prefecture: $('#prefecture').val(),
                    city: $('#city').val(),
                    address: $('#address').val(),
                    age: $('#age').val(),
                    child_rearing: $('#child_rearing').val(),
                    choose_company: $('#choose_company').val(),
                    choose_impression: $('#choose_impression').val(),
                    Individual_application: $('#Individual_application').val()
                },
                success: function(res) {
                    var data = JSON.stringify(res);
                    if (window.confirm(data)) {
                        window.open("https://internal-api.famm-app.com/ext/marketing_campaign/758", "Thanks for Visiting!");
                    } else {
                        window.alert("申し込みキャンセルされました。");
                    }
                },
                error: function(error) {
                    var error = JSON.parse(error);
                    console.log(error);
                }
            });
        }
    });
});