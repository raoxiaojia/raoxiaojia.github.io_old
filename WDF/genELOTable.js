function genELOTable() {
    let eloJSON = JSON.parse(elostr).elo;
    eloJSON = eloJSON.filter(function (a) { return (a !== null) });
    eloJSON.sort(
        function (a, b) {
            return a.ELO < b.ELO ? 1 : -1;
        }
    );
    let eloTableHTML = "<table><tr><th>Rank</th><th>Bot name</th><th>ELO Rating</th><th>Matches</th><th>Language</th></tr>";
    for (let i = 0; i < eloJSON.length; i++) {
        if (!eloJSON[i]) continue;
        eloTableHTML += "<tr><td>" + (i + 1) + "</td><td>" + eloJSON[i].name + "</td><td>" + eloJSON[i].ELO.toFixed(0) + "</td><td>" + eloJSON[i].matchCount + "</td><td>" + eloJSON[i].language + "</td></tr>";
    }
    eloTableHTML += "</table>";
    document.getElementById("ELOTable").innerHTML = eloTableHTML;
}