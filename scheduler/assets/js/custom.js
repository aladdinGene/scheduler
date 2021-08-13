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


    // demo data
    var alert_opts = [
        { key: 1, label: 'None' },
        { key: 2, label: 'On start date' },
        { key: 3, label: '1 day before' }
    ];

    var users = [
        { key: 1, label: 'George' },
        { key: 2, label: 'Nataly' },
        { key: 3, label: 'Diana' }
    ];

    var meeting_type = [
        { key: 1, label: 'Meeting' },
        { key: 2, label: 'Teleconference' },
        { key: 3, label: 'Web Conference' },
        { key: 4, label: 'Video Conference' },
        { key: 5, label: 'Visit' },
        { key: 6, label: 'High Level' }
    ];

    scheduler.locale.labels.section_text = 'Title';
    scheduler.locale.labels.section_time = 'Time';
    scheduler.locale.labels.section_meeting_type = '*Meeting Type';
    scheduler.locale.labels.section_primary_client = '*Primary Client';
    scheduler.locale.labels.section_description = 'Description';
    scheduler.locale.labels.section_select = 'Alert';
    scheduler.locale.labels.section_template = 'Details';
    scheduler.locale.labels.section_userselect = "Participants";
    scheduler.locale.labels.section_fruitselect = "Fruits";
    scheduler.locale.labels.section_checkme = "Check me";
    scheduler.locale.labels.section_priority = 'Priority';

    scheduler.config.lightbox.sections=[
        { name:"text", height:35, map_to:"text", type:"textarea" , focus:true },
        { name:"userselect", height: 35, map_to:"user_id", type:"multiselect", options: users, vertical:false },
        { name:"primary_client", height:35, map_to:"primary_client", type:"textarea"  },
        { name:"meeting_type", height: "auto", map_to:"meeting_type", type:"multiselect", options: meeting_type, vertical:false },
        { name:"select", height:35, map_to:"type", type:"select", options:alert_opts},
        { name:"description", height:120, map_to:"description", type:"textarea" , focus:true },
        { name:"recurring", height:115, type:"recurring", map_to:"rec_type", button:"recurring"},
        { name:"time", height:40, type:"time", map_to:"auto" },
    ];

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

    scheduler.attachEvent("onClick", function (id, e){
       //any custom logic here
       console.log(id, e)
       return true;
    });

    scheduler.templates.quick_info_content = function(start, end, ev){
        console.log(start, end, ev)
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

    $('.dhx_save_btn_set').on('click', () => {
        save_form()
        // close_form()
    })

    $('.dhx_delete_btn_set').on('click', () => {
        close_form()
    })

    $('.dhx_cancel_btn_set').on('click', () => {
        close_form()
    })
})