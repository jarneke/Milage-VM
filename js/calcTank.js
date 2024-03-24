setTimeout(() => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
    for (const button of calculateButtons) {
        button.addEventListener('click', () => {
            const tankDiv = button.closest('.tank');
            if (tankDiv) {
                const previousFillDate = document.querySelector(`.tank[data-id="${tankDiv.getAttribute("data-id") - 1}"]`).firstElementChild.textContent.split(" ")[2];
                const clickedFillDate = tankDiv.firstElementChild.textContent.split(" ")[2];
                console.log("clicked Date: " + clickedFillDate);
                console.log("previous Date: " + previousFillDate);
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        // Parse JSON response
                        const tripsData = JSON.parse(this.responseText);
                        // Clear existing content
                        document.getElementById("calcTank").innerHTML = "";
                        // Loop through each trip data
                        tripsData.forEach(function (trip) {
                            // Create a div element to hold trip information
                            var tripDiv = document.createElement("div");
                            tripDiv.classList.add("trip");
                            // Create paragraph elements for each piece of trip information
                            var userPara = document.createElement("p");
                            userPara.textContent = "User: " + trip.user;
                            var tripDatePara = document.createElement("p");
                            tripDatePara.textContent = "Trip Date: " + trip.tripDate;
                            var smPara = document.createElement("p");
                            smPara.textContent = "Start Mileage: " + trip.sm;
                            var emPara = document.createElement("p");
                            emPara.textContent = "End Mileage: " + trip.em;
                            // Append paragraph elements to the trip div
                            tripDiv.appendChild(userPara);
                            tripDiv.appendChild(tripDatePara);
                            tripDiv.appendChild(smPara);
                            tripDiv.appendChild(emPara);
                            // Append trip div to the calcTank container
                            document.getElementById("calcTank").appendChild(tripDiv);
                        });
                    }
                };
                // Send AJAX request to LoadTripsBetween.php
                xhttp.open("GET", `loadTripsBetween.php?prev=${encodeURIComponent(previousFillDate)}&curr=${encodeURIComponent(clickedFillDate)}`, true);
                xhttp.send();
            }
        });
    }
}, 1000);
