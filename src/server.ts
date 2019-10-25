import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();
  var glob = require("glob");
  var fs = require('fs');
  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  //app.get( "/", async ( req, res ) => {
   // res.send("try GET /filteredimage?image_url={{}}")
  //} );
  const isImageUrl = require('is-image-url');
  app.get( "/filteredimage", async ( req, res ) => {    
    if(isImageUrl(req.query.image_url)){
      filterImageFromURL(req.query.image_url).then(function(){    
        let filestmp='';
        var currentPath = process.cwd();        
        glob(currentPath+'\\src\\util\\tmp\\*.jpg', function (err: any, files: string[]) { 
          if (err) {   
              console.log(err);   
          } else {   
              // a list of paths to javaScript files in the current working directory          
              filestmp=files[0];
              res.sendFile(filestmp);
              res.on('finish', function() {                      
                deleteLocalFiles(files);
            });
          }   
        });  
      });
    }
    else{
      res.sendStatus(422);     
    }
  });  
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();