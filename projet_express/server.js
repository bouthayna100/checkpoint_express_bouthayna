const express = require( "express" );
const date = require( 'date-and-time' );

const app = express();
app.set( 'view engine', 'ejs' );
app.use( express.static( 'public' ) );

const myLogger = function ( req, res, next ) {
    const now = new Date();
    const pattern = date.compile( 'dddd' );
    const today = date.format( now, pattern );
    const time = date.format( now, 'HH:mm:ss' );

    if ( ( today === 'Sunday' || today === 'Saturday' ) || ( time < '09:00:00' || time > '17:00:00' ) ) {
        res.setHeader( 'Content-Type', 'text/html' );
        res.end( ` 
        <html lang="en">
<head>
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
<link href="https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic" rel="stylesheet"
    type="text/css" />
<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" type="text/css" />
<link href="../../css/styles.css" rel="stylesheet" /></head>
<body id="page-top">
        <section class="page-section">
            <div class="container">
                <div class="text-center">

                    <h2 class="section-heading text-uppercase">Closed</h2>
                  <h4 class="section-subheading text-muted"> Today is ${today} at ${time} </h4>

                    <h3 class="section-subheading text-muted">Working hours of Training  center (Monday to Friday, from 9 to 17).</h3>
                </div>
            </div>
        </section>
</body>
</html>
      ` );
    }
    else next();
}

app.use( myLogger );

app.get( "/", function ( req, res ) {
    res.render( 'pages/home' );
} );

app.get( '/contact', ( req, res ) => {
    res.render( 'pages/contact' );

} );
app.get( '/ourServices', ( req, res ) => {
    res.render( 'pages/ourservices' );

} );
app.listen( 3000, function () {
    console.log( "server is running on port 3000" );
} )