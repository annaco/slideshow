$(document).ready(function(){
 // var images =[[],[]];
  var images =[];
  var i = 0;
  var j = 0;

  var picture =[
    ["carllinne", "Carl von Linné"], 
    ["doftschersmin1", "DoftSchersmin"],
    ["firstside","Narciss"],
    ["kastanj", "Kastanj"], 
    ["perenner","Lila Aster"]
  ]

   showPictureAndText(i);
  
  
    $('.next').click(function() {
     
      if(i<picture.length) {
        i = i + 1;
        showPictureAndText(i);
      }
      else{
        i=0;
        showPictureAndText(i);
      }
    });

    $('.previous').click(function() {
     
      if(i<0) {
        i=picture.length;
        showPictureAndText(i);
      }
      else {
        i = i-1;
        showPictureAndText(i);
      }
    });

    function showPictureAndText(i) {
    
      console.log(i);
      images = ("<img src=image/" + picture[i][0] + ".jpg>"+ "<br>"); 
      pictureText = (picture[i][1] + "<br>");
     
      document.getElementById('slideshowImages').innerHTML = images;
      document.getElementById('slideshow').innerHTML = pictureText;
    }
 });