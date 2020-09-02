
function FlashCard(flipcard,boxes) {

  this.flipcard = flipcard;
  this.boxes = boxes;

  this.cardSet = undefined;
  this.length = 0;

  var that = this;
  this.flipcard.setCallback(function(correct) {
    console.log("correct = "+correct);

    if(correct)
    {
      that.cardSet.remove();
    }

    that.next();
  });

  this.next = function() {

    if(!this.cardSet.hasCards())
    {
      //fertisch
      return;
    }

    var card = this.cardSet.nextCard();

    this.flipcard.setFrontCounter(this.length - this.cardSet.size(),this.length);
    this.flipcard.setFrontVocabulary(card.question);
    
    this.flipcard.toFront();

    var fc = this.flipcard
    setTimeout(function() {
      fc.setBackVocabulary(card.answer);
    },500);

  }

  this.start = function()
  {
    this.cardSet = boxes.getCardSet(20);
    this.length = this.cardSet.size();

    this.flipcard.setFrontHeader(this.boxes.getTitle());
    this.flipcard.setBackHeader(this.boxes.getTitle());
    this.next();
  }



}


