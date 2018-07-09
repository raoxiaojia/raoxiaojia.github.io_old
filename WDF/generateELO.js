function convertScore(bot1score, bot2score) {
    let loserScore = bot1score < 1000 ? bot1score : bot2score;
    let loserConvertedScore = 0;
    if (loserScore < 900) {
        loserConvertedScore = 0;
    }
    else if (loserScore < 950) {
        loserConvertedScore = (loserScore - 900) / 50 * 0.10;
    }
    else if (loserScore < 980) {
        loserConvertedScore = 0.10 + (loserScore - 950) / 30 * 0.15;
    }
    else {
        loserConvertedScore = 0.25 + (loserScore - 980) / 19 * 0.15;
    }
    if (bot1score >= 1000) return 1 - loserConvertedScore;
    return loserConvertedScore;
}

(async function generateELO(calculateELO, printResult) {
    const request = require('request');
    const util = require('util');
    const prequestget = util.promisify(request.get);

    request.get('https://dynamite.softwire.com/api/bots', {},
        function (error, response, body) {
            if (error) {
                console.log(error);
                return;
            }
            let botInfo = JSON.parse(body);
            request.get('https://dynamite.softwire.com/api/matchResults',
                {
                    json: { page: 1 }
                },
                async function (error, response, body) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log("botInfo fetched from server!");
                    let matchPageNum = body.totalPages;
                    let matchPagePromises = new Array(matchPageNum + 1);
                    let loaded = 0;
                    let matchResults = [];
                    for (let i = 1; i <= matchPageNum; i++) {
                        matchPagePromises[i] = prequestget(
                            'https://dynamite.softwire.com/api/matchResults?page=' + i
                        );
                        await matchPagePromises[i].then(function (matchResult) {
                            loaded++;
                            console.log(loaded + " / " + matchPageNum + " pages loaded!");
                            let res = JSON.parse(matchResult.body).results;
                            for (let j = 0; j < res.length; j++) {
                                if (res[j].errorReason) {
                                    console.log(res[j].id, res[j].errorReason);
                                    continue;
                                }
                                matchResults.push({
                                    id: res[j].id,
                                    botId1: res[j].bot1,
                                    botId2: res[j].bot2,
                                    bot1score: res[j].bot1score,
                                    bot2score: res[j].bot2score
                                });
                                console.log(res[j].id, res[j].bot1, res[j].bot2, res[j].bot1score, res[j].bot2score);
                            }
                        });
                    }
                    matchResults.sort(function (a, b) {
                        return a.id < b.id ? -1 : 1;
                    });
                    console.log(matchResults);
                    let botELO = calculateELO(matchResults, botInfo);
                    printResult(botELO);
                });
        }

    );
})(
    //calculateELO
    (function (matchResults, botInfo) {
        let maxbotId = 0;
        for (let i = 0; i < botInfo.length; i++) {
            if (botInfo[i].id > maxbotId) {
                maxbotId = botInfo[i].id;
            }
        }
        let res = new Array(maxbotId + 1);
        for (let i = 0; i < botInfo.length; i++) {
            if (!botInfo[i].id) {
                console.log("Botinfo " + i + " error!");
                continue;
            }
            res[botInfo[i].id] = {
                name: botInfo[i].name,
                ELO: 1000,
                user: botInfo[i].User.username,
                language: botInfo[i].file_type,
                matchCount: 0
            };
        }
        for (let i = 0; i < matchResults.length; i++) {
            let bot1 = matchResults[i].botId1;
            let bot2 = matchResults[i].botId2;
            let bot1score = matchResults[i].bot1score;
            let bot2score = matchResults[i].bot2score;
            let convertedScore1 = convertScore(bot1score, bot2score);
            let convertedScore2 = 1 - convertedScore1;
            let expectedScore1 = 1 / (1 + Math.pow(10, (res[bot2].ELO - res[bot1].ELO) / 400));
            let expectedScore2 = 1 - expectedScore1;
            let k1 = 0;
            let k2 = 0;
            if (res[bot1].matchCount < 20) {
                k1 = 30;
            }
            else {
                k1 = 15;
            }
            if (res[bot2].matchCount < 20) {
                k2 = 30;
            }
            else {
                k2 = 15;
            }
            let delta1 = k1 * (convertedScore1 - expectedScore1);
            let delta2 = k2 * (convertedScore2 - expectedScore2);
            res[bot1].ELO += delta1;
            res[bot2].ELO += delta2;
            res[bot1].matchCount++;
            res[bot2].matchCount++;
            console.log("Bot " + bot1 + " gains " + delta1.toFixed(2) + " ELO", "Bot " + bot2 + " gains " + delta2.toFixed(2) + " ELO. New ELO: " + res[bot1].ELO.toFixed(2) + " / " + res[bot2].ELO.toFixed(2));
        }
        return res;
    }),
    //printResult
    (function (botELO) {
        for (let i = 0; i < botELO.length; i++) {
            if (botELO[i]) {
                console.log(i, botELO[i].name, botELO[i].ELO, botELO[i].matchCount, botELO[i].user, botELO[i].language);
            }
        }
        const fs = require('fs');
        const JSONstr = "elostr = '" + JSON.stringify({ elo: botELO }) + "';";
        fs.writeFile("elo.txt", JSONstr, function (err) {
            if (err) {
                console.log(err);
            }
        });
    })
);