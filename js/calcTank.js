setTimeout(() => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
    for (const button of calculateButtons) {
        button.addEventListener('click', () => {
            const tankDiv = button.closest('.tank');
            if (tankDiv) {
                const previosFillDate = document.querySelector(`.tank[data-id="${tankDiv.getAttribute("data-id") - 1}"]`).firstElementChild.textContent.split(" ")[2];
                const clickedFillDate = tankDiv.firstElementChild.textContent.split(" ")[2];
                console.log("clicked Date: " + clickedFillDate);
                console.log("previos Date: " + previosFillDate);
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        document.getElementById("calcTank").innerHTML = this.responseText;
                    }
                };
                xhttp.open("GET", "loadTripsBetween.php", true);
                xhttp.send({
                    curr: clickedFillDate,
                    prev: previosFillDate
                });
            }
        });
    }
}, 1000);