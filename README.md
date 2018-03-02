Attempt at a bracket Web App

Lots of things to do...

currently this is just a tutorial to help understand how node and react work together

to run on c9.io : enter the following into terminal:

    NODE_ENV=production node_modules/.bin/babel-node --presets react,es2015 src/server.js
    
to rebuild the bundle:

    NODE_ENV=production node_modules/.bin/webpack -p

bootstrap at end of index.html <head>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">