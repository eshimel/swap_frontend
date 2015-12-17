
var swap_api = swap_api || {};
var token;
var id;

$(document).ready(function() {

  var myProfileTemplate = Handlebars.compile($('#myProfile').html());

      var form2object = function(form) {
        var data = {};
        $(form).find('input').each(function(index, element) {
          var type = $(this).attr('type');
          if ($(this).attr('name') && type !== 'submit' && type !=='hidden') {
            data[$(this).attr('name')] = $(this).val();
          }
        });
        return data;
      };
      var wrap = function wrap(root, formData) {
        var wrapper = {};
        wrapper[root] = formData;
        return wrapper;
      };

      var callback = function callback(error, data) {
        if (error) {
          console.error(error);
          $('#result').val('status: ' + error.status + ', error: ' + error.error);
          return;
        }
        $('#result').val(JSON.stringify(data, null, 4));
      };

      $.ajax

      $('#register').on('submit', function(e) {
        e.preventDefault();
        var credentials = wrap('credentials', form2object(this));
        swap_api.register(credentials, callback);
      });

      $('#login').on('submit', function(e) {
        var credentials = wrap('credentials', form2object(this));
        var cb = function cb(error, data) {
          if (error) {
            callback(error);
            return;
          }
          callback(null, data);
          $('.token').val(data.user.token);
          $('.id').val(data.user.id);
          console.log(data.user.token);
          $('#login').each(function(){
            this.reset();

          });

        };
        e.preventDefault();
        swap_api.login(credentials, cb);

      });

      $('#logout').on('click', function(e) {
        var token = $('.token').val();
        var id = $('.id').val();
        var cb = function cb(error, data) {
          console.log("success");
          if (error) {
            callback(error);
            return;
          }
        };
        swap_api.logout(token, id, cb
          );

    });

      // Submitting new entries function
      // $('#profile-form').on('submit', function(e) {
      //   e.preventDefault();
      //   var token = $('.token').val();
      //   var new_profile = wrap('profile', form2object(this));
      //   swap_api.new_profile(token, new_profile, function(err, profileData) {
      //     if (err) {
      //       console.error(err);
      //       // do something with the error
      //       return;
      //     } else {
      //       $('#profile-form').each(function(){
      //       this.reset();

      //     });
      //       console.log(profileData);
      //     }
      //   });
      // });
 //paperclip________________________________________________
 $('#profile-form').on('submit', function(e){
   e.preventDefault();
   var token = $('.token').val();
   var reader = new FileReader();
   var new_profile = form2object(this);

   reader.onload = function(event){

     $.ajax({
       url: 'http://localhost:3000/profiles',
       method: 'POST',
       data: { profile: {
         username: $('#username').val(),
         studio: $('#studio').val(),
         website: $('#website').val(),
         avatar: event.target.result

        }
       }, headers: {
         Authorization: 'Token token=' + token
       }

     }).done(function(response){

     }).fail(function(response){
       console.error('Whoops!');
     });
   };

   var $fileInput = $('#avatar');
   reader.readAsDataURL($fileInput[0].files[0]);
   // api.createItem(item, token, createItemCB);
 console.log("WHHOOOOOOOOOOOO");
 });


      //shows profile
       $("#jello").on('click', function(e) {
        e.preventDefault();
        var token = $('.token').val();
        swap_api.get_profile(token, function(err, data) {
          if (err) {
            console.log(err);
            return;
          } else {
              var templateTarget = $('#my-profile-template').html();
              var template = Handlebars.compile(templateTarget);
              var content = template(data.profile);
            $('#myProfile').html(content);
            /*$.each(data.profile, function(index, element) {
              $('.myProfile').append("<li> Profile: " + element.username + '   ' + "Profile: " + element.studio +  '         ' + "ID: " + element.id + "</li>");*/

        }
      });
    });

       //deleting with handlebars button
       $('#myProfile').on("click", "button[data-type=delete]", function(e) {
        e.preventDefault();
        var token = $('.token').val();
        var profileid = $(this).data("id");
        console.log(profileid);
        swap_api.destroy_profile(token, profileid, function(err, data) {
          if (err) {
            console.error(err);
            // do something with the error
            return;
          } else {
            $(e.target).parent().parent().children().children(".profName").hide();
            //$(e.target).parent().parent().children().children(".profInput").show();
            console.log (data);

          }
        });
      });

       $('#myProfile').on("click", "button[data-type=edit]", function(e) {
        var token = $('.token').val();
        var profileid = $(this).data("id");
        console.log(profileid);
        $(e.target).parent().parent().children().children(".profName").hide();
        $(e.target).parent().parent().children().children(".profInput").show();

        // swap_api.update_profile(token, updateid,
        // update_profile, function(err, data) {
        //   if (err) {
        //     console.error(err);
        //     // do something with the error
        //     return;
        //   } else {

        //     console.log (data);

        //   }
        // });
      });
       $('#myProfile').on("click", "button[data-type=commit]", function(e) {
        e.preventDefault();
        var token = $('.token').val();
        var updateid = $(this).data("id");

        var update_profile = {
          profile : {
           username: $('[data-field=username][data-id=' + updateid + ']').val(),
           studio: $('[data-field=studio][data-id=' + updateid + ']').val(),
           website: $('[data-field=website][data-id=' + updateid + ']').val(),

          }
        };

        swap_api.update_profile(token, updateid,
          update_profile, function(err, data) {
          if (err) {
            console.error(err);
            // do something with the error

          } else {
            console.log(data);
        }
        });
      });









      // Submitting new resource function
      $('#resource-form').on('click', function(e) {
        e.preventDefault();
        var token = $('.token').val();
        var new_resource = wrap('resource', form2object(this));
        swap_api.new_resource(token, new_resource, function(err, resourceData) {
          if (err) {
            console.error(err);
            // do something with the error
            return;
          } else {
            $('#resource-form').each(function(){
            this.reset();

          });
            console.log(resourceData);
          }
        });
      });
    //Listing my resources
       $("#myResources").on('click', function(e) {
        e.preventDefault();
        $('.myResources').html('');
        var token = $('.token').val();
        var data = [];
        swap_api.get_resources(token, function(err, data) {
          if (err) {
            console.log(err);
            return;
          } else {
            $.each(data.resources, function(index, element) {
              $('.myResources').append("<li> Resource: " + element.category + '   ' + "Resource: " + element.description +  '         ' + "ID: " + element.id + "</li>");
          });
        }
      });
    });
      //deleting one resource
    $('#delete-profile').on('submit', function(e) {
        e.preventDefault();

        var token = $('.token').val();
        var profileid = $('#delete-profile > input[name="profileid"]').val();
        console.log(profileid);
        swap_api.destroy_profile(token, profileid, function(err, data) {
          if (err) {
            console.error(err);
            // do something with the error
            return;
          } else {
            console.log (data);
            //$('#deleteone').each(function(){
            //this.reset();
          }
        });
      });

 $('#update').on('submit', function(e) {
        e.preventDefault();

        var token = $('.token').val();
        var updateid = e.target.profileid.value;
        var update_profile = wrap('profile', form2object(this));
        console.log(updateid);
        console.log(update_profile);
        swap_api.update_profile(token, updateid,
          update_profile, function(err, data) {
          if (err) {
            console.error(err);
            // do something with the error

          } else {
            console.log(data);
            //$('#deleteone').each(function(){
            //this.reset();
          }
        });
      });
});
