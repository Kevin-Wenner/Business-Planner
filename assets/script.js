// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var saveBtnEl = $("saveBtn");
var today = dayjs();
var currentTime = dayjs().format('hh');
var cardClassPast = "row time-block past";
var cardClassPresent = "row time-block present";
var cardClassFuture = "row time-block future";
var divClass = "col-2 col-md-1 hour text-center py-3";
var textareaClass = "col-8 col-md-10 description";
var buttonClass = "btn saveBtn col-2 col-md-1";
var iClass = "fas fa-save";
var timeContainerEL = $("#timeContainer");


$(function () {
  saveBtnEl.on("click", function(event){
    console.log("button clicked");
  });

  // display current day on top of callendar
  var dayWeek = today.format('[Today is] dddd, MMMM D[th]');
  console.log(dayWeek);
  $('#currentDay').text(dayWeek);

  // display time blcoks of business hours
  for (let i = 0; i < 24; i++) {
    var time = i + 1;
    var timeID = "hour-" + (i + 1);//sets time id for each card

    // distinguish time blocks as past present future hours
    if (time < currentTime) {
      var newTimeCard = $('<div>', {'id': timeID, 'class': cardClassPast});
    }else if (time == currentTime) {
      var newTimeCard = $('<div>', {'id': timeID, 'class': cardClassPresent});
    }else if (time > currentTime) {
      var newTimeCard = $('<div>', {'id': timeID, 'class': cardClassFuture});
    }   
    timeOfDay = timeDisplay(i + 1);
    
    newTimeCard.append($('<div/>', {'class': divClass}).text(timeOfDay));
    newTimeCard.append($('<textarea/>',{'class': textareaClass, 'rows': 3}));
    newTimeCard.append($('<button/>', {'class': buttonClass, 'aria-label': 'save'}).append($('<i/>', {'class': iClass, 'aria-hidden': "true"})));
    timeContainerEL.append(newTimeCard);
    
  }
  // converts 24 hour to 12 w/ am/pm
  function timeDisplay(time){
    if (time > 12) {
      time -= 12;
      return time + "PM"
    }
    return time + "AM";
  }
  
  // enter an event

  // save input (localstorage)

  //this persist

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
});
