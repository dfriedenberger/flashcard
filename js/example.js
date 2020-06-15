
$(document).ready(function() {
  // Load default questions if no flashcards are found in localStorage
  

   var url = $(location).attr('hash').substr(1);
   console.log(url);

    $.get( url, function( data ) {
      console.log(data);
      if (!localStorage.flashcards || localStorage.flashcards === '[]');
        ouicards.loadFromArray(data);
      initializeHandlers();
    });

    


});

function initializeHandlers() {
  // Unbind all events, in case the user loads new flashcard questions
  $('.correct').unbind();
  $('.wrong').unbind();
  $('.question').unbind();
  $('.answer').unbind();

  $("#card").flip();

  ouicards.getFromLS();
  changeQuestion();

  updateFooter();
 

  // Correct and wrong answer functionality
  $('.correct').on('click', function() {
    ouicards.correct();
    changeQuestion();
    updateFooter();
  });

  $('.wrong').on('click', function() {
    ouicards.wrong();
    changeQuestion();
    updateFooter();
  });

  function changeQuestion() {
    var newQuestion = ouicards.next();

    if (newQuestion === undefined) {
      console.log('Trying to load an undefined question into the DOM.');
      return;
    }

    $('.question').html(newQuestion.question);
    $('.answer').html(newQuestion.answer);
  }


  // Update footer info
  function updateFooter() {
    $('.questions-count').html(ouicards.flashcards.length + ' questions');
    $('#stat-details').text(ouicards.bucketA.length + ' - ' +
                            ouicards.bucketB.length + ' - ' +
                            ouicards.bucketC.length);
  }
}
