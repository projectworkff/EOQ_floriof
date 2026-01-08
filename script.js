document.getElementById('btnCalculate').addEventListener('click', function() {
    // 1. Acquisizione dati
    const D = parseFloat(document.getElementById('demand').value);
    const S = parseFloat(document.getElementById('setup').value);
    const H = parseFloat(document.getElementById('holding').value);
    const L = parseFloat(document.getElementById('leadtime').value);
    const Z = parseFloat(document.getElementById('serviceLevel').value);
    const sigma = parseFloat(document.getElementById('sigma').value);

    // 2. Calcoli Core
    const eoq = Math.sqrt((2 * D * S) / H);
    
    // Domanda giornaliera (assumendo 365 gg)
    const d_avg = D / 365;
    const ss = Z * sigma * Math.sqrt(L);
    const rop = (d_avg * L) + ss;

    // 3. Visualizzazione Risultati Istantanei
    document.getElementById('outEOQ').innerText = Math.round(eoq);
    document.getElementById('outSS').innerText = Math.round(ss);
    document.getElementById('outROP').innerText = Math.round(rop);
    document.getElementById('resultsArea').style.display = 'block';

    // 4. Generazione Simulazione 3 Anni
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = ''; // Pulisci tabella

    const variazioni = [1, 1.15, 0.90]; // Simuliamo fluttuazioni domanda (+15%, -10%)
    
    variazioni.forEach((mod, index) => {
        let currentD = D * mod;
        let currentEOQ = Math.sqrt((2 * currentD * S) / H);
        let currentTotalCost = (currentD/currentEOQ * S) + (currentEOQ/2 * H);

        let row = `<tr>
            <td>Anno ${index + 1}</td>
            <td>${Math.round(currentD)} unità</td>
            <td>${Math.round(currentEOQ)}</td>
            <td>${Math.round(rop)}</td>
            <td>€ ${currentTotalCost.toLocaleString('it-IT', {maximumFractionDigits: 2})}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
});