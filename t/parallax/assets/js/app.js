var app = {
  init: function() {
    $(".something").on("click", this.doSomething);
    $(".something-2").on("click", this.doSomething2);
  },
  doSomething: function(e) {},
  doSomething2: function(e) {},
};

function start() {
  app.init();
}

$(document).ready(start);
$(document).on("page:load", start);