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
    };
    function setData(key, val, obj) {
        if (!obj) obj = data; //outside (non-recursive) call, use "data" as our base object
        var ka = key.split(/\./); //split the key by the dots
        if (ka.length < 2) {
            obj[ka[0]] = val; //only one part (no dots) in key, just set value
        } else {
            if (!obj[ka[0]]) obj[ka[0]] = {}; //create our "new" base obj if it doesn't exist
            obj = obj[ka.shift()]; //remove the new "base" obj from string array, and hold actual object for recursive call
            setData(ka.join("."), val, obj); //join the remaining parts back up with dots, and recursively set data on our new "base" obj
        }
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
                                    setData(propertyName.data, value, row);
                                    //prop = value;
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
