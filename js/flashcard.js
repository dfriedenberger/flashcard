
function FlashCard(flipcard,boxes) {

  this.flipcard = flipcard;
  this.boxes = boxes;

  this.cardSet = undefined;
  this.card = undefined;
  this.length = 0;
  this.repeat = undefined;
  var that = this;
  this.flipcard.setCallback(function(correct) {

    var cid = that.card.id;
    if(correct)
    {
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
      //fertisch
      $('#ready').modal('show')
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
    this.cardSet = boxes.getCardSet(20);
    this.length = this.cardSet.size();

    this.flipcard.setFrontHeader(this.boxes.getTitle());
    this.flipcard.setBackHeader(this.boxes.getTitle());
    this.next();
  }



}


