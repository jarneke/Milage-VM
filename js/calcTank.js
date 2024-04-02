setTimeout(() => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
    for (const button of calculateButtons) {
        button.addEventListener('click', () => {
            const tankDiv = button.closest('.tank');
            console.log(tankDiv);
            if (tankDiv) {
                const previousFillDate = document.querySelector(`.tank[data-id="${tankDiv.getAttribute("data-id") - 1}"]`).childNodes[1].textContent.split(" ")[2];
                console.log(previousFillDate);
                const clickedFillDate = tankDiv.childNodes[1].textContent.split(" ")[2];
                console.log(tankDiv.childNodes[1]);
                console.log(clickedFillDate);
                const fillPrice = parseFloat(tankDiv.childNodes[2].textContent.split("€")[1]);
                console.log(fillPrice);
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        // Parse JSON response
                        const tripsData = JSON.parse(this.responseText);
                        console.log(tripsData);
                        // Clear existing content
                        document.getElementById("calcTank").innerHTML = "";
                        let totalDriven = 0;
                        for (const trip of tripsData) {
                            totalDriven += (trip.em - trip.sm);
                        }
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
                        const container = document.getElementById("calcTank");
                        const fillDateP = document.createElement("p");
                        const fillPriceP = document.createElement("p");

                        container.classList.add("d-flex", "flex-wrap", "bg-secondary", "text-white", "gap-3", "rounded", "p-2")
                        fillDateP.textContent = "Tank date: " + clickedFillDate;
                        fillDateP.classList.add("display-5", "col-12")
                        fillPriceP.textContent = "Fill price: €" + fillPrice;
                        fillPriceP.classList.add("display-5", "col-12")

                        container.appendChild(fillDateP);
                        container.appendChild(fillPriceP);
                        for (const person of drivenPerPerson) {
                            const subContainer = document.createElement("div");
                            const userP = document.createElement("p");
                            const tripsContainer = document.createElement("div");
                            const totalDrivenP = document.createElement("p");
                            const totalCostP = document.createElement("p");
                            const tripsButton = document.createElement("button");

                            subContainer.classList.add("bg-dark", "p-2", "d-flex", "flex-column", "gap-3", "col-12", "rounded")
                            tripsContainer.classList.add("d-flex", "flex-column", "gap-2")
                            userP.textContent = person.user;
                            totalDrivenP.textContent = "totaal gereden: " + person.total;
                            totalCostP.textContent = "Te betalen: €" + person.costForTank;

                            tripsButton.textContent = "Show trips"
                            tripsButton.classList.add("btn", "btn-dark")
                            tripsButton.setAttribute("data-trips", true)
                            tripsButton.addEventListener("click", e => {
                                e.preventDefault();
                                if (tripsButton.getAttribute("data-trips") == "true") {
                                    for (const child of tripsContainer.childNodes) {
                                        child.style.display = "block"
                                    }
                                    tripsButton.style.display = "block"
                                    tripsButton.setAttribute("data-trips", false)
                                    tripsButton.textContent = "Hide trips"
                                } else {
                                    for (const child of tripsContainer.childNodes) {
                                        child.style.display = "none"
                                    }
                                    tripsButton.style.display = "block"
                                    tripsButton.setAttribute("data-trips", true)
                                    tripsButton.textContent = "Show trips"
                                }
                            })
                            tripsContainer.appendChild(tripsButton)
                            subContainer.appendChild(userP);
                            subContainer.appendChild(tripsContainer);
                            for (const trip of person.trips) {
                                const subSubContainer = document.createElement("div");
                                const tripDate = document.createElement("p");
                                const sm = document.createElement("p");
                                const em = document.createElement("p");

                                subSubContainer.classList.add("bg-secondary", "p-2", "rounded")
                                subSubContainer.style.display = "none"
                                tripDate.textContent = "datum: " + trip.date;
                                sm.textContent = "Start: " + trip.sm;
                                em.textContent = "Eind: " + trip.em;

                                subSubContainer.appendChild(tripDate);
                                subSubContainer.appendChild(sm);
                                subSubContainer.appendChild(em);

                                tripsContainer.appendChild(subSubContainer);
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
