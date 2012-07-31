/// <reference path="~/scripts/jquery/jquery-1.7.2-vsdoc.js" />
/*
* jQuery Plugin: Toggle Checkbox
* Version 1.0
*
* Copyright (c) 2012 Marcos Almeida Jr. (http://about.me/junalmeida)
* Licensed jointly under the GPL and MIT licenses,
* choose which one suits your project best!
*
*/
(function ($) {
    var DEFAULT_SETTINGS = {
        effectDuration: 300,
        effectEase: "easeInOutQuint",
        classes: {
            checkbox: "ui-widget ui-widget-content ui-toggleCheckbox",
            checkboxChecked: "checked",
            radio: "ui-widget ui-widget-content ui-toggleRadio",
            radioChecked: "checked",
            focus: "ui-state-focus"
        }
    };

    var init = function (options) {
        var settings = $.extend({}, DEFAULT_SETTINGS, options || {});

        return this.each(function () {
            if ($(this).data("togglecheckboxObject") == null)
                $(this).data("togglecheckboxObject", new $.ToggleCheckbox(this, settings));
        });
    };

    var public_methods =
    {
    };

    // Expose the .tokenInput function to jQuery as a plugin
    $.fn.toggleCheckbox = function (method) {
        // Method calling and initialization logic
        if (public_methods[method]) {
            return public_methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return init.apply(this, arguments);
        }
    };


    var runOnce = true;

    $.ToggleCheckbox = function (obj, settings) {

        var input = $(obj);
        var isCheckbox = input.is(":checkbox");
        var isRadio = input.is(":radio");

        if (!isCheckbox && !isRadio)
            throw "This plugin only accepts checkboxes and radio buttons";

        var div = $("<div></div>");
        div.addClass(isCheckbox ? settings.classes.checkbox : settings.classes.radio);

        input.wrap(div); div = input.parent("div");

        var lnk = $("<a href=\"#\"></a>");
        input.before(lnk);


        var checkedClass = isCheckbox ? settings.classes.checkboxChecked : settings.classes.radioChecked;
        input.change(function () {

            if (input.is(":checked")) {
                div.addClass(checkedClass, settings.effectDuration, settings.effectEase);
                lnk.addClass(checkedClass, settings.effectDuration, settings.effectEase);
            }
            else {
                div.removeClass(checkedClass, settings.effectDuration, settings.effectEase);
                lnk.removeClass(checkedClass, settings.effectDuration, settings.effectEase);
            }
            if (runOnce && isRadio && input.attr("name") && input.attr("name") != "") {
                runOnce = false;
                $("input[name='" + input.attr("name") + "']").each(function () {
                    if (this != input.get(0))
                        $(this).trigger("change");
                });
                runOnce = true;
            }
        }).trigger("change");

        lnk.click(function (event) {
            if (input.is(":checkbox") && input.is(":checked"))
                input.removeAttr("checked");
            else
                input.attr("checked", "checked");
            input.trigger("change");

            event.preventDefault();
        }).focusin(function () {
            div.addClass(settings.classes.focus);
        }).focusout(function () {
            div.removeClass(settings.classes.focus);
        });
    };

} (jQuery));

