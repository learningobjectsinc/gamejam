$(function() {
    $('.run').click(function() {
        var source = $('.source').val().split('\n');
        $('.console').text(source);
    });
});
