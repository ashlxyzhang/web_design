document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5001/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

function loadHTMLTable(data) {
    const table = document.querySelector('.inventory-results');

    if (data.length === 0) {
        table.innerHTML = "<span>No Data</span>";
        return;
    }

    let tableHtml = "";
    
    $i = 0;
    data.slice(0, 24).forEach(function ({ID, Make, Model, Type, Year, Price, City, Hwy, Engine, Drivetrain}) {

        const pr = formatter.format(Price);

        tableHtml += "<div class=\"inventory-entry\">";
            tableHtml += "<div class=\"inventory-main-heading\">";
                tableHtml += `<h5>${Year}</h5>`
                tableHtml += `<h3 class="car-title">${Make} ${Model}</h3>`;
                tableHtml += `<h3 class="car-price">${pr}</h3>`;
            tableHtml += "</div>";
            tableHtml += "<hr class=\"grey\">";
            tableHtml += "<div class=\"photo-carousel\">";
                tableHtml += `<img src=\"./resources/images/inventory-jaguar-fpace-svr-suv.jpeg\" alt=\"Jaguar F-Pace SVR SUV Image\">`;
            tableHtml += "</div>";
            tableHtml += "<div class=\"inventory-bottom-info\">";
                tableHtml += "<div class=\"inventory-side-info\">";
                    tableHtml += "<div class=\"inventory-colors\">";
                        tableHtml += "<span class=\"inline\">";
                            tableHtml += "<div class=\"color-sample blue\"></div>";
                            tableHtml += "<p class=\"paragraph color-sample-text\">Ocean Blue Exterior</p>";
                        tableHtml += "</span>";
                        tableHtml += "<span class=\"inline\">";
                            tableHtml += "<div class=\"color-sample black\"></div>";
                            tableHtml += "<p class=\"paragraph color-sample-text\">Ballistic Black Interior</p>";
                        tableHtml += "</span>";
                    tableHtml += "</div>";
                    tableHtml += "<hr class=\"grey\">";
                    tableHtml += "<div class=\"inventory-small-details\">";
                        tableHtml += "<p class=\"paragraph\">";
                            tableHtml += `${Type}<br>`;
                            tableHtml += `${City}/${Hwy} · City/Hwy<br>`;
                            //tableHtml += `${Est. Miles/Year} Miles<br>`;
                            tableHtml += `${Engine} Engine<br>`;
                            tableHtml += `${Drivetrain}WD<br>`;
                        tableHtml += "</p>";
                    tableHtml += "</div>";
                tableHtml += "</div>";
                tableHtml += "<div class=\"inventory-buttons\">";
                    tableHtml += "<button class=\"button-one\">View Details</button>";
                    tableHtml += "<button class=\"button-one\">Ask a Question</button>";
                    tableHtml += "<button class=\"button-two\">Book a Test Drive</button>";
                tableHtml += "</div>";
            tableHtml += "</div>";
        tableHtml += "</div>";
    });

    table.innerHTML = tableHtml;
}