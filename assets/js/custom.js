$(document).ready(function() {
    var init = function() {
        $(window).scrollTop(0);
        $("input:text:visible:first").focus();

        var currentWidth = $("#nav-1")
            .find("li:nth-of-type(2) a")
            .parent("li")
            .width();
        var currentheight = $("#nav-1")
            .find("li:nth-of-type(2) a")
            .parent("li")
            .height();
        var current = $("li:nth-of-type(2) a").position();
        if (current['left'] == 10) {
            $('#prev').prop('disabled', true);
            $('#prev').addClass('btn-disable');
            $("#nav-1 .slide1").css({
                left: +current.left,
                width: currentWidth - 5,
                height: currentheight
            });
        } else {
            $("#nav-1 .slide1").css({
                left: +current.left,
                width: currentWidth,
                height: currentheight
            });
        }

        $('#nav-1 li').on('click', function(evt) {
            evt.preventDefault();
            return false;
        });

        $('#btn_prev').prop('disabled', true);
    };
    init();

    var g_stage = 0;

    $('#btn_next').on("click", function() {
        var form_data = new FormData($('#reservForm')[0]);
        var inputNameGanji = $('#first_name');
        var inputNameKana = $('#second_name');
        var inputPlace = $('#reserve_place');

        switch (g_stage) {
            case 0:
                if (inputNameGanji.val() && inputNameKana.val() && inputPlace.val() && form_data.has('time[]')) {
                    g_stage++;
                    // hide all err-msgs
                    $('#reservForm #field_error').css('display', 'none');
                    $('#first_name_error').css('display', 'none');
                    $('#second_name_error').css('display', 'none');
                    $('#time_error').css('display', 'none');
                    // make inputs disabled
                    inputNameGanji.prop('disabled', true);
                    inputNameKana.prop('disabled', true);
                    inputPlace.prop('disabled', true);
                    $('#time_field input[type=checkbox]').prop('disabled', true);
                    // hide `必須` labels
                    $('.inquiryForm-requiredLabel').css('display', 'none');
                    // change button caption
                    $('#btn_next').val('申し込み');
                    $('#btn_prev').prop('disabled', false);
                    // move bubble label
                    var _current = $("li:nth-of-type(3) a").position();
                    $("#nav-1 .slide1").css({
                        left: +_current.left
                    });
                } else {
                    jQuery("html,body").animate({ scrollTop: 0 }, 'slow');
                    $('#reservForm #field_error').css('display', 'block');
                    if (!inputNameGanji.val()) {
                        $('#first_name_error').css('display', 'block');
                    } else {
                        $('#first_name_error').css('display', 'none');
                    }
                    if (!inputNameKana.val()) {
                        $('#second_name_error').css('display', 'block');
                    } else {
                        $('#second_name_error').css('display', 'none');
                    }
                    if (!inputPlace.val()) {
                        // hardly possible
                        $('#reserve_place').val('TVCMなどの広告を見て');
                    }
                    if (!form_data.has('time[]')) {
                        $('#time_error').css('display', 'block');
                    } else {
                        $('#time_error').css('display', 'none');
                    }
                }
                break;
            case 1:
                //loading spinner when data sending
                $('#reservForm .loading').css('display', 'block');
                jQuery("html,body").animate({ scrollTop: $(document).height() }, 'slow');
                $('#btn_prev').prop('disabled', true);
                $('#btn_next').prop('disabled', true);
                // get all input values
                // ajax post for sending mail
                // console.log('ajax post...');
                var inputTime = [];
                var url = "./vendor/sendmail.php";
                $('input[name="time[]"]:checked').each(function() {
                    inputTime.push($(this).val());
                });
                $.ajax({
                    url: url,
                    type: "POST",
                    data: {
                        inputTime: inputTime,
                        inputNameGanji: inputNameGanji.val(),
                        inputNameKana: inputNameKana.val(),
                        inputPlace: inputPlace.val(),
                    },
                    success: function(res) {
                        $('#reservForm .loading').css('display', 'none');
                        $('#btn_prev').prop('disabled', false);
                        $('#btn_next').prop('disabled', false);
                        console.log(res);
                        var result = JSON.parse(res)
                        if (result == true) {
                            //// if sending mail is success
                            g_stage++;
                            var _current = $("li:nth-of-type(4) a").position();
                            $("#nav-1 .slide1").css({
                                left: +_current.left
                            });

                            $('#reservForm .field-list').css('display', 'none');
                            $('#reservForm .send-okay').css('display', 'block');
                            $('#btn_prev').css('display', 'none');
                            $('#btn_next').val('戻る');
                        } else {
                            $('#reservForm .loading').css('display', 'none');
                            $('#btn_prev').prop('disabled', false);
                            $('#btn_next').prop('disabled', false);
                            window.alert('Failed to mail send!');
                        }

                    },
                    //// else if failure
                    // alert('Failed to send!');
                    error: function(err) {
                        console.log(err);
                        $('#reservForm .loading').css('display', 'none');
                        $('#btn_prev').prop('disabled', false);
                        $('#btn_next').prop('disabled', false);
                        window.alert('Failed to mail send!');
                    }
                });

                break;
            case 2:
                window.location.reload();
                break;
            default:
                break;
        }

        return;
    });

    $("#btn_prev").on("click", function() {
        var inputNameGanji = $('#first_name');
        var inputNameKana = $('#second_name');
        var inputPlace = $('#reserve_place');

        switch (g_stage) {
            case 0:
                break;
            case 1:
                g_stage--;
                // make inputs re-enabled
                inputNameGanji.prop('disabled', false);
                inputNameKana.prop('disabled', false);
                inputPlace.prop('disabled', false);
                $('#time_field input[type=checkbox]').prop('disabled', false);
                // move bubble label
                var _current = $("li:nth-of-type(2) a").position();
                $("#nav-1 .slide1").css({
                    left: +_current.left
                });
                // change button caption
                $('#btn_next').val('次へ');
                $('#btn_prev').prop('disabled', true);
                break;
            case 2:
                break;
            default:
                break;
        }
        return;
    });
});