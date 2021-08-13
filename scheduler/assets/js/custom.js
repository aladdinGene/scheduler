let save_form, close_form;
window.addEventListener("DOMContentLoaded", function(){

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
        var ev = scheduler.getEvent(id);
        scheduler.startLightbox(id, custom_form );
        // ...'here you need to set values in the form'...
        //document.getElementById("some_input").value = ev.text;
    }
    //needs to be attached to the 'save' button
    save_form = () => {
        var ev = scheduler.getEvent(scheduler.getState().lightbox_id);
        // ...'here you need to retrieve values from the form'...
        //ev.text = document.getElementById("some_input").value;
        scheduler.endLightbox(true, custom_form);
    }
    //needs to be attached to the 'cancel' button
    close_form = (argument) => {
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
    $("#event-start-time").append($(select_time_ele))
    $("#event-end-time").append($(select_time_ele))
    $("#venue-start-time").append($(select_time_ele))
    $("#venue-end-time").append($(select_time_ele))
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
        var start_time_ele = $("#event-start-time")
        var start_time_year = start_time_ele.find("select.dhx_lightbox_year_select").val()
        var start_time_month = start_time_ele.find("select.dhx_lightbox_month_select").val() + 1
        var start_time_day = start_time_ele.find("select.dhx_lightbox_day_select").val()
        var start_time_time = start_time_ele.find("select.dhx_lightbox_time_select").val()

        var end_time_ele = $("#event-end-time")
        var end_time_year = end_time_ele.find("select.dhx_lightbox_year_select").val()
        var end_time_month = end_time_ele.find("select.dhx_lightbox_month_select").val() + 1
        var end_time_day = end_time_ele.find("select.dhx_lightbox_day_select").val()
        var end_time_time = end_time_ele.find("select.dhx_lightbox_time_select").val()

        var start_time = `${start_time_day}-${start_time_month}-${start_time_year} ${start_time_time}`
        var end_time = `${end_time_day}-${end_time_month}-${end_time_year} ${end_time_time}`

        var text = $("#event-title").val()
        var details = $("#event-desc").val()

        var event = {
            start_date: start_time,
            end_date:   end_time,
            text,
            details
        }
        var eventId = scheduler.addEvent(event);
        save_form()
        // close_form()
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
})