
function FlashCard(flipcard,boxes,database,root) {

  this.setsize = 20;
  this.dailytarget = 20;
  this.flipcard = flipcard;
  this.boxes = boxes;
  this.database = database;
  this.root = root;

  this.cardSet = undefined;
  this.card = undefined;
  this.length = 0;
  this.repeat = undefined;
  var that = this;
  this.flipcard.setCallback(function(correct) {

    var cid = that.card.id;
    if(correct)
    {
      that.database.incrPointsToday();
      that.cardSet.remove();
    }
    

    if (!(cid in that.repeat))
    {
      if(correct)
      {
        that.boxes.moveBoxUp(cid);
      }
      else
      {
        that.boxes.moveToBoxZero(cid);
      }
    }
    that.repeat[cid] = true;

    that.next();
  });

  this.next = function() {

    //update boxes
    for(var b = 0; b < this.boxes.getBoxCount();b++)
    {
      var sz = this.boxes.getBoxSize(b);
      this.flipcard.setBoxSize(b,sz);
    }

    if(!this.cardSet.hasCards())
    {
      var target = this.dailytarget
      var points = this.database.getPointsToday();
      var value = points / target;
      if(value > 1.0) value = 1.0;

      //fertisch
      $('#ready').modal('show');

      if(points < target)
      {
        $('#state').text("Weiter so!");
      }
      else
      {
        $('#state').html("Du hast es f&uuml;r heute geschafft!");
      }

      $('#circle').circleProgress({
        value: value,
        size: 100,
        fill: {
          gradient: ["red", "orange"]
        }
      }).on('circle-animation-progress', function(event, progress) {
        var number = Math.round(progress * points);
        $(this).find('#points').text(number+'/' +target);
      });


      var vocabularyLists = this.database.getLists();
      var l = vocabularyLists.length;
      for(var i = 0;i < l;i++)
      {
        $('#vocabulary-lists').append($('<option>', {
          value: vocabularyLists[i].url,
          text: vocabularyLists[i].title +" "+vocabularyLists[i].statistic,
        }));
      }
      $('#vocabulary-lists').val(url);

      

      this.start();
      return;
    }

    this.card = this.cardSet.nextCard();

    this.flipcard.setFrontCounter(this.length - this.cardSet.size(),this.length);
    this.flipcard.setFrontVocabulary(this.card.question);
    
    this.flipcard.toFront();

    var fc = this.flipcard;
    var c = this.card;
    setTimeout(function() {
      fc.setBackVocabulary(c.answer);
    },500);

  }

  this.start = function()
  {
    this.card = undefined;
    this.repeat = {};
    this.cardSet = boxes.getCardSet(this.setsize);
    this.length = this.cardSet.size();

    this.flipcard.setFrontHeader(this.boxes.getTitle());
    this.flipcard.setBackHeader(this.boxes.getTitle());
    this.next();
  }

  $("#ok").click( function(){
    var url = $('#vocabulary-lists').val();
    window.location.replace(root + "#" + url);
    window.location.reload();
  });


}


