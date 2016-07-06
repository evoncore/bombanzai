/// <reference path="../../typings/jquery/jquery.d.ts"/>

$('#login').on('submit', function() {
  var form = $(this);

  $('.error', form).html('');
  $(':submit', form).button('loading');

  $.ajax({
    url: '/login',
    method: 'POST',
    data: form.serialize(),
    complete: function() {
      $(':submit', form).button('reset');
    },
    statusCode: {
      200: function() {
        form.html('Вы вошли на сайт').addClass('alert-success');
        window.location.href = '/';
      },
      403: function(jqXHR) {
        var error = JSON.parse(jqXHR.responseText);
        $('.error', form).html(error.message);
      }
    }
  });
  return false;
});