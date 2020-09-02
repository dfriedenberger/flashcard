function FlipCard (id) {
    this.id = id;

    $(id).flip({
        trigger: 'manual'
    });

    var cardId = this.id;
    $("#show").click(function(ev) {
        ev.preventDefault();
        $(cardId).flip(true);
    });

    this.setCallback = function(callback) {
        
        $("#correct").click(function(ev) {
            ev.preventDefault();
            callback(true);
        });
        
        $("#wrong").click(function(ev) {
            ev.preventDefault();
            callback(false);
        });
    }

    this.toFront = function() {
        $(this.id).flip(false);
    }

    this.setFrontCounter = function(ix,cnt) {
        $(this.id).find('.front').find('.counter').text(ix+"/"+cnt);
    }

    this.setFrontHeader = function(title) {
        $(this.id).find('.front').find('.header').text(title);
    }

    this.setFrontVocabulary = function(word) {
        $(this.id).find('.front').find('.vocabulary').text(word);
    }

    this.setBackHeader = function(title) {
        $(this.id).find('.back').find('.header').text(title);
    }

    this.setBackVocabulary = function(word) {
        $(this.id).find('.back').find('.vocabulary').text(word);
    }
}