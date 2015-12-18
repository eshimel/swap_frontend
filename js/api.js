'use strict';


var swap_api = {
  url: 'http://localhost:3000',


  ajax: function (config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/register',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },


  login: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },


  logout: function (token, id, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/logout/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json',
      dataType: 'json'
    }, callback);
  },

   new_profile: function (token, new_profile, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/profiles',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(new_profile),
      dataType: 'json'

    }, callback);
  },

   get_profile: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/profiles',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8'
    }, callback);
  },

  update_profile: function (token, profileid, update_profile, callback) {
    update_profile.profileid = profileid;
    console.log("Update profile: ", update_profile);
    this.ajax({
      method: 'PATCH',
      url: this.url + '/profiles/' + profileid,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(update_profile),
      dataType: 'json'

    }, callback);
  },

 destroy_profile: function (token, profileid, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/profiles/' + profileid,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json',
      dataType: 'json'
    }, callback);
    console.log("success");
  },


  get_resources: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/resources',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8'
    }, callback);
  },


 new_resource: function (token, new_resource, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/resources',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(new_resource),
      dataType: 'json'

    }, callback);
  }
};

