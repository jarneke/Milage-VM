setTimeout(() => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
    for (const button of calculateButtons) {
        button.addEventListener('click', () => {
            const tankDiv = button.closest('.tank');
            if (tankDiv) {
                const previousFillDate = document.querySelector(`.tank[data-id="${tankDiv.getAttribute("data-id") - 1}"]`).firstElementChild.textContent.split(" ")[2];
                const clickedFillDate = tankDiv.firstElementChild.textContent.split(" ")[2];
                const clickedFillPrice = parseFloat(tankDiv.childNodes[1].textContent.split("€")[1]);
                console.log(clickedFillPrice);
                console.log("clicked Date: " + clickedFillDate);
                console.log("previous Date: " + previousFillDate);
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        // Parse JSON response
                        const tripsData = JSON.parse(this.responseText);
                        // Clear existing content
                        document.getElementById("calcTank").innerHTML = "";

                        console.log(tripsData);
                        const totalDriven = 0;
                        for (const trip of tripsData) {
                            totalDriven += (trip.em - trip.sm);
                        }
                        console.log(totalDriven);
                    }
                };
                // Send AJAX request to LoadTripsBetween.php
                xhttp.open("GET", `loadTripsBetween.php?prev=${encodeURIComponent(previousFillDate)}&curr=${encodeURIComponent(clickedFillDate)}`, true);
                xhttp.send();
            }
        });
    }
}, 1000);
