$(function() {
    var processor = null;

    $('.compile').click(function() {
        var source = $('.source').val().split('\n');

        var statements = _.map(source, function(s, i) {
            return Basic.parseStatement(s, 1 + i);
        });

        console.log(statements);

        var io = new BasicIO();

        processor = new Processor(statements, io);

        $('.pc').val('>');
        $('.console').text('');
    });

    $('.step').click(function() {
        if (processor.halted) {
            return;
        }
        processor.step();
        $('.pc').val(_.times(processor.pc, function() { return ''; }).join('\n') + '\n>');
        $('.variables').html(_.reduce(processor.variables, function(str, value, variable) { 
            return str + '<div>' + variable + ' = ' + value + '</div>';
        }, ''));
    });
});
