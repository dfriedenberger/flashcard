
function Card(question,answer) {
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

function Boxes (url) {
    this.url = url;
    this.cards = [];
    this.title = undefined;
    this.init = function(callback) {
        var that = this;
        $.get( this.url, function( data ) {
            console.log(data);
            //map
            that.cards = [];
            data.cards.forEach( function (card,ix) {
                that.cards.push({
                    id: 'card'+ix,
                    question: card.question,
                    answer: card.answer
                });
            });
            that.title = data.title;

            callback();
        });
    };
    this.getTitle = function() {
        return this.title;
    }

    this.getCardSet = function(cnt) {
        var cardset = new CardSet();
        for(var i = 0;i < cnt && i < this.cards.length;i++)
        {
            cardset.add(new Card(this.cards[i].question,this.cards[i].answer));
        }
        return cardset;
    }
}