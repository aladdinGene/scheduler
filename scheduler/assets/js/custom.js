let save_form, close_form;
window.addEventListener("DOMContentLoaded", function(){
    // =================================== Custom Calendar ==============================
// {
    const modal_calendar1 = new dhx.Calendar(null, {
        timePicker: true,
        value: new Date(),
        css: "dhx_widget--bordered"
    });
    modal_calendar1.events.on("change", function (date) {
        $("#modal-start-time-input").val(modal_calendar1.getValue())
    });

    const modal_popup1 = new dhx.Popup({
        css: "dhx_widget--border-shadow"
    });
    modal_popup1.attach(modal_calendar1);

    const modal_calendar2 = new dhx.Calendar(null, {
        timePicker: true,
        css: "dhx_widget--bordered"
    });
    modal_calendar2.events.on("change", function (date) {
        $("#modal-end-time-input").val(modal_calendar2.getValue())
    });

    const modal_popup2 = new dhx.Popup({
        css: "dhx_widget--border-shadow"
    });
    modal_popup2.attach(modal_calendar2);

    modal_calendar1.link(modal_calendar2);

    const modal_start_time_input = document.getElementById("modal-start-time-input");

    // on input click we show popup
    modal_start_time_input.addEventListener("click", function () {
        modal_popup1.show(modal_start_time_input);
    });

    const modal_end_time_input = document.getElementById("modal-end-time-input");

    // on input click we show popup
    modal_end_time_input.addEventListener("click", function () {
        modal_popup2.show(modal_end_time_input);
    });
// }

// {
    const lightbox_calendar1 = new dhx.Calendar(null, {
        timePicker: true,
        value: new Date(),
        css: "dhx_widget--bordered",
        dateFormat: "%d-%m-%Y %H:%i"
    });
    lightbox_calendar1.events.on("change", function (date) {
        $("#lightbox-start-time-input").val(lightbox_calendar1.getValue())
    });

    const lightbox_popup1 = new dhx.Popup({
        css: "dhx_widget--border-shadow"
    });
    lightbox_popup1.attach(lightbox_calendar1);

    const lightbox_calendar2 = new dhx.Calendar(null, {
        timePicker: true,
        css: "dhx_widget--bordered",
        dateFormat: "%d-%m-%Y %H:%i"
    });
    lightbox_calendar2.events.on("change", function (date) {
        $("#lightbox-end-time-input").val(lightbox_calendar2.getValue())
    });

    const lightbox_popup2 = new dhx.Popup({
        css: "dhx_widget--border-shadow"
    });
    lightbox_popup2.attach(lightbox_calendar2);

    lightbox_calendar1.link(lightbox_calendar2);

    const lightbox_start_time_input = document.getElementById("lightbox-start-time-input");

    // on input click we show popup
    lightbox_start_time_input.addEventListener("click", function () {
        lightbox_popup1.show(lightbox_start_time_input);
    });

    const lightbox_end_time_input = document.getElementById("lightbox-end-time-input");

    // on input click we show popup
    lightbox_end_time_input.addEventListener("click", function () {
        lightbox_popup2.show(lightbox_end_time_input);
    });
// }

// {
    const end_date_calendar = new dhx.Calendar(null, {
        value: new Date(),
        css: "dhx_widget--bordered",
        dateFormat: "%d-%m-%Y"
    });
    end_date_calendar.events.on("change", function (date) {
        $("#re_date_of_end").val(end_date_calendar.getValue())
    });

    const end_date_popup = new dhx.Popup({
        css: "dhx_widget--border-shadow"
    });
    end_date_popup.attach(end_date_calendar);

    const re_end_date_input = document.getElementById("re_date_of_end");

    // on input click we show popup
    re_end_date_input.addEventListener("click", function () {
        var checked = $('input.dhx_repeat_radio[name=end]').get(2).checked
        if(checked) end_date_popup.show(re_end_date_input);
    });
// }




    // different configs for different screen sizes
    var compactView = {
        xy: {
            nav_height: 80
        },
        config: {
            header: {
                rows: [
                    { 
                        cols: [
                            "prev",
                            "date",
                            "next",
                        ]
                    },
                    { 
                        cols: [
                            "day",
                            "week",
                            "month",
                            {view: "minicalendar", click: function () {
                                if (scheduler.isCalendarVisible()) {
                                    scheduler.destroyCalendar();
                                } else {
                                    scheduler.renderCalendar({
                                        position: this,
                                        date: scheduler.getState().date,
                                        navigation: true,
                                        handler: function (date, calendar) {
                                            scheduler.setCurrentView(date);
                                            scheduler.destroyCalendar();
                                        }
                                    });
                                }
                            }},
                            "spacer",
                            "today"
                        ]
                    }
                ]
            }
        },
        templates: {
            month_scale_date: scheduler.date.date_to_str("%D"),
            week_scale_date: scheduler.date.date_to_str("%D, %j"),
            event_bar_date: function(start,end,ev) {
                return "";
            }
            
        }
    };
    var fullView = {
        xy: {
            nav_height: 80
        },
        config: {
            header: [
                "day",
                "week",
                "month",
                {view: "minicalendar", click: function () {
                    if (scheduler.isCalendarVisible()) {
                        scheduler.destroyCalendar();
                    } else {
                        scheduler.renderCalendar({
                            position: this,
                            date: scheduler.getState().date,
                            navigation: true,
                            handler: function (date, calendar) {
                                scheduler.setCurrentView(date);
                                scheduler.destroyCalendar();
                            }
                        });
                    }
                }},
                "date",
                "prev",
                "today",
                "next"
            ]
        },
        templates: {
            month_scale_date: scheduler.date.date_to_str("%l"),
            week_scale_date: scheduler.date.date_to_str("%l, %F %j"),
            event_bar_date: function(start,end,ev) {
                return "• <b>"+scheduler.templates.event_date(start)+"</b> ";
            }
        }
    };

    function resetConfig(){
        var settings;
        if(window.innerWidth < 1000){
            settings = compactView;
        }else{
            settings = fullView;
        
        }
        scheduler.utils.mixin(scheduler.config, settings.config, true);
        scheduler.utils.mixin(scheduler.templates, settings.templates, true);
        scheduler.utils.mixin(scheduler.xy, settings.xy, true);
        return true;
    }
    scheduler.config.multi_day = true;
    scheduler.config.responsive_lightbox = true;
    resetConfig();
    scheduler.attachEvent("onBeforeViewChange", resetConfig);
    scheduler.attachEvent("onSchedulerResize", resetConfig);

    var custom_form = document.getElementById("custom_form");

    scheduler.showLightbox = function(id){
        var event_id = id.toString();
        if(event_id.includes("#")) event_id = id.split('#')[0]
        var ev = scheduler.getEvent(event_id);
        scheduler.startLightbox(id, custom_form );
        console.log(ev, event_id)
        // ...'here you need to set values in the form'...
        //document.getElementById("some_input").value = ev.text;
        if(ev.event_length || ev.text != 'New event'){
            $('#event-title').val(ev.text)
            $('#event-desc').val(ev.details)
            lightbox_calendar1.setValue(ev.start_date)
            lightbox_calendar2.setValue(ev.end_date)
            if(ev.rec_type){
                $("#recurrence-wrap").show()
                $("#recurrence-btn").text("Enabled")
                $("#recurrence-btn").attr("data-disabled", "false")

                var rec_parsed = ev.rec_pattern.split("_")
                $(`input[name=repeat][value=${rec_parsed[0]}]`).get(0).checked = true
                $('.dhx_repeat_center>div').css('display', 'none')
                if(rec_parsed[0] == 'day'){
                    $("#dhx_repeat_day").css('display', 'block')
                    $('input[name=day_count]').val(rec_parsed[1])
                } else if(rec_parsed[0] == 'week'){
                    $("#dhx_repeat_week").css('display', 'block')
                    $('input[name=week_count]').val(rec_parsed[1])
                    var week_days = rec_parsed[4].split(',')
                    $(`input[name=week_day][value=1]`).get(0).checked = false
                    week_days.map((week_day) => {
                        $(`input[name=week_day][value=${week_day}]`).get(0).checked = true
                    })
                } else {
                    $("#dhx_repeat_month").css('display', 'block')
                    if(rec_parsed[4]){
                        $(`input[name=month_type][value=d]`).get(0).checked = true
                        $(`input[name=month_day]`).val(rec_parsed[4])
                        $(`input[name=month_count]`).val(rec_parsed[1])
                    } else {
                        $(`input[name=month_type][value=w]`).get(0).checked = true
                        $(`input[name=month_week2]`).val(rec_parsed[3])
                        $(`select[name=month_day2]`).val(rec_parsed[2])
                        $(`input[name=month_count2]`).val(rec_parsed[1])
                    }
                }

                var rec_end_string = ev.rec_type.split('#')[1]
                if(rec_end_string == 'no'){
                    $(`input[name=end]`).get(0).checked = true
                } else if(rec_end_string = "") {
                    $(`input[name=end]`).get(2).checked = true
                    end_date_calendar.setValue(new Date(rec_end_string))
                    $(`input[name=occurences_count]`).val(rec_end_string)
                } else {
                    $(`input[name=end]`).get(1).checked = true
                }
            }
        }
    }
    //needs to be attached to the 'save' button
    // save_form = (argument) => {
    //     // var ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    //     // ...'here you need to retrieve values from the form'...
    //     //ev.text = document.getElementById("some_input").value;
    //     scheduler.endLightbox(false, custom_form);
    // }
    //needs to be attached to the 'cancel' button
    close_form = (argument) => {
        $("#lightbox-form").get(0).reset();

        $("#recurrence-wrap").hide()
        $("#recurrence-btn").text("Disabled")
        $("#recurrence-btn").attr("data-disabled", "true")

        $("#zoom-wrap").hide()
        $("#zoom-btn").text("Disabled")
        $("#zoom-btn").attr("data-disabled", "true")

        scheduler.endLightbox(false, custom_form);
    }

    // When click event
    scheduler.attachEvent("onClick", function (id, e){
       //any custom logic here
       return true;
    });

    // When Quick info dialogue is opened.
    scheduler.templates.quick_info_content = function(start, end, ev){
        // console.log(start, end, ev)
        return ev.details || ev.text;
    };

    scheduler.init('scheduler_here',new Date(2018,0,1),"week");
    scheduler.load("./events.json");

    document.querySelector(".add_event_button").addEventListener("click", function(){
        scheduler.addEventNow();
    });
});





