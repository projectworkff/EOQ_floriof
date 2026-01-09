// Oggetto contenente tutte le traduzioni per le tre lingue supportate dall'applicazione
const translations = {
    // Traduzioni in italiano - lingua predefinita
    it: {
        title: "Analizzatore EOQ/ROP",           // Titolo principale dell'applicazione
        subtitle: "Ottimizzazione Scorte",      // Sottotitolo descrittivo
        labelD: "Domanda Annua",                // Etichetta per il campo domanda annua
        labelS: "Costo Setup",                  // Etichetta per il costo di setup/ordinazione
        labelH: "Costo Gestione",               // Etichetta per il costo di mantenimento scorte
        labelL: "Lead Time (gg)",               // Etichetta per il tempo di consegna in giorni
        labelSigma: "Varianza (σ)",             // Etichetta per la varianza della domanda
        btn: "CALCOLA RISULTATI",               // Testo del pulsante di calcolo
        resEOQ: "Lotto Ottimale",               // Etichetta per il risultato EOQ
        resROP: "Punto Riordino",               // Etichetta per il risultato ROP
        simTitle: "Simulazione Triennale",     // Titolo della sezione simulazione
        year: "Anno",                           // Parola "Anno" per la simulazione
        base: "Base",                           // Etichetta per il valore base (anno 1)
        eoqLabel: "Lotto: ",                    // Prefisso per il valore EOQ nella simulazione
        costLabel: "Costo Tot: "                // Prefisso per il costo totale
    },
    // Traduzioni in inglese
    en: {
        title: "EOQ/ROP Optimizer",             // Titolo in inglese
        subtitle: "Inventory Management",       // Sottotitolo in inglese
        labelD: "Annual Demand",                // Domanda annua in inglese
        labelS: "Setup Cost",                   // Costo setup in inglese
        labelH: "Holding Cost",                 // Costo mantenimento in inglese
        labelL: "Lead Time (days)",             // Lead time in inglese
        labelSigma: "Variance (σ)",             // Varianza in inglese
        btn: "CALCULATE RESULTS",               // Pulsante calcolo in inglese
        resEOQ: "Optimal Lot",                  // EOQ in inglese
        resROP: "Reorder Point",                // ROP in inglese
        simTitle: "3-Year Simulation",          // Simulazione in inglese
        year: "Year",                           // Anno in inglese
        base: "Base",                           // Base in inglese
        eoqLabel: "Lot: ",                      // Lotto in inglese
        costLabel: "Total Cost: "               // Costo totale in inglese
    },
    // Traduzioni in spagnolo
    es: {
        title: "Optimizador EOQ/ROP",           // Titolo in spagnolo
        subtitle: "Gestión de Stock",           // Sottotitolo in spagnolo
        labelD: "Demanda Anual",                // Domanda annua in spagnolo
        labelS: "Coste Pedido",                 // Costo ordine in spagnolo
        labelH: "Coste Almacén",                // Costo magazzino in spagnolo
        labelL: "Plazo Entrega (d)",            // Tempo consegna in spagnolo
        labelSigma: "Varianza (σ)",             // Varianza in spagnolo
        btn: "CALCULAR RESULTADOS",             // Pulsante calcolo in spagnolo
        resEOQ: "Lote Óptimo",                  // EOQ in spagnolo
        resROP: "Punto de Pedido",              // ROP in spagnolo
        simTitle: "Simulación 3 Años",         // Simulazione in spagnolo
        year: "Año",                            // Anno in spagnolo
        base: "Base",                           // Base in spagnolo
        eoqLabel: "Lote: ",                     // Lotto in spagnolo
        costLabel: "Coste Tot: "                // Costo totale in spagnolo
    }
};

/**
 * Funzione chiamata quando l'utente cambia la lingua dal dropdown
 * Aggiorna tutti i testi dell'interfaccia con la lingua selezionata
 */
