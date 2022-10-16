async function TableLoader(){
    const response = await fetch("/2022/final/final-junior.json");
    const scoreboardData = await response.json();
    const tbody = document.createElement("tbody");
    const institution = [   ["SMAN 8 Pekanbaru", "/2022/images/affiliations/SMAN8Pekanbaru.png"],
                            ["SMA Katolik St Louis 1", "/2022/images/affiliations/Sinlui 1.jpg"],
                            ["SMA NEGERI 1 WONOSOBO", "/2022/images/affiliations/SMAN1Wonosobo.png"],
                            ["SMA Kristen Petra 4", "/2022/images/affiliations/SMAKristenPetra4.png"],
                            ["SMAK Plus Penabur Cirebon", "/2022/images/affiliations/SMAK1PenaburCirebon.png"],
                            ["SMA Semesta Semarang", "/2022/images/affiliations/SMASEMESTA.png"],
                            ["SMAS Kristen Gloria 2 Surabaya", "/2022/images/affiliations/SMASKristenGloria2Surabaya.png"],
                            ["SMAS Sutomo 1 Medan", "/2022/images/affiliations/SMASSutomo1.png"],
                            ["SMA Kesatuan Bangsa", "/2022/images/affiliations/SMA Kesatuan Bangsa.jpg"],
                            ["SMAK 1 BPK PENABUR BANDUNG", "/2022/images/affiliations/SMAK1BPKPENABURBANDUNG.png"],
                            ["SMAN Unggulan M. H. Thamrin", "/2022/images/affiliations/SMANUnggulanMHTamrin.png"],
                            ["SMAK Rajawali Makassar", "/2022/images/affiliations/SMAKRajawaliMakassar.jpg"],
                            ["MAN 2 Kota Malang", "/2022/images/affiliations/MAN 2 Kota Malang.jpg"],
                            ["SMAS Pribadi Bandung", "/2022/images/affiliations/SMASPribadi.png"],
                            ["SMAS Sutomo 1 Medan", "/2022/images/affiliations/SMASSutomo1.png"],
                            ["SMAS Pribadi Bandung", "/2022/images/affiliations/SMASPribadi.png"],
                            ["SMAS BINA NUSANTARA SIMPRUG", "/2022/images/affiliations/SMASBinaNusantaraSimprug.png"],
                            ["MAN 2 Pekanbaru", "/2022/images/affiliations/MAN 2 Pekanbaru.png"],
                            ["SMAK 3 BPK PENABUR BANDUNG", "/2022/images/affiliations/SMAK3BPKPENABURBANDUNG.jpg"],
                            ["MAN 2 Kota Malang", "/2022/images/affiliations/MAN 2 Kota Malang.jpg"],
                            ["SMA Bina Kasih", "/2022/images/affiliations/SMA Bina Kasih.png"],
                            ["SMAK Rajawali Makassar", "/2022/images/affiliations/SMAKRajawaliMakassar.jpg"],
                            ["SMAK 1 PENABUR Jakarta", "/2022/images/affiliations/SMAK1PENABURJakarta.png"]];
    let counter = 0;

    scoreboardData.data.scoreboard.content.entries.forEach(element => {
        const contestantRow = document.createElement("tr");
        contestantRow.setAttribute("style", "height: 5rem");

        const contestantRank = document.createElement("td");
        contestantRank.appendChild(document.createTextNode(element.rank));
        contestantRow.appendChild(contestantRank);

        const contestantTeam = document.createElement("td");
        contestantTeam.classList.add("tooltip");
        contestantTeam.setAttribute("style", "width: 400px");
        const layout = document.createElement("div");
        layout.classList.add("layout");
        const institutionImage = document.createElement("img");
        institutionImage.classList.add("institute-logo");
        institutionImage.setAttribute("src", institution[counter][1]);
        
        const innerLayout = document.createElement("div");
        const teamName = document.createElement("p");
        teamName.setAttribute("style", "margin: auto auto auto 10px");
        const teamNameBold = document.createElement("b");
        teamNameBold.appendChild(document.createTextNode(element.contestantUsername));
        teamName.appendChild(teamNameBold);
        innerLayout.appendChild(teamName);

        const institutionName = document.createElement("p");
        institutionName.setAttribute("style", "margin: auto auto auto 10px; font-size: 0.8em; color: rgba(255, 255, 255, 0.75);");
        institutionName.appendChild(document.createTextNode(" " + institution[counter][0] + " "));

        layout.appendChild(institutionImage);
        innerLayout.appendChild(institutionName);
        layout.appendChild(innerLayout);
        contestantTeam.appendChild(layout);
        contestantRow.appendChild(contestantTeam);

        const contestantScore = document.createElement("td");

        if(counter === 0){
            contestantScore.classList.add("verdict-ac-100");
        }
        else if(counter === 1){
            contestantScore.classList.add("verdict-wa-80");
        }
        else if(counter === 2){
            contestantScore.classList.add("verdict-wa-60");
        }
        else if(counter === 3){
            contestantScore.classList.add("verdict-wa-40");
        }
        else if(counter === 4){
            contestantScore.classList.add("verdict-wa-20");
        }
        else{
            contestantScore.classList.add("verdict-neutral");
        }

        const teamScore = document.createElement("p");
        teamScore.setAttribute("style", "text-align: center; margin: auto");
        teamScore.appendChild(document.createTextNode(element.totalScores));

        contestantScore.appendChild(teamScore);
        contestantRow.appendChild(contestantScore);

        element.scores.forEach( score => {
            const contestantVerdict = document.createElement("td");
            const scoreText = document.createElement("p");
            scoreText.setAttribute("align", "center");
            scoreText.setAttribute("style", "margin: auto");

            if(score === null){
                contestantVerdict.classList.add("verdict-neutral");
                scoreText.appendChild(document.createTextNode("-"));
            }
            else if(score === 100){
                contestantVerdict.classList.add("verdict-ac-100");
                scoreText.appendChild(document.createTextNode(score));
            }
            else if(score >= 80){
                contestantVerdict.classList.add("verdict-wa-80");
                scoreText.appendChild(document.createTextNode(score));
            }
            else if(score >= 60){
                contestantVerdict.classList.add("verdict-wa-60");
                scoreText.appendChild(document.createTextNode(score));
            }
            else if(score >= 40){
                contestantVerdict.classList.add("verdict-wa-40");
                scoreText.appendChild(document.createTextNode(score));
            }
            else if(score >= 20){
                contestantVerdict.classList.add("verdict-wa-20");
                scoreText.appendChild(document.createTextNode(score));
            }
            else if(score >= 0){
                contestantVerdict.classList.add("verdict-wa-0");
                scoreText.appendChild(document.createTextNode(score));
            }
            contestantVerdict.appendChild(scoreText);

            contestantRow.appendChild(contestantVerdict);

        });

        tbody.appendChild(contestantRow);
        counter++;
    });

    document.getElementById("table").appendChild(tbody);
}

function Init(){
    TableLoader();
}