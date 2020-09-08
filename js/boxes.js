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

function Boxes (boxCount,url,database) {

    this.url = url;
  
    //data
    this.title =  undefined;
    this.boxCount = boxCount;
    this.cards = {};
    this.box = [];
    this.boxIx = {};
   

    this.database = database;
    
    this.init = function(callback) {

        var that = this;


        for(var i = 0;i < that.boxCount;i++)
            that.box.push(new Box());


        var dbdata = that.database.findCards(url);
        if(dbdata != undefined)
        {
            console.log(dbdata);
            //load
            this.title = dbdata.title;
            this.cards = dbdata.cards;
            this.boxIx = dbdata.boxIx;
            
            for(var i = 0;i < that.boxCount;i++)
                this.box[i].cards = dbdata.box[i].cards;

            callback();
            return;
        }

        $.get( this.url, function( load ) {

            console.log(load);

           
            //map
            load.cards.forEach( function (card,ix) {

                var cardId = 'card'+ix;
                that.cards[cardId] = card;
                that.box[0].add(cardId);
                that.boxIx[cardId] = 0;

            });

            that.title = load.title;

            that._commit();
            callback();
        });
    };

    this._commit = function()
    {
        var data = {
            title : this.title,
            cards : this.cards,
            box : this.box,
            boxIx : this.boxIx
        };
        this.database.saveCards(this.url,data);

        var statistic = this.box[0].size();
        for(var i = 1;i < this.boxCount;i++)
            statistic+= '/'+this.box[i].size();

        this.database.setList({
            title: this.title,
            url: this.url,
            statistic: statistic
        });
    }

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

        this._commit();
    }

    this.moveBoxUp = function(cardId) {
        var f = this.boxIx[cardId];
        var t = f + 1;
        
        if(t >= this.boxCount) return;

        this.box[f].remove(cardId);
        this.box[t].add(cardId);
        this.boxIx[cardId] = t;
        this._commit();

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