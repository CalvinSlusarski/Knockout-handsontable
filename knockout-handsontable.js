(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD anonymous module
        define(["knockout", "jquery", "handsontable"], factory);
    } else {
        // No module loader (plain <script> tag) - put directly in global namespace
        factory(window.ko, jQuery, window.handsontable);
    }
})(function (ko, $, undefined) {
    var unwrap = ko.utils.unwrapObservable;

    var peekByString = function (o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        while (a.length) {
            var n = a.shift();
            if (n in o) {
                o = o[n];
            } else {
                return;
            }
        }
        return o;
    }
    //connect items with observableArrays
    var prepareColumnOptions = function (columns) {
        var props = '',
            mappedColumns;
        if(columns){
            mappedColumns = $.map(columns, function (propertyName, index) {
                return {data: (function (attr) {
                    return function (row, value) {
                        prop = peekByString(row, propertyName.data);
                        if (prop) {
                            if (typeof value === 'undefined') {
                                // GET
                                return ko.utils.unwrapObservable(prop);
                            } else {
                                // SET
                                if (typeof prop === 'function') {
                                    prop(value);
                                } else {
                                    prop = value;
                                }
                            }
                        }
                    }
                })()
                }
            });
            return mappedColumns;
        }
    }
    ko.bindingHandlers.handsontable = {
        init: function (element, valueAccessor, allBindingsAccessor, data, context) {
            var $element = $(element),
                options = unwrap(valueAccessor()) || {},
                columns = unwrap(options.columns) || {};
            
            options.columns = prepareColumnOptions(columns);

            // return data in array format
            $element.handsontable(options);


        },
        update: function (element, valueAccessor, allBindingsAccessor, data, context) {
            $(element).handsontable('render');
        },
    };
});