function changeLanguage() {
    // Ottiene il valore della lingua selezionata dal dropdown
    const lang = document.getElementById('languagePicker').value;
    
    // Aggiorna il titolo principale dell'applicazione
    document.querySelector('[data-key="title"]').innerText = translations[lang].title;
    // Aggiorna il sottotitolo
    document.querySelector('[data-key="subtitle"]').innerText = translations[lang].subtitle;
    // Aggiorna l'etichetta del campo domanda annua
    document.querySelector('[data-key="labelD"]').innerText = translations[lang].labelD;
    // Aggiorna l'etichetta del campo costo setup
    document.querySelector('[data-key="labelS"]').innerText = translations[lang].labelS;
    // Aggiorna l'etichetta del campo costo mantenimento
    document.querySelector('[data-key="labelH"]').innerText = translations[lang].labelH;
    // Aggiorna l'etichetta del campo lead time
    document.querySelector('[data-key="labelL"]').innerText = translations[lang].labelL;
    // Aggiorna l'etichetta del campo varianza
    document.querySelector('[data-key="labelSigma"]').innerText = translations[lang].labelSigma;
    // Aggiorna il testo del pulsante di calcolo
    document.querySelector('[data-key="btn"]').innerText = translations[lang].btn;
    // Aggiorna l'etichetta del risultato EOQ
    document.querySelector('[data-key="resEOQ"]').innerText = translations[lang].resEOQ;
    // Aggiorna l'etichetta del risultato ROP
    document.querySelector('[data-key="resROP"]').innerText = translations[lang].resROP;
    // Aggiorna il titolo della sezione simulazione
    document.querySelector('[data-key="simTitle"]').innerText = translations[lang].simTitle;

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
    // Recupera e converte in numero il valore della domanda annua dall'input
    const D = parseFloat(document.getElementById('D').value);
    // Recupera e converte in numero il costo di setup dall'input
    const S = parseFloat(document.getElementById('S').value);
    // Recupera e converte in numero il costo di mantenimento dall'input
    const H = parseFloat(document.getElementById('H').value);
    // Recupera e converte in numero il lead time dall'input
    const L = parseFloat(document.getElementById('L').value);
    // Recupera e converte in numero la varianza dall'input
    const sigma = parseFloat(document.getElementById('sigma').value);
    // Ottiene la lingua corrente per le traduzioni
    const lang = document.getElementById('languagePicker').value;
    // Fattore Z per il 95% di livello di servizio (1.645 per distribuzione normale)
    const Z = 1.645;

    // Calcola EOQ usando la formula: √(2*D*S/H)
    const eoq = Math.sqrt((2 * D * S) / H);
    // Calcola la scorta di sicurezza: Z * σ * √L
    const ss = Z * sigma * Math.sqrt(L);
    // Calcola il punto di riordino: domanda media durante lead time + scorta di sicurezza
    const rop = ((D / 365) * L) + ss;

    // Mostra il risultato EOQ arrotondato nell'elemento HTML
    document.getElementById('outEOQ').innerText = Math.round(eoq);
    // Mostra il risultato ROP arrotondato nell'elemento HTML
    document.getElementById('outROP').innerText = Math.round(rop);
    // Rimuove la classe "hidden" per rendere visibile l'area risultati
    document.getElementById('resultsArea').classList.remove('hidden');

    // Ottiene il container dove inserire le card della simulazione
    const simContainer = document.getElementById('simContainer');
    // Pulisce il contenuto precedente del container
    simContainer.innerHTML = '';
    
    // Array con i fattori di variazione per i tre anni della simulazione
    // Anno 1: 100% (base), Anno 2: +25%, Anno 3: -20%
    const variazioni = [1, 1.25, 0.80];

    // Cicla attraverso ogni variazione per creare le card della simulazione
    variazioni.forEach((v, i) => {
        // Calcola la domanda per l'anno corrente moltiplicando per il fattore
        let curD = D * v;
        // Calcola l'EOQ per la domanda corrente
        let curEOQ = Math.sqrt((2 * curD * S) / H);
        // Calcola il costo totale: (domanda/EOQ * costo setup) + (EOQ/2 * costo mantenimento)
        let curCost = (curD / curEOQ * S) + (curEOQ / 2 * H);
        
        // Calcola la percentuale di variazione rispetto al valore base
        let perc = Math.round((v - 1) * 100);
        
        // Determina l'etichetta da mostrare in base alla percentuale
        let labelPerc = perc === 0 ? translations[lang].base : (perc > 0 ? `+${perc}%` : `${perc}%`);
        // Determina la classe CSS per il colore in base alla variazione
        let classPerc = perc === 0 ? '' : (perc > 0 ? 'up' : 'down');

        // Crea e inserisce l'HTML per la card dell'anno corrente
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
