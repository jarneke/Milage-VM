setTimeout(() => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
    for (const button of calculateButtons) {
        button.addEventListener('click', () => {
            const tankDiv = button.closest('.tank');
            if (tankDiv) {
                const previousFillDate = document.querySelector(`.tank[data-id="${tankDiv.getAttribute("data-id") - 1}"]`).firstElementChild.textContent.split(" ")[2];
                const clickedFillDate = tankDiv.firstElementChild.textContent.split(" ")[2];
                const fillPrice = parseFloat(tankDiv.childNodes[1].textContent.split("€")[1]);
                console.log(fillPrice);
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        // Parse JSON response
                        const tripsData = JSON.parse(this.responseText);
                        // Clear existing content
                        document.getElementById("calcTank").innerHTML = "";

                        console.log(tripsData);
                        let totalDriven = 0;
                        for (const trip of tripsData) {
                            totalDriven += (trip.em - trip.sm);
                        }
                        console.log(totalDriven);
                        let drivenPerPerson = []
                        for (const trip of tripsData) {
                            if (drivenPerPerson.find(e => e.user == trip.user) === undefined) {
                                drivenPerPerson.push({
                                    user: trip.user,
                                    trips: [],
                                    total: 0,
                                    costForTank: 0
                                })
                            }
                        }
                        for (const trip of tripsData) {
                            for (const person of drivenPerPerson) {
                                if (person.user === trip.user) {
                                    person.trips.push({
                                        date: trip.tripDate,
                                        sm: trip.sm,
                                        em: trip.em
                                    });
                                    person.total += trip.em - trip.sm;
                                }
                            }
                        }
                        for (const person of drivenPerPerson) {
                            person.costForTank = Math.round((fillPrice / totalDriven) * person.total * 100) / 100
                        }
                        console.log(drivenPerPerson);
                        const container = document.getElementById("calcTank");
                        const fillDateP = document.createElement("p");
                        const fillPriceP = document.createElement("p");

                        fillDateP.textContent = "Tank date: " + clickedFillDate;
                        fillPriceP.textContent = "Fill price: €" + fillPrice;

                        container.appendChild(fillDateP);
                        container.appendChild(fillPriceP);
                        for (const person of drivenPerPerson) {
                            const subContainer = document.createElement("div");
                            const userP = document.createElement("p");
                            const totalDrivenP = document.createElement("p");
                            const totalCostP = document.createElement("p");

                            userP.textContent = person.user;
                            totalDrivenP.textContent = "totaal gereden: " + person.total;
                            totalCostP.textContent = "Te betalen: " + person.costForTank;

                            subContainer.appendChild(userP);

                            for (const trip of person.trips) {
                                const subSubContainer = document.createElement("div");
                                const tripDate = document.createElement("p");
                                const sm = document.createElement("p");
                                const em = document.createElement("p");

                                tripDate.textContent = "datum: " + trip.date;
                                sm.textContent = "Start: " + trip.sm;
                                em.textContent = "Eind: " + trip.em;

                                subSubContainer.appendChild(tripDate);
                                subSubContainer.appendChild(sm);
                                subSubContainer.appendChild(em);

                                subContainer.appendChild(subSubContainer);
                            }
                            subContainer.appendChild(totalDrivenP);
                            subContainer.appendChild(totalCostP);

                            container.appendChild(subContainer);
                        }

                    }
                };
                // Send AJAX request to LoadTripsBetween.php
                xhttp.open("GET", `loadTripsBetween.php?prev=${encodeURIComponent(previousFillDate)}&curr=${encodeURIComponent(clickedFillDate)}`, true);
                xhttp.send();
            }
        });
    }
}, 1000);
