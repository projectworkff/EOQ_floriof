const translations = {
    it: {
        title: "Analizzatore EOQ/ROP",
        subtitle: "Ottimizzazione Scorte",
        labelD: "Domanda Annua",
        labelS: "Costo Setup",
        labelH: "Costo Mantenimento",
        labelL: "Lead Time (gg)",
        labelSigma: "Varianza (σ)",
        btn: "CALCOLA RISULTATI",
        resEOQ: "Lotto Ottimale",
        resROP: "Punto Riordino",
        simTitle: "Simulazione Triennale",
        year: "Anno",
        base: "Base",
        eoqLabel: "Lotto: ",
        costLabel: "Costo Tot: "
    },
    en: {
        title: "EOQ/ROP Optimizer",
        subtitle: "Inventory Management",
        labelD: "Annual Demand",
        labelS: "Setup Cost",
        labelH: "Holding Cost",
        labelL: "Lead Time (days)",
        labelSigma: "Variance (σ)",
        btn: "CALCULATE RESULTS",
        resEOQ: "Optimal Lot",
        resROP: "Reorder Point",
        simTitle: "3-Year Simulation",
        year: "Year",
        base: "Base",
        eoqLabel: "Lot: ",
        costLabel: "Total Cost: "
    },
    es: {
        title: "Optimizador EOQ/ROP",
        subtitle: "Gestión de Stock",
        labelD: "Demanda Anual",
        labelS: "Coste Pedido",
        labelH: "Coste Almacén",
        labelL: "Plazo Entrega (d)",
        labelSigma: "Varianza (σ)",
        btn: "CALCULAR RESULTADOS",
        resEOQ: "Lote Óptimo",
        resROP: "Punto de Pedido",
        simTitle: "Simulación 3 Años",
        year: "Año",
        base: "Base",
        eoqLabel: "Lote: ",
        costLabel: "Coste Tot: "
    }
};

function changeLanguage() {
    const lang = document.getElementById('languagePicker').value;
    document.querySelector('[data-key="title"]').innerText = translations[lang].title;
    document.querySelector('[data-key="subtitle"]').innerText = translations[lang].subtitle;
    document.querySelector('[data-key="labelD"]').innerText = translations[lang].labelD;
    document.querySelector('[data-key="labelS"]').innerText = translations[lang].labelS;
    document.querySelector('[data-key="labelH"]').innerText = translations[lang].labelH;
    document.querySelector('[data-key="labelL"]').innerText = translations[lang].labelL;
    document.querySelector('[data-key="labelSigma"]').innerText = translations[lang].labelSigma;
    document.querySelector('[data-key="btn"]').innerText = translations[lang].btn;
    document.querySelector('[data-key="resEOQ"]').innerText = translations[lang].resEOQ;
    document.querySelector('[data-key="resROP"]').innerText = translations[lang].resROP;
    document.querySelector('[data-key="simTitle"]').innerText = translations[lang].simTitle;

    if (!document.getElementById('resultsArea').classList.contains('hidden')) {
        calcola();
    }
}

function calcola() {
    const D = parseFloat(document.getElementById('D').value);
    const S = parseFloat(document.getElementById('S').value);
    const H = parseFloat(document.getElementById('H').value);
    const L = parseFloat(document.getElementById('L').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const lang = document.getElementById('languagePicker').value;
    const Z = 1.645; 

    // Calcoli Base
    const eoq = Math.sqrt((2 * D * S) / H);
    const ss = Z * sigma * Math.sqrt(L);
    const rop = ((D / 365) * L) + ss;

    // Visualizzazione Risultati Principali
    document.getElementById('outEOQ').innerText = Math.round(eoq);
    document.getElementById('outROP').innerText = Math.round(rop);
    document.getElementById('resultsArea').classList.remove('hidden');

    // Generazione Card di Simulazione
    const simContainer = document.getElementById('simContainer');
    simContainer.innerHTML = '';
    const variazioni = [1, 1.25, 0.80]; // Simuliamo fluttuazioni

    variazioni.forEach((v, i) => {
        let curD = D * v;
        let curEOQ = Math.sqrt((2 * curD * S) / H);
        let curCost = (curD / curEOQ * S) + (curEOQ / 2 * H);
        
        let perc = Math.round((v - 1) * 100);
        let labelPerc = perc === 0 ? translations[lang].base : (perc > 0 ? `+${perc}%` : `${perc}%`);
        let classPerc = perc === 0 ? '' : (perc > 0 ? 'up' : 'down');

        simContainer.innerHTML += `
            <div class="sim-card">
                <div class="sim-info">
                    <div class="year-circle">${i + 1}</div>
                    <div class="demand-text">
                        <b>${Math.round(curD)} unità</b>
                        <small class="${classPerc}">${labelPerc}</small>
                    </div>
                </div>
                <div class="sim-values">
                    <span class="eoq-val">${translations[lang].eoqLabel} ${Math.round(curEOQ)}</span>
                    <span class="cost-val">€${Math.round(curCost)}</span>
                </div>
            </div>
        `;
    });
}
