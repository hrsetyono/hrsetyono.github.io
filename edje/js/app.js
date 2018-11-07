$( document ).ready( function() {

  createSidebar();
  parseTable();

  //

  // create sidebar
  function createSidebar() {
    var nav = {
      'index': 'Home',
      'grid': 'Grid & Tile',
      'display': 'Display & Flexbox',
      'spacing': 'Spacing',
      'typography': 'Typography',
      'background': 'Background',
      'border-shadow': 'Border & Shadow',
      'position': 'Positioning'
    };

    var navHtml = '';
    for( var key in nav ) {
      navHtml += `<a class="d-iblock pv-05 ph-075" href="${ key }.html">${ nav[key] }</a>`;
    }

    $( '.sidebar' ).html( '<h-grid><div class="col-12">' + navHtml + '</div></h-grid>' );
  }

  // convert JSON data to table
  function parseTable() {
    
    $( 'table script' ).each( function() {
      var content = eval( $(this).html() );
      var $table = $(this).closest('table');

      var thead = "<thead> <tr> <th>Class</th> <th>Properties</th> <th></th> </tr> </thead>";
      
      // create tbody
      var tbody = "<tbody>";
      
      for( var i = 0, len = content.length; i < len; i++ ) {

        // if empty means separator
        if( content[i].length == 0 ) {
          tbody += '<tr> <td class="separator" colspan="3"></td> </tr>';
        } else {
          // check if there's declaration (3rd param)
          var declaration = content[i][2] ? content[i][2].join('<br>') : '';

          // format class name
          var className = content[i][0].replace( /\//g, '<br>' );

          tbody += `<tr> <td>${ className }</td> <td>${ declaration }</td> <td>${ content[i][1] }</td> </tr>`;
        }
      }
      tbody += "</tbody>";

      $table.append( thead );
      $table.append( tbody );
    } );
  }

});