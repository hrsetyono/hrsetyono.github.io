$( document ).ready( function() {

  Route.init();
  
});

/*
  Handle Routing
*/
const ROUTER = new Navigo( null, true, '#' );
var Route = {
  init() {
    ROUTER.on( this.homeController.bind( this ) ).resolve();
    ROUTER.on( '/:slug', this.pageController.bind( this ) ).resolve();
  },

  homeController() {
    this._render( 'frontpage' );
  },

  pageController( params ) {
    this._render( params.slug );
  },

  _render( page ) {
    $.get( page + '.html', (data) => {
      console.log( data );
      $('#content').html( data );
      parseTable();
      parseArticle();
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