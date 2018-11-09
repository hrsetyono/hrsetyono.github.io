( function($) { 'use strict';

const ROUTER = new Navigo( null, true, '#' );

$( document ).ready( function() {
  Route.init();
  
  console.log('router');
});

/*
  Handle Routing
*/
var Route = {
  init() {
    ROUTER.on( this.homeController.bind( this ) ).resolve();
    ROUTER.on( '/:slug', this.pageController.bind( this ) ).resolve();
    ROUTER.on( '/:parent/:slug', this.childPageController.bind( this ) ).resolve();
  },

  homeController() {
    this._render( 'frontpage' );
  },

  pageController( params ) {
    this._render( params.slug );
  },

  childPageController( params ) {
    this._render( params.slug, params.parent );
  },

  _render( page, parent ) {
    var filePath = parent ? `${ parent }/${ page }.html` : `${ page }.html`;
    console.log(filePath);

    $.get( filePath, (data) => {
      $('#content').html( data );
      parseTable();
      parseArticle();

      // scroll to top
      window.scrollTo(0, 0);
    } );
  },
};

/*
  Convert JSON data to table
*/
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

function parseArticle() {
  $('article').each( function() {
    var result = markdown.toHTML( $(this).html() );
    $(this).html( result );
  });
}

})( jQuery );