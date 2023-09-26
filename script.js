// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  var currentDayEL = $('#currentDay');
  var timeBlocks = $('.time-block');

  // Display current date in the header
  function displayDate() {
    var currentDate = dayjs().format('MMMM D, YYYY');
    currentDayEL.text(currentDate);
  }

  // Update time-block colors based on current time
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

  // Load saved events from localStorage
  function loadEvents() {
    var savedEvents = JSON.parse(localStorage.getItem('events')) || {};

    timeBlocks.each(function () {
      var blockID = $(this).attr('id');
      var eventText = savedEvents[blockID] || '';

      $(this).find('textarea').val(eventText);
    });
  }

  // Save events to localStorage
  function saveEvents() {
    var eventsToSave = {};

    timeBlocks.each(function () {
      var blockID = $(this).attr('id');
      var eventText = $(this).find('textarea').val();

      eventsToSave[blockID] = eventText;
    });

    localStorage.setItem('events', JSON.stringify(eventsToSave));
  }

  // Display current date on page load
  displayDate();

  // Update time-block colors on page load
  updateTimeBlockColors();

  // Load saved events on page load
  loadEvents();

  // Update time-block colors and save events when save button is clicked
  $('.saveBtn').on('click', function () {
    updateTimeBlockColors();
    saveEvents();
  });
});

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

