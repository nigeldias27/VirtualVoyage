(function ($) {
  "use strict";

  // Setup the calendar with the current date
  $(document).ready(function () {
    var date = new Date();
    var today = date.getDate();
    // Set click handlers for DOM elements
    $(".right-button").click({ date: date }, next_year);
    $(".left-button").click({ date: date }, prev_year);
    $(".month").click({ date: date }, month_click);
    $("#add-button").click({ date: date }, new_event);
    // Set current month as active
    $(".months-row").children().eq(date.getMonth()).addClass("active-month");
    init_calendar(date);
    var events = check_events(today, date.getMonth() + 1, date.getFullYear());
    show_events(events, months[date.getMonth()], today);
  });

  // Initialize the calendar by appending the HTML dates
  function init_calendar(date) {
    $(".tbody").empty();
    $(".events-container").empty();
    var calendar_days = $(".tbody");
    var month = date.getMonth();
    var year = date.getFullYear();
    var day_count = days_in_month(month, year);
    var row = $("<tr class='table-row'></tr>");
    var today = date.getDate();
    // Set date to 1 to find the first day of the month
    date.setDate(1);
    var first_day = date.getDay();
    // 35+firstDay is the number of date elements to be added to the dates table
    // 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
    for (var i = 0; i < 35 + first_day; i++) {
      // Since some of the elements will be blank,
      // need to calculate actual date from index
      var day = i - first_day + 1;
      // If it is a sunday, make a new row
      if (i % 7 === 0) {
        calendar_days.append(row);
        row = $("<tr class='table-row'></tr>");
      }
      // if current index isn't a day in this month, make it blank
      if (i < first_day || day > day_count) {
        var curr_date = $("<td class='table-date nil'>" + "</td>");
        row.append(curr_date);
      } else {
        var curr_date = $("<td class='table-date'>" + day + "</td>");
        var events = check_events(day, month + 1, year);
        if (today === day && $(".active-date").length === 0) {
          curr_date.addClass("active-date");
          show_events(events, months[month], day);
        }
        // If this date has any events, style it with .event-date
        if (events.length !== 0) {
          curr_date.addClass("event-date");
        }
        // Set onClick handler for clicking a date
        curr_date.click(
          { events: events, month: months[month], day: day },
          date_click
        );
        row.append(curr_date);
      }
    }
    // Append the last row and set the current year
    calendar_days.append(row);
    $(".year").text(year);
  }

  // Get the number of days in a given month/year
  function days_in_month(month, year) {
    var monthStart = new Date(year, month, 1);
    var monthEnd = new Date(year, month + 1, 1);
    return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
  }

  // Event handler for when a date is clicked
  async function date_click(event) {
    $(".events-container").show(250);
    $("#dialog").hide(250);
    $(".active-date").removeClass("active-date");
    $(this).addClass("active-date");
    console.log(event);
    show_events(await event.data.events, event.data.month, event.data.day);
  }

  // Event handler for when a month is clicked
  function month_click(event) {
    $(".events-container").show(250);
    $("#dialog").hide(250);
    var date = event.data.date;
    $(".active-month").removeClass("active-month");
    $(this).addClass("active-month");
    var new_month = $(".month").index(this);
    date.setMonth(new_month);
    init_calendar(date);
  }

  // Event handler for when the year right-button is clicked
  function next_year(event) {
    $("#dialog").hide(250);
    var date = event.data.date;
    var new_year = date.getFullYear() + 1;
    $("year").html(new_year);
    date.setFullYear(new_year);
    init_calendar(date);
  }

  // Event handler for when the year left-button is clicked
  function prev_year(event) {
    $("#dialog").hide(250);
    var date = event.data.date;
    var new_year = date.getFullYear() - 1;
    $("year").html(new_year);
    date.setFullYear(new_year);
    init_calendar(date);
  }
  // Event handler for clicking the new event button
  function new_event(event) {
    // if a date isn't selected then do nothing
    if ($(".active-date").length === 0) return;
    // remove red error input on click
    $("input").click(function () {
      $(this).removeClass("error-input");
    });
    // empty inputs and hide events
    $("#dialog input[type=text]").val("");
    $("#dialog input[type=number]").val("");
    $(".events-container").hide(250);
    $("#dialog").show(250);
    // Event handler for cancel button
    $("#cancel-button").click(function () {
      $("#name").removeClass("error-input");
      $("#count").removeClass("error-input");
      $("#dialog").hide(250);
      $(".events-container").show(250);
    });
    // Event handler for ok button
    $("#ok-button")
      .unbind()
      .click({ date: event.data.date }, async function () {
        var date = event.data.date;
        var name = $("#name").val().trim();
        var count = $("#count").val().trim();
        var day = parseInt($(".active-date").html());
        // Basic form validation
        if (name.length === 0) {
          $("#name").addClass("error-input");
        } else {
          $("#dialog").hide(250);
          console.log("new event");
          console.log(date, day);
          var month = date.getMonth();
          var year = date.getFullYear();

          const res = await fetch("/api/newEvent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventName: name,
              person: count,
              date:
                day.toString() +
                "/" +
                (month + 1).toString() +
                "/" +
                year.toString(),
            }),
          });
          const resp = await res;
          //new_event_json(name, count, date, day);
          //date.setDate(day);
          //init_calendar(date);
        }
      });
  }

  // Adds a json event to event_data

  // Display all events of the selected date in card views
  function show_events(events, month, day) {
    // Clear the dates container
    $(".events-container").empty();
    $(".events-container").show(250);
    // If there are no events for this date, notify the user
    if (events.length === 0) {
      var event_card = $("<div class='event-card'></div>");
      var event_name = $(
        "<div class='event-name'>There are no events planned for " +
          month +
          " " +
          day +
          ".</div>"
      );
      $(event_card).css({ "border-left": "10px solid #FF1744" });
      $(event_card).append(event_name);
      $(".events-container").append(event_card);
    } else {
      // Go through and add each event as a card to the events container
      for (var i = 0; i < events.length; i++) {
        var event_card = $(
          "<div onclick='eventclicked()' class='event-card'></div>"
        );
        var event_name = $(
          "<div class='event-name'>" +
            events[i]["eventID"] +
            " | " +
            events[i]["eventName"] +
            ":</div>"
        );
        var event_count = $(
          "<div class='event-count'>" + events[i]["person"] + " </div>"
        );
        $(event_card).append(event_name).append(event_count);
        $(".events-container").append(event_card);
      }
    }
  }

  // Checks if a specific date has any events
  async function check_events(day, month, year) {
    var events = [];
    const res = await fetch("/api/getEvent", {
      method: "POST",
      headers: { "Content-Type": "application/text" },
      body: localStorage.getItem("nameid"),
    });
    const data = await res.json();
    for (var i = 0; i < data.length; i++) {
      if (
        parseInt(data[i]["date"].split("/")[0]) == day &&
        parseInt(data[i]["date"].split("/")[1]) === month &&
        parseInt(data[i]["date"].split("/")[2]) === year
      ) {
        events.push(data[i]);
      }
    }
    console.log(events, localStorage.getItem("nameid"), day, month, year);
    return events;
  }

  // Given data for events in JSON format

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
})(jQuery);
