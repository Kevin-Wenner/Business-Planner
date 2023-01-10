// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var saveBtnEl = $("saveBtn");
var today = dayjs();
var currentTime = dayjs().format('HH');
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
  for (let i = 0; i < 10; i++) {
    var time = i + 9;
    var timeID = "hour-" + (i + 1);//sets time id for each card

    // distinguish time blocks as past present future hours
    if (time < currentTime) {
      var newTimeCard = $('<div>', {'id': timeID, 'class': cardClassPast});
    }else if (time == currentTime) {
      var newTimeCard = $('<div>', {'id': timeID, 'class': cardClassPresent});
    }else if (time > currentTime) {
      var newTimeCard = $('<div>', {'id': timeID, 'class': cardClassFuture});
    }   
    timeOfDay = timeDisplay(time);
    
    newTimeCard.append($('<div/>', {'class': divClass}).text(timeOfDay));
    newTimeCard.append($('<textarea/>',{'class': textareaClass, 'rows': 3, 'name': 'textarea'}));
    newTimeCard.append($('<button/>', {'class': buttonClass, 'aria-label': 'save'}).append($('<i/>', {'class': iClass, 'aria-hidden': "true"})));
    timeContainerEL.append(newTimeCard);
    
    var temp = localStorage.getItem(timeOfDay);
    if(temp != null){
      newTimeCard.find('textarea').text(temp);
    }

  }
  // converts 24 hour to 12 w/ am/pm
  function timeDisplay(time){
    if (time > 12) {
      time -= 12;
      return time + "PM"
    }
    return time + "AM";
  }

    // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  

  
  // enter an event
  $('.saveBtn').click(function(event){
    
    // time block and text saved to local storage

    var timeCard = $(event.target).parent().text();
    var cardText = $(event.target).parent().find('textarea').val();

    // checks for null
    if (cardText != "") {
      // adds valid text and time to local storage
      localStorage.setItem(timeCard, cardText);
    }
    
  });

});
