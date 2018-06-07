$(function(){

  var logoImage = new Image();
  logoImage.src = "assets/image/IV-logo-square.svg";

  var canvas = document.getElementById("drawingboard");
  var ctx = canvas.getContext("2d");

  var textDrop = 470;

  var text1 = document.getElementById("sourceText1");
  text1.onkeyup=function(e){ redrawTexts(); }

  $('#checkbox1').change(function(e){
    alert("Not Yet Implemented");
    throw new FatalError("Something went badly wrong!");
    redrawTexts(); 
  });

  function redrawTexts(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(logoImage, 50, 0, 400, 400);
    ctx.fillStyle = '#939598';
    ctx.textAlign="center"; //Square only

    $('.btn').css("visibility", "visible");

    if( $("#checkbox1").is(':checked')){
      textOffset = 40;
      wrapText(ctx,'AT', 250, textDrop-20,1900,'24px',"Avenir");
    } else{
      textOffset = 250;
    }

    wrapText(ctx, text1.value, textOffset, textDrop, 500, '60px', "Avenir");

  }

  function wrapText(context, text, x, y, maxWidth, fontSize, fontFace){
    var words = text.split(' ');
    var line = '';
    var lineHeight=fontSize;

    context.font=fontSize+" "+fontFace;

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if(testWidth > maxWidth) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
    return(y);
  }

  /**
  * This is the function that will take care of image extracting and
  * setting proper filename for the download.
  * IMPORTANT: Call it from within a onclick event.
  */
  function downloadCanvas(link, canvasId, filename) {

    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
  }

  /**
  * The event handler for the link's onclick event. We give THIS as a
  * parameter (=the link element), ID of the canvas and a filename.
  */
  document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'drawingboard', 'test.png');

  }, false);

  $('#reloadbtn').click(function() {
    location.reload();
  });

}); // end $(function(){});

