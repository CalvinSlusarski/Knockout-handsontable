Knockout-handsontable
=====================

*Knockout-handsontable* is a binding for [Knockout.js](http://knockoutjs.com/) designed  designed to connect observableArrays with [handsontable](https://github.com/warpech/jquery-handsontable).  This allows handsontable to bind to the knockout viewmodel to communicate with the handsontable and the handsontable to communicate with observables or variables.

Basic Usage

-----------
View Model
```js
$(document).ready(function () {
     function Person() {
         var self = this;
         self.fname = ko.observable('Bob');
         self.lname = ko.observable('Smith');

     }

    function exampleVM() {
         self.listOfPersons = ko.observableArray([]);
         self.listOfPersons.push(new Person());
         self.listOfPersons.push(new Person());
         self.listOfPersons.push(new Person());
     }
     //window.AppVM = new AppViewModel();
     ko.applyBindings(new exampleVM());

 });

```
HTML Elements
```html
    <div class="handsontable" data-bind="handsontable: {
            data: self.listOfPersons(),
            colHeaders: ['First Name', 'Last Name'],
            columns: [
              {data: 'fname'},
              {data: 'lname'}
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
The `examples` directory contains a sample that shows how three independent view models can exchange information without direct references to each other.

View the sample in jsFiddle here: <http://jsfiddle.net/rniemeyer/mg3hj/>

License
-------
MIT [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
