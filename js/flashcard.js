
$(document).ready(function() {


  

  var url = $(location).attr('hash').substr(1);
  if(url == "") 
    url = "../datasets/basic1.json";

  console.log(url);

  var boxes = new Boxes(url);

  var cardSet = undefined;
  var ix = undefined;

  var setFront = function() {
    $('#front-counter').text(ix+"/"+cardSet.length);
    $('#front-vocabulary').text(cardSet[ix].question);
  }

  var setBack = function() {
    $('#back-vocabulary').text(cardSet[ix].answer);
  }

  var next = function() {
    var l = cardSet.length;
    if(ix >= l)
    {
      //fertisch
      return;
    }

    ix++;

    $('#front-header').text("movie");
    $('#back-header').text("movie");
   
    

  };

 

  boxes.init(function() {

    //loaded
    cardSet = boxes.getCardSet(20);
    ix = -1;
    next();
    setFront();
    setBack();
  });

  $("#card").flip({
    trigger: 'manual'
  });

  $("#show").click(function(ev) {
    ev.preventDefault();
    $("#card").flip(true);
  });


  $("#correct").click(function(ev) {
    ev.preventDefault();

    next();
    setFront();
    $("#card").flip(false);
    setTimeout(setBack,1000);
  

  });

  $("#wrong").click(function(ev) {
    ev.preventDefault();

    next();
    setFront();
    $("#card").flip(false);
    setTimeout(setBack,1000);
  });


});

