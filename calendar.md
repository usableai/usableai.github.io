---
layout: page
title:
subtitle:
---

<style>

body {
    font-family: Arial, sans-serif;
}

.calendar {
    width: 100%;
    margin: 0 auto;
}

a {
    color: #006600;
}

.aevent {
    color: #FFFFFF;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    font-size: 1.5em;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    height: 14%;
    padding: 0px;
    text-align: left;
    vertical-align: top;
    border: 1px solid #ddd;
}

td {
    width: 14.28%;
    height: 100px;
    position: relative;
    text-color: #4CAF50;
    font-size: 0.9em;
}

td.event {
    background-color: #4CAF50;
    color: white;
}

.event-container {
    position: absolute;
    top: 1em; /* Adjust the position below the date */
    left: 0;
    right: 0;
    bottom: 0;
    padding: 5px;
    overflow-y: scroll;
    overflow-x: scroll;
    white-space: nowrap;
}


.btn {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 15px;
    font-size: 1.5em;
    cursor: pointer;
}

.btn:hover {
    background-color: #45a049;
}

</style>

## [Subscribe to the AIXLab Calendar](/assets/misc/calendar.ics)

<body>
<div class="calendar">
    <div class="header">
        <button class="btn prev" onclick="changeMonth(-1)">&#8592;</button>
        <h2 id="monthYear"></h2>
        <button class="btn next" onclick="changeMonth(1)">&#8594;</button>
    </div>
    <table>
        <thead>
            <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>
        </thead>
        <tbody id="calendarBody"></tbody>
    </table>
</div>

<div class="event-list">
    <ul id="eventList"></ul>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/ical.js/1.5.0/ical.min.js" integrity="sha512-0izBc1upGYnrS1u1MX7QR+sjFIxZWxLVdNI7cUoHHCutDr5ENjuQRZuS+v+3NFNGfwHSrPoHzBzED0rV651tGw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
let currentDate = new Date();

async function renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarBody = document.getElementById("calendarBody");

    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();

    let firstDay = new Date(year, month, 1).getDay();

    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    monthYear.innerHTML = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

    calendarBody.innerHTML = "";

    let date = 1;

    // Load and parse the .ics file
    const events = await loadIcsEvents("/assets/misc/calendar.ics", month, year);

    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            if (i === 0 && j < firstDay || date > daysInMonth) {
                cell.innerHTML = "";
            } else {
                cell.innerHTML = date;

                // Add events from the .ics file

                    if (events[date]) {
                        cell.classList.add("event");
                        const eventContainer = document.createElement("div");
                        eventContainer.classList.add("event-container");
                        events[date].forEach(event => {
                        if (event.url) {
                            eventContainer.innerHTML += `<br><a class="aevent" href="${event.url}" target="_blank"> ${event.startTime}: ${event.summary}</a></br>`;} else {
                            eventContainer.innerHTML += `<br><a target="_blank">${event.startTime}: ${event.summary}</a></br>`;
                            }
    });
        cell.appendChild(eventContainer);
        }
        date++;
    }

    row.appendChild(cell);
    }

    calendarBody.appendChild(row);
}
}

async function loadIcsEvents(icsPath, month, year) {
    const response = await fetch(icsPath);
    const icsText = await response.text();
    const jcalData = ICAL.parse(icsText);
    const comp = new ICAL.Component(jcalData);
    const events = comp.getAllSubcomponents("vevent");

    let eventMap = {};

    events.forEach(event => {
        const summary = event.getFirstPropertyValue("summary");
        const dtstart = event.getFirstPropertyValue("dtstart").toJSDate();
        const startTime = `${dtstart.getHours()}${dtstart.getMinutes().toString().padStart(2, '0')}`;
        const url = event.getFirstPropertyValue("url");

        if (dtstart.getMonth() === month && dtstart.getFullYear() === year) {
            const day = dtstart.getDate();
            if (!eventMap[day]) {
                eventMap[day] = [];
            }
            eventMap[day].push({
                summary: summary,
                url: url,
                startTime: startTime
            });
        }
    });

    return eventMap;
}
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

renderCalendar();
    </script>
</body>
