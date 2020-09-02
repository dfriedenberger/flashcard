function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function selectOneFrom(array)
{
    randomIndex = Math.floor(Math.random() * array.length);
    return array.splice(randomIndex,1);
}
  

function Card(id,question,answer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
}


function CardSet() {

    this.cards = [];
    this.ix = -1;

    this.add = function(card)
    {
        this.cards.push(card);
    }

    this.hasCards = function()
    {
        return this.cards.length > 0;
    }

    this.nextCard = function()
    {
        this.ix = (this.ix + 1) % this.cards.length;
        return this.cards[this.ix];
    }

    this.remove = function()
    {
        this.cards.splice(this.ix, 1);
        this.ix--;
    }

    this.size = function()
    {
        return this.cards.length;
    }
}

function Box() {
   this.cards = {};
   this.add = function(cardId) {
       this.cards[cardId] = true;
   }

   this.remove = function(cardId) {
        delete this.cards[cardId];
   }

   this.size = function() {
        return Object.keys(this.cards).length;
   }

   this.getCards = function()
   {
        return Object.keys(this.cards);
   }
}

function Boxes (boxCount,url) {
    this.boxCount = boxCount;
    this.box = [];
    this.boxIx = {};
    for(var i = 0;i < boxCount;i++)
        this.box.push(new Box());

    this.url = url;
    this.cards = {};
    this.title = undefined;

    this.init = function(callback) {
        var that = this;
        $.get( this.url, function( data ) {
            console.log(data);
            //map
            data.cards.forEach( function (card,ix) {
                var cardId = 'card'+ix;
                that.cards[cardId] = card;
                that.box[0].add(cardId);
                that.boxIx[cardId] = 0;
            });
            that.title = data.title;

            callback();
        });
    };

    this.getBoxCount = function() {
        return this.boxCount;
    }

    this.getBoxSize = function(boxIx) {
        return this.box[boxIx].size();
    }

    this.moveToBoxZero = function(cardId) {
        var f = this.boxIx[cardId];
        var t = 0;

        if(f == 0) return;

        this.box[f].remove(cardId);
        this.box[t].add(cardId);
        this.boxIx[cardId] = t;

    }

    this.moveBoxUp = function(cardId) {
        var f = this.boxIx[cardId];
        var t = f + 1;
        
        if(t >= this.boxCount) return;

        this.box[f].remove(cardId);
        this.box[t].add(cardId);
        this.boxIx[cardId] = t;

    }

    this.getTitle = function() {
        return this.title;
    }

    this.getCardSet = function(cnt) {

        var cardIds = [];
        for(var b = 0;b < this.boxCount;b++)
        {
            var cidList = [... this.box[b].getCards()];

            //select 1/2^i
            var sel = cidList.length / Math.pow(2,b);
            for(var r = 0;r < sel;r++)
            {
                var cid = selectOneFrom(cidList);
                cardIds.push(cid);
            }


        }

        //shuffle
        shuffle(cardIds);

        var cardset = new CardSet();
        for(var i = 0;i < cnt && i < cardIds.length;i++)
        {
            var id = cardIds[i];
            var card = this.cards[id]
            cardset.add(new Card(id,card.question,card.answer));
        }
        return cardset;
    }
}