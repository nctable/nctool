// static/script.js

function calculateDivisions() {
    const rows = document.querySelectorAll('.profit_table tbody tr');
    let highestVDiaCrowResult = -Infinity;
    let highestDivisionResult = -Infinity;
    let highestVDiaCrowRow = null;
    let highestDivisionRow = null;

    rows.forEach(row => {
        const price = parseFloat(row.querySelector('.price').textContent);
        const token = row.querySelector('.token').textContent;
        const userValueInput = row.querySelector('.user-value');
        const userValue = parseFloat(userValueInput.value) || 0;
        let divisionResult;
        let vDiaCrowResult;

        if (token === 'MORION' || token === 'PAPYRUS') {
            divisionResult = (userValue * 10) / price;
            vDiaCrowResult = price / (userValue * 10);
        } else {
            divisionResult = userValue / price;
            vDiaCrowResult = price / userValue;
        }

        // Update division result cell
        const divisionCell = row.querySelector('.division-result');
        divisionCell.textContent = isFinite(divisionResult) ? divisionResult.toFixed(2) : 'N/A';

        // Update vDia / CROW result cell
        const vDiaCrowCell = row.querySelector('.vDia-crow-result');
        vDiaCrowCell.textContent = isFinite(vDiaCrowResult) ? vDiaCrowResult.toFixed(5) : 'N/A';

        // Track highest values and corresponding rows
        if (divisionResult > highestDivisionResult) {
            highestDivisionResult = divisionResult;
            highestDivisionRow = row;
        }
        if (vDiaCrowResult > highestVDiaCrowResult) {
            highestVDiaCrowResult = vDiaCrowResult;
            highestVDiaCrowRow = row;
        }
    });

    // Remove previous highlights
    rows.forEach(row => {
        row.classList.remove('highlight-blue', 'highlight-red');
    });

    // Apply highlighting based on highest values
    if (highestDivisionRow) {
        highestDivisionRow.classList.add('highlight-blue');
    }
    if (highestVDiaCrowRow) {
        highestVDiaCrowRow.classList.add('highlight-red');
    }
}

document.addEventListener('input', calculateDivisions);
