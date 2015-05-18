/*
  Edge Framework JS
  - temporary until organized better
*/

var edgeFramework = {
  init: function() {
    this.webComponent();
  },
  webComponent: function() {
    if("registerElement" in document) {
      document.createElement("h-row");
      document.createElement("h-column");
      document.createElement("h-tile");
      document.createElement("h-ti");
    }
  }
};

edgeFramework.init();