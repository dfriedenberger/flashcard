
function Card(question,answer) {
    this.question = question;
    this.answer = answer;
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
            that.cards = data.cards;
            that.title = data.title;

            callback();
        });
    };

    this.getCardSet = function(cnt) {
        var cardset = [];
        for(var i = 0;i < cnt && i < this.cards.length;i++)
        {
            cardset.push(new Card(this.cards[i].question,this.cards[i].answer));
        }
        return cardset;
    }
}