(function($) {
  'use strict';

  /**
   * Ajax-based random post fetching & History API
   */

  //  Code provided in class threw slack:

  // Code adapted from slide 34: http://red-wdp.herokuapp.com/slides/ajax-in-wordpress-wp-rest-api-slides/#34

  // Ajax call changed from 'post' to 'get'

  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'get',
      url:
        api_vars.rest_url +
        // Fetches a random post, limits one post: https://css-tricks.com/using-the-wp-api-to-fetch-posts/

        'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      cache: false
    }).done(function(response) {
      var quote = response.shift();

      // Quote
      $('.entry-content').html(quote.content.rendered);

      // Person
      $('.entry-title').html(quote.title.rendered);

      // Website
      $('.source').html(quote.source.rendered);

      // Creat an "if" statement if there is no person or website. Can use quote.source.length: true or false.

      // To modify the history slug in the URL: https://developer.mozilla.org/en-US/docs/Web/API/History_API
      history.pushState(null, null, api_vars.home_url + '/' + quote.slug);

      // Popstate: when the active history changes.
      // This is so the client can go back to a previous state.
      window.addEventListener('popstate', function(e) {
        window.location.replace(url);
        url = home_url;
      });
    });
  });

  $.ajax({
    method: 'post',
    url: api_vars.rest_url + 'wp/v2/posts/',
    data: {
      status: 'pending',
      title: $('#quote-author').val(),
      content: $('#quote-content').val(),
      content: $('#quote-source').val(),
      content: $('#quote-source-url').val()
    },

    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
    }
  }).done(function(response) {
    alert('Success! Comments are closed for this post.');
  });

  /**
   * Ajax-based front-end post submissions.
   */

  //  The code bellow should be })(jQuery);
  //
})(jQuery);
