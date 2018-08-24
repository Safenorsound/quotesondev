(function($) {
  'use strict';

  /**
   * Ajax-based random post fetching & History API
   */

  //  Code adapted from the following repo: https://github.com/aroerick/quotes-on-dev-project/blob/master/js/api.js Adam Roerick

  var lastPage = '';

  $('#new-quote-button').on('click', function() {
    event.preventDefault();
    lastPage = document.URL;

    $ajax({
      method: 'get',
      url:
        qod_vars.rest_url +
        'wp/v2/posts' +
        '?filter[orderby]=rand&filter[posts_per_page]=1',
      cache: false
    })
      .done(function(data) {
        //append to html (template-parts/content.php)

        var value = data.shift();

        $('.entry-content').html(value.content.rendered);
        $('.entry-title').html('&mdash;' + value.title.rendered);
        if (value._qod_quote_source && value._qod_quote_source_url) {
          $('.source').html(
            ', <a href="' +
              value._qod_quote_source_url +
              '" >' +
              value._qod_quote_source +
              '</a>'
          );
        } else if (value._qod_quote_source && !value._qod_quote_source_url) {
          $('.source').html(', ' + value._qod_quote_source);
        } else {
          $('.source').html('');
        }
        history.pushState(null, null, api_vars.root_url + '/' + value.slug);
      })
      .fail(function() {
        $('.entry-header').append('<p>Uh oh. Something went wrong!</p>');
      });
  });

  /**
   * Ajax-based front-end post submissions.
   */

  $('#quote-submission-form').on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: api_vars.root_url + 'wp/v2/posts',
      data: {
        status: 'pending',
        title: $('#quote-author').val(),
        content: $('#quote-content').val(),
        _qod_quote_source: $('#quote-source').val(),
        _qod_quote_source_url: $('#quote-source-url').val()
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce);
      }
    })
      .done(function() {
        $('#quote-submission-form').slideUp('slow');
        $('.quote-submission-wrapper').append(
          '<p>' + api_vars.success + '</p>'
        );
      })
      .fail(function() {
        $('#quote-submission-form').append('<p>' + api_vars.failure + '</p>');
      });
  });
  // js slide for post request (also red sprout)

  $(window).on('popstate', function() {
    window.location.replace(lastPage);
  });
})(jQuery);

//       $('article').html(
// value.content.rendered +
// '<h2 class="entery-title"> - ' +
// value.title.rendered +
// ' ' +
// '<a href="' +
// value._qod_quote_source_url +

// '">' +

// value._qod_quote_source +
// '</a>' +
// '</h2>'
//       );

// });
//   });

// (jQuery);