$(document).ready(function(){

    $("#recurrence-btn").on('click', function(){
        var disabled = $(this).attr("data-disabled")
        if(disabled == "true") {
            $("#recurrence-wrap").slideDown()
            $(this).text("Enabled")
            $(this).attr("data-disabled", "false")
            var d = new Date()
            d.setMonth(d.getMonth() + 1);
            $("input[name=date_of_end]").val(d.toDateString())
        } else {
            $("#recurrence-wrap").slideUp()
            $(this).text("Disabled")
            $(this).attr("data-disabled", "true")
        }
    })

    $("#zoom-btn").on('click', function(){
        var disabled = $(this).attr("data-disabled")
        if(disabled == "true") {
            $("#zoom-wrap").slideDown()
            $(this).text("Enabled")
            $(this).attr("data-disabled", "false")
        } else {
            $("#zoom-wrap").slideUp()
            $(this).text("Disabled")
            $(this).attr("data-disabled", "true")
        }
    })

    $('.dhx_save_btn_set').on('click', () => {

        var start_time = $("#lightbox-start-time-input").val()
        var end_time = $("#lightbox-end-time-input").val()

        var text = $("#event-title").val()
        var details = $("#event-desc").val()

        // Rec Type start
        var data_rec_string = $('.dhx_repeat_left .dhx_repeat_radio:checked').data('target').split('dhx_repeat_')[1]

        var rec_type = '';

        switch(data_rec_string) {
            case 'day':
            {
                rec_type += 'day'
                var day_type = $('input[name=day_type]:checked').val()
                if(day_type == 'd') {
                    rec_type += `_${$('input[name=day_count]').val()}___`
                } else {
                    rec_type = `week_1___1,2,3,4,5`
                }
            }
            break;
            case 'week':
            {
                rec_type += 'week'
                var week_day_eles = $('input[name=week_day]:checked')
                console.log(week_day_eles.length)
                var week_day_values = []
                for(var i=0;i<week_day_eles.length;i++){
                    var week_day_ele = week_day_eles.get(i)
                    week_day_values.push($(week_day_ele).val())
                }
                rec_type += `_${$('input[name=week_count]').val()}___${week_day_values.join(',')}`
            }
            break;
            case 'month':
            {
                rec_type += 'month'
                if($('input[name=month_type]:checked').val() == 'd'){
                    rec_type += `_${$('input[name=month_count]').val()}___${$('input[name=month_day]').val()}`
                } else {
                    rec_type += `_${$('input[name=month_count2]').val()}_${$('select[name=month_day2]').val()}_${$('input[name=month_week2]').val()}_`
                }
            }
            break;
        }


        var extra_string = $('input[name=end]:checked').val()
        switch(extra_string){
            case 'no':
            {
                rec_type += '#no'
                end_time = "9999-01-01 00:00:00"
            }
            break;

            case 'num':
            {
                rec_type += `#${$('input[name=occurences_count]').val()}`
            }
            break;

            case 'date':
            {
                rec_type += `#`
                var rec_end_date = $('input[name=re_date_of_end]').val()
                end_time = rec_end_date
            }
            break;
        }
        console.log(rec_type, start_time, end_time)
        var event = {
            start_date: start_time,
            end_date: end_time,
            text,
            details,
            rec_type,
            event_pid: "0",
            event_length: 60*60*4
        }

        // var event = { "id": 19, 
        //     "text": "2nd monday", 
        //     "start_date": "2017-07-01 00:00:00", 
        //     "end_date": "9999-01-01 00:00:00", 
        //     "rec_type": "month_1_2_1_#no", 
        //     "event_pid": 0, 
        //     "event_length": 300 }
        console.log(event)

        var eventId = scheduler.addEvent(event)

        close_form()
    })

    $('.dhx_delete_btn_set').on('click', () => {
        close_form()
    })

    $('.dhx_cancel_btn_set').on('click', () => {
        close_form()
    })

    $('.close-venue-modal').on('click', () => {
        $('#venue-modal').fadeOut()
    })

    $('.dhx_repeat_left').on('click', '.dhx_repeat_radio', function(){
        var _this = $(this)
        $('.dhx_repeat_center>div').css('display', 'none')
        $(_this.data('target')).css('display', 'block')
    })
})