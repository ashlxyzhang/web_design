document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5001/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ID, Make, Model, Type, Price}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${Make}</td>`;
        tableHtml += `<td>${Model}</td>`;
        tableHtml += `<td>${Type}</td>`;
        tableHtml += `<td>${Price}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}