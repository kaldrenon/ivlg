$(function(){

  var img = new Image();
  img.src = "image/IV-logo-wide2.svg";

  var canvas = document.getElementById("drawingboard");
  var ctx = canvas.getContext("2d");

  var textoffset = 155;
  var textdrop = 120;
  var atoffset = 0;

  var text1 = document.getElementById("sourceText1");
  text1.onkeyup=function(e){ redrawTexts(); }

  $('#checkbox1').change(function(e){
    redrawTexts();
  });

  function redrawTexts(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 700, 120);
    ctx.fillStyle = '#939598';

    $('.btn').css("visibility", "visible");

    if( $("#checkbox1").is(':checked')){
      wrapText(ctx,'AT', textoffset, textdrop-5,1900,'15px',"Avenir");
      atoffset = 20;
    } else {
      atoffset = 0;
    }

    wrapText(ctx, text1.value, textoffset+atoffset, textdrop, 700, '27px', "Avenir"); // 700/27px for wide, 500/60px for square

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
