// Oggetto contenente tutte le traduzioni
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
        base: "BASE",
        eoqLabel: "Lotto",
        unitLabel: "Unitario:"
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
        base: "BASE",
        eoqLabel: "Lot",
        unitLabel: "Per Unit:"
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
        resROP: "Punto Pedido",
        simTitle: "Simulación 3 Años",
        base: "BASE",
        eoqLabel: "Lote",
        unitLabel: "Unitario:"
    }
};

/**
 * Funzione per il cambio lingua
 */
function changeLanguage() {
    const lang = document.getElementById('languagePicker').value;
    const keys = ['title', 'subtitle', 'labelD', 'labelS', 'labelH', 'labelL', 'labelSigma', 'btn', 'resEOQ', 'resROP', 'simTitle'];
    
    keys.forEach(key => {
        const el = document.querySelector(`[data-key="${key}"]`);
        if (el) el.innerText = translations[lang][key];
    });
    
    // Se i risultati sono aperti, ricalcola per aggiornare i testi nella simulazione
    if (!document.getElementById('resultsArea').classList.contains('hidden')) calcola();
}

/**
 * Funzione di calcolo principale (EOQ, ROP e Simulazione)
 */
function calcola() {
    // Input
    const D = parseFloat(document.getElementById('D').value);
    const S = parseFloat(document.getElementById('S').value);
    const H = parseFloat(document.getElementById('H').value);
    const L = parseFloat(document.getElementById('L').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const lang = document.getElementById('languagePicker').value;
    
    // Costanti e Formule
    const Z = 1.645; 
    const eoq = Math.sqrt((2 * D * S) / H);
    const ss = Z * sigma * Math.sqrt(L);
    const rop = ((D / 365) * L) + ss;

    // Output Risultati Principali
    document.getElementById('outEOQ').innerText = Math.round(eoq);
    document.getElementById('outROP').innerText = Math.round(rop);
    document.getElementById('resultsArea').classList.remove('hidden');

    // Generazione Simulazione
    const simContainer = document.getElementById('simContainer');
    simContainer.innerHTML = '';
    const variazioni = [1, 1.25, 0.80]; 

    variazioni.forEach((v, i) => {
        let curD = D * v;
        let curEOQ = Math.sqrt((2 * curD * S) / H);
        let curCost = (curD / curEOQ * S) + (curEOQ / 2 * H);
        let unitCost = curCost / curD;
        
        let perc = Math.round((v - 1) * 100);
        let classTag = perc === 0 ? 'base-tag' : (perc > 0 ? 'growth' : 'decline');
        let labelTag = perc === 0 ? translations[lang].base : (perc > 0 ? `+${perc}%` : `${perc}%`);

        simContainer.innerHTML += `
            <div class="sim-card">
                <div class="year-circle">${i + 1}</div>
                <div class="demand-info">
                    <small class="mini-label">Domanda</small>
                    <b>${Math.round(curD).toLocaleString()} u</b>
                    <span class="tag ${classTag}">${labelTag}</span>
                </div>
                <div class="cost-block">
                    <small class="mini-label">${translations[lang].eoqLabel}</small>
                    <span class="eoq-small">${Math.round(curEOQ)}</span>
                    <span class="cost-small">€${Math.round(curCost).toLocaleString()}</span>
                    <span class="unit-badge">${translations[lang].unitLabel} €${unitCost.toFixed(3)}</span>
                </div>
            </div>
        `;
    });
}
