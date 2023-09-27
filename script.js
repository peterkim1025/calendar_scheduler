var currentDayEL = $('#currentDay');
var timeBlocks = $('.time-block');

  function displayDate() {
    var currentDate = dayjs().format('MMMM D, YYYY');
    currentDayEL.text(currentDate);
  }

  function updateTimeBlockColors() {
    var currentHour = dayjs().hour();
    timeBlocks.each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);
      if (blockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (blockHour === currentHour) {
        $(this).addClass('present').removeClass('past future');
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }

  function loadEvents() {
    var savedEvents = JSON.parse(localStorage.getItem('events'));
    timeBlocks.each(function () {
      var blockID = $(this).attr('id');
      var eventText = savedEvents[blockID];
      $(this).find('textarea').val(eventText);
    });
  }

  function saveEvents() {
    var eventsToSave = {};
    timeBlocks.each(function () {
      var blockID = $(this).attr('id');
      var eventText = $(this).find('textarea').val();
      eventsToSave[blockID] = eventText;
    });
    localStorage.setItem('events', JSON.stringify(eventsToSave));
  }

  displayDate();
  updateTimeBlockColors();
  loadEvents();

  $('.saveBtn').on('click', function () {
    updateTimeBlockColors();
    saveEvents();
  });
