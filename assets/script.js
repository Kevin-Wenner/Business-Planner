
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

// main function for populating schedule with time blocks
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
    
    // sets class for uniform style display
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
  
  // click event for saving text input
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
