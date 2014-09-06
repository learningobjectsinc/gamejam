$(function() {
    $('.run').click(function() {
        var source = $('.source').val().split('\n');

        var statements = _.map(source, function(s, i) {
            return Basic.parseStatement(s, 1 + i);
        });

        console.log(statements);

        var processor = new Processor(statements);

        while (!processor.halted()) {
            processor.step();
        }
    });
});
