"use strict";

$(document).ready(function() {
  console.log("jquery is ready");
  var contentEl = $("#all-my-songs"); // grabbing empty div from html
  var songs = [];
  function getSongs() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "../songs.json"
      }).done(function(data) {
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    });
  }
    function getSongs2(resultOfFirstAjax) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "../songs2.json"
      }).done(function(data2) {
        songs = resultOfFirstAjax.songs;
        resolve(data2);
      }).fail(function(xhr2, status2, error2) {
        reject(error2);
      });
    });
  }

  getSongs().then(function(dataPass) {
    console.log("dataPass", dataPass);
    console.log("songs 1st then", songs);
    return getSongs2(dataPass);
  }).then(function(dataPass2) {
    console.log("songs 2nd then", songs)
    console.log("dataPass2", dataPass2)

        var songData = "";
        var currentSong;
        dataPass2.songs.forEach(function(song){
          songs.push(song);
        });

        console.log("songs", songs);
        
        for (var i = 0; i < songs.length; i++) {
          currentSong = songs[i];

          songData += "<div class='song-block'>";
            songData += "<h1>" + currentSong.title + "</h1>";
            songData += "<div class='artist'>Performed by ";
              songData += currentSong.artist;
            songData += "</div>";
            songData += "<div class='album'>On the album ";
              songData += currentSong.album;
            songData += "</div>";
          songData += "</div>";
        }

        console.log("songData", songData);
        contentEl.html(songData);

  });
});

//*************** before promises // starts on line 7 *************//
  // $.ajax({
  //   url: "../songs.json"
  // }).done(function(data) {
  //   songs = data.songs;
  //   console.log("data", data);
  //   $.ajax({
  //     url: "../songs2.json"
  //     }).done(function(data2) {
  //       console.log("data2", data2);
  //       var songData = "";
  //       var currentSong;
        
  //       data2.songs.forEach(function(song){ //*** the argument "song" is named because of the forEach method**//
  //         songs.push(song);  // looping over the songs array that references both of the json files through the multiple ajax calls
  //       });

  //       console.log("songs", songs);
        
  //       for (var i = 0; i < songs.length; i++) {
  //         currentSong = songs[i];

  //         songData += "<div class='song-block'>";
  //           songData += "<h1>" + currentSong.title + "</h1>";
  //           songData += "<div class='artist'>Performed by ";
  //             songData += currentSong.artist;
  //           songData += "</div>";
  //           songData += "<div class='album'>On the album ";
  //             songData += currentSong.album;
  //           songData += "</div>";
  //         songData += "</div>";
  //       }

  //       console.log("songData", songData);
  //       contentEl.html(songData);
  //     }).fail(function(error) {
  //       console.log( "error" , error);
  //     });
  // }).fail(function(error) {
  //   console.log( "error" , error);
  // });
