var Builder = require( 'node-spritesheet' ).Builder;

var builder = new Builder({
    outputDirectory: '../sprites',
    outputImage: 'sprite.png',
    outputCss: 'sprite.css',
    selector: '.sprite',
    images: [ 'Runner0001.png', 'Runner0002.png', 'Runner0003.png' ]
});

builder.build( function() {
    console.log( "Built from " + builder.files.length + " images" );
});
