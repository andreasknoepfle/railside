// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require codemirror
//= require codemirror/modes/ruby
//= require codemirror/modes/xml
//= require codemirror/modes/htmlmixed
//= require codemirror/modes/haml
//= require codemirror/modes/sass
//= require codemirror/modes/css
//= require codemirror/modes/javascript
//= require codemirror/modes/coffeescript
//= require codemirror/modes/yaml
//= require codemirror/modes/markdown

//= require codemirror/addons/edit/matchbrackets
//= require codemirror/addons/edit/closebrackets
//= require codemirror/addons/comment/comment
//= require codemirror/addons/edit/trailingspace
//= require codemirror/addons/search/searchcursor
//= require codemirror/addons/search/search
//= require codemirror/addons/dialog/dialog
//= require codemirror/addons/hint/show-hint
//= require codemirror/addons/hint/anyword-hint

//= require codemirror/keymaps/sublime.js

//= require bootstrap
//= require splitter
//= require projects


jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();