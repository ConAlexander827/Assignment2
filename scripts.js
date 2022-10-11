
$(function() {
   //Get user info
   $('#get-button').on('click', function() {

       $.ajax({
           url: '/tweetinfo',
           contentType: 'application/json',
           success: function(response){
               //On response update the get users table with new inputs
               var tbodyEl = $('#namebody');
               tbodyEl.html('');
               response.tweetinfo.forEach(function(tweetinfo){
                   tbodyEl.append('\
                    <tr>\
                        <td class="id">' + tweetinfo.user.id + '</td>\
                        <td><input type="text" class="name" value="' + tweetinfo.user.screen_name + '"></td>\
                        </td>\
                        <td><input type="text" class="name" value="' + tweetinfo.user.name + '"></td>\
                        </td>\
                    </tr>\
                    ');
               });
           }
       });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
	    $.ajax({
		    url: '/tweetinfo',
		    contentType: 'application/json',
		    success: function(response){
                //On response update the get tweets table with new inputs
                var tbodyEl = $('#tweetbody');
                tbodyEl.html('');
                response.tweetinfo.forEach(function(tweetinfo){
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">' + tweetinfo.id_str + '' +
                        '</td>\
                    <td><input type="text" class="text" value="' + tweetinfo.text + '"></td>\
                        </td>\
                        <td><input type="text" class="name" value="' + tweetinfo.created_at + '"></td>\
                        </td>\
                    </tr>\
                    ');
                });
		    }
	   });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
    });


  //CREATE
  $('#create-form').on('submit', function(event){
      event.preventDefault();
        //parse the string input into two
      var createInput = $('#create-input');
      var inputString = createInput.val();

      const parsedStrings = inputString.split(';');
      var id = parsedStrings[0];
      var name = parsedStrings[1];

      $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ text: name , id: id}),
          success: function(response) {
              console.log(response);
              //after backend completes task clear the input box and reset the tweets table.
              createInput.val('');
              $('#get-tweets-button').click();
          }
      });
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //TODO: search a tweet and display it.

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
      //read input into string array
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];


      $.ajax({
          url: '/tweets',
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({name: name, newName: newName }),
          success: function(response) {
              console.log(response);
              //restart users table for updated info
              $('#get-button').click();
          }
      });
  });


  //DELETE
  $("#delete-form").on('submit', function() {
      var id = $('#delete-input')
      console.log(id);
      event.preventDefault();

      $.ajax({
          url: '/tweetinfo/' + id,
          method: 'DELETE',
          contentType: 'application/json',
          data: JSON.stringify({ID: id }),
          success: function(response) {
              console.log(response);
              //restart tweets table for updated info
              $('#get-tweets-button').click();
          }
      });
  });


});


                    
   
