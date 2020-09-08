function Database () {
   
    this.storage = window.localStorage;

    this.findCards = function(url) {

        var datastr = this.storage.getItem(url);
        
        console.log("find",url,datastr != null?"Found":"Not found");

        if(datastr != null)
            return JSON.parse(datastr);

        return undefined;
    }

    this.saveCards = function(url, data) {
        console.log("save",url,data);
        this.storage.setItem(url, JSON.stringify(data));
    }

    this.clear = function() {
        this.storage.clear();
        console.log("clear storage");
    }

    this.getPointsToday = function() {
        var today = new Date().toISOString().split('T')[0];
        return this.getPoints(today);
    }

    this.incrPointsToday = function() {
        var today = new Date().toISOString().split('T')[0];
        var p = this.getPoints(today);
        p++;
        this.storage.setItem(today, JSON.stringify(p));
    }

    this.getPoints = function(day) {
        var datastr = this.storage.getItem(day);
        if(datastr != null)
            return JSON.parse(datastr);
        return 0;
    }

    this.setList = function(list)
    {
        var lists = this.getLists();
        var newlists = [];

        newlists.push(list);
        
        $.each(lists, function( index, value ) {

            if(value.url == list.url) return;
            newlists.push(value);

        });

        this.storage.setItem("lists", JSON.stringify(newlists));

    }

    this.getLists = function()
    {
        var datastr = this.storage.getItem("lists");
        if(datastr != null)
            return JSON.parse(datastr);
        return [];
    }

}