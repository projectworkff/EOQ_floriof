// Oggetto contenente tutte le traduzioni per le tre lingue supportate dall'applicazione
const translations = {
    // Traduzioni in italiano - lingua predefinita
    it: {
        title: "Analizzatore EOQ/ROP", subtitle: "Ottimizzazione Scorte",
        labelD: "Domanda Annua", labelS: "Costo Setup", labelH: "Costo Gestione",
        labelL: "Lead Time (gg)", labelSigma: "Varianza (σ)", btn: "CALCOLA RISULTATI",
        resEOQ: "Lotto Ottimale", resROP: "Punto Riordino", simTitle: "Simulazione Triennale",
        base: "Base", eoqLabel: "Lotto", unitLabel: "Unitario:",
        errorD: "Inserire una domanda annua valida (maggiore di 0)",
        errorParams: "Assicurati che tutti i costi e i tempi siano positivi"
    },
    // Traduzioni in inglese
    en: {
        title: "EOQ/ROP Optimizer", subtitle: "Inventory Management",
        labelD: "Annual Demand", labelS: "Setup Cost", labelH: "Holding Cost",
        labelL: "Lead Time (days)", labelSigma: "Variance (σ)", btn: "CALCULATE RESULTS",
        resEOQ: "Optimal Lot", resROP: "Reorder Point", simTitle: "3-Year Simulation",
        base: "Base", eoqLabel: "Lot", unitLabel: "Unit:",
        errorD: "Please enter a valid annual demand (greater than 0)",
        errorParams: "Ensure all costs and times are positive"
    },
    // Traduzioni in spagnolo
    es: {
        title: "Optimizador EOQ/ROP", subtitle: "Gestión de Stock",
        labelD: "Demanda Anual", labelS: "Coste Pedido", labelH: "Coste Almacén",
        labelL: "Plazo Entrega (d)", labelSigma: "Varianza (σ)", btn: "CALCULAR RESULTADOS",
        resEOQ: "Lote Óptimo", resROP: "Punto de Pedido", simTitle: "Simulación 3 Años",
        base: "Base", eoqLabel: "Lote", unitLabel: "Unitario:",
        errorD: "Ingrese una demanda anual válida (mayor a 0)",
        errorParams: "Asegúrese de che todos los costos y tiempos sean positivos"
    }
};

/**
 * Funzione chiamata quando l'utente cambia la lingua dal dropdown
 * Aggiorna tutti i testi dell'interfaccia con la lingua selezionata
 */
function changeLanguage() {
    // Ottiene il valore della lingua selezionata dal dropdown
    const lang = document.getElementById('languagePicker').value;
    // Array con tutte le chiavi degli elementi da tradurre
    const keys = ['title', 'subtitle', 'labelD', 'labelS', 'labelH', 'labelL', 'labelSigma', 'btn', 'resEOQ', 'resROP', 'simTitle'];
    
    // Cicla attraverso ogni chiave e aggiorna il testo corrispondente
    keys.forEach(key => {
        const el = document.querySelector(`[data-key="${key}"]`); // Trova l'elemento con data-key
        if (el) el.innerText = translations[lang][key]; // Aggiorna il testo se l'elemento esiste
    });
    
    // Se i risultati sono già visibili, ricalcola per aggiornare anche la simulazione
    if (!document.getElementById('resultsArea').classList.contains('hidden')) {
        calcola(); // Richiama la funzione di calcolo per aggiornare la simulazione
    }
}

/**
 * Funzione principale che calcola EOQ, ROP e genera la simulazione triennale
 * Viene chiamata quando l'utente clicca il pulsante "CALCOLA RISULTATI"
 */
function calcola() {
    // Recupera e converte in numero i valori dai campi input
    const D = parseFloat(document.getElementById('D').value);     // Domanda annua (unità/anno)
    const S = parseFloat(document.getElementById('S').value);     // Costo di setup per ordine (€)
    const H = parseFloat(document.getElementById('H').value);     // Costo di mantenimento per unità (€/unità/anno)
    const L = parseFloat(document.getElementById('L').value);     // Lead time in giorni
    const sigma = parseFloat(document.getElementById('sigma').value); // Deviazione standard della domanda
    const lang = document.getElementById('languagePicker').value; // Lingua corrente per le traduzioni
    
    // VALIDAZIONE INPUT 
    if (isNaN(D) || D <= 0) {
        document.getElementById('resultsArea').classList.add('hidden'); // Nasconde l'area risultati
        alert(translations[lang].errorD);
        return;
    }
    if (isNaN(S) || S < 0 || isNaN(H) || H <= 0 || isNaN(L) || L < 0 || isNaN(sigma) || sigma < 0) {
        document.getElementById('resultsArea').classList.add('hidden'); // Nasconde l'area risultati
        alert(translations[lang].errorParams);
        return;
    }

    const Z = 1.645; // Fattore Z per il 95% di livello di servizio (distribuzione normale)
    
    // Calcolo delle formule principali per la gestione delle scorte
    const eoq = Math.sqrt((2 * D * S) / H);        // Formula EOQ: √(2*D*S/H)
    const ss = Z * sigma * Math.sqrt(L);           // Scorta di sicurezza: Z * σ * √L
    const rop = ((D / 365) * L) + ss;              // Punto di riordino: domanda media durante lead time + scorta di sicurezza

    // Mostra i risultati principali nell'interfaccia
    document.getElementById('outEOQ').innerText = Math.round(eoq); // Visualizza EOQ arrotondato
    document.getElementById('outROP').innerText = Math.round(rop); // Visualizza ROP arrotondato
    document.getElementById('resultsArea').classList.remove('hidden'); // Rende visibile l'area risultati

    // Preparazione per la simulazione triennale
    const simContainer = document.getElementById('simContainer'); // Container per le card della simulazione
    simContainer.innerHTML = ''; // Pulisce il contenuto precedente
    
    // Array con i fattori di variazione per i tre anni: base, +25%, -20%
    const variazioni = [1, 0.80, 1.25]; // Anno 1: Base, Anno 2: Calo, Anno 3: Recupero/Picco
    
    // Genera una card per ogni anno della simulazione
    variazioni.forEach((v, i) => {
        // Calcola i valori per l'anno corrente
        let curD = D * v;                                     // Domanda per l'anno corrente
        let curEOQ = Math.sqrt((2 * curD * S) / H);           // EOQ per la domanda corrente
        let curCost = (curD / curEOQ * S) + (curEOQ / 2 * H); // Costo totale: costo ordini + costo mantenimento
        let unitCost = curCost / curD;                        // Costo unitario per unità
        
        // Calcola la percentuale di variazione rispetto al valore base
        let perc = Math.round((v - 1) * 100);
        // Determina l'etichetta da mostrare in base alla percentuale
        let labelPerc = perc === 0 ? translations[lang].base : (perc > 0 ? `+${perc}%` : `${perc}%`);
        // Determina la classe CSS per il colore in base alla variazione
        let classTag = perc === 0 ? 'base-tag' : (perc > 0 ? 'growth' : 'decline');

        // Crea e inserisce l'HTML per la card dell'anno corrente
        simContainer.innerHTML += `
            <div class="sim-card">
                <div class="year-circle">${i + 1}</div>
                <div class="demand-info">
                    <small class="mini-label">Domanda</small>
                    <b>${Math.round(curD).toLocaleString()}</b>
                    <span class="tag ${classTag}">${labelPerc}</span>
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
