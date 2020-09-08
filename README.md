# flashcard
Flashcard app using [Leitner System](https://en.wikipedia.org/wiki/Leitner_system) for external data sets

![Vocabulary Flash Card](https://github.com/dfriedenberger/flashcard/raw/master/flashcard.gif "Vocabulary Flash Card")

## Using
Only have to add URL to data set.
```
https://dfriedenberger.github.io/flashcard/#<url-to-json-data-set>
```

Test it with https://dfriedenberger.github.io/flashcard/#https://dfriedenberger.github.io/flashcard/datasets/basic0.json

## Use your own data set
Data set is struction with header and simple JSON array with question and answer field. (example https://dfriedenberger.github.io/flashcard/datasets/test.json)
```
{
    "title" : "Test",
    "cards" : [ 
      {"question":"Frage 1","answer":"Antwort 1"},
      {"question":"Frage 2","answer":"Antwort 2"},
      ... 
    ]
}
```

# Thanks to

* https://github.com/carlsednaoui/ouicards
* https://github.com/nnattawat/flip

