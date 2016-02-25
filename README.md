Knockout-handsontable
=====================

*Knockout-handsontable* is a binding for [Knockout.js](http://knockoutjs.com/) designed  designed to connect observableArrays with [handsontable](https://github.com/warpech/jquery-handsontable).  This allows handsontable to bind to the knockout viewmodel to communicate with the handsontable and the handsontable to communicate with observables or variables.

Basic Usage


View Model
-----------
```js
$(document).ready(function (fname, lname, sex, phone) {
     function Person() {
         var self = this;
         self.fname = ko.observable(fname);
         self.lname = ko.observable(lname);
         self.info = {sex: sex, phone: phone}
     }

    function exampleVM() {
         self.listOfPersons = ko.observableArray([]);
         self.listOfPersons.push(new Person('Cave', 'Johnson', 'Male', '555-5555'));
         self.listOfPersons.push(new Person('Caroline', '', 'Female', '652-4556'));
         self.listOfPersons.push(new Person('Morality', 'Core', 'none', '555-5555'));
     }
     //window.AppVM = new AppViewModel();
     ko.applyBindings(new exampleVM());

 });

```

HTML Elements
-----------
```html
    <div class="handsontable" data-bind="handsontable: {
            data: listOfPersons(),
            colHeaders: ['First Name', 'Last Name', 'Sex', 'Phone'],
            columns: [
              {data: 'fname'},
              {data: 'lname'},
              {data: 'info.sex'},
              {data: 'info.phone'}
            ]
        }"></div>
```


Dependencies
------------
* Knockout 2.0+
* JSON2.js - (for IE < 8)
* Handsontable


Examples
--------

View the sample in jsFiddle here: <http://jsfiddle.net/calvinslusarski/x3ejL/153/>

License
-------
MIT [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
