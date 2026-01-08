# 📦 Inventory Optimizer Pro (EOQ & ROP)

![Licenza](https://img.shields.io/badge/License-MIT-green.svg)
![Tecnologie](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-blue.svg)
![Status](https://img.shields.io/badge/Status-Project%20Work%20Concluso-orange.svg)

**Inventory Optimizer Pro** è un'applicazione web "Mobile-First" progettata per supportare i decision-maker nella gestione ottimale delle scorte a domanda indipendente. Il software implementa modelli matematici avanzati di Ricerca Operativa per minimizzare i costi di gestione e garantire la continuità del servizio.

---

## 🎯 Obiettivi del Progetto

Il progetto (PW 11) mira a risolvere le inefficienze logistiche comuni nelle PMI, fornendo uno strumento rapido per:
1. **Calcolare il Lotto Economico di Ordinazione (EOQ)** tramite la formula di Wilson.
2. **Determinare il Punto di Riordino (ROP)** integrando una Scorta di Sicurezza probabilistica.
3. **Simulare scenari triennali** per prevedere l'impatto delle fluttuazioni della domanda.

---

## 🧪 Modelli Matematici Implementati

### 1. Lotto Economico (EOQ)
L'algoritmo individua la quantità ottimale di acquisto minimizzando il trade-off tra costi di setup ($S$) e costi di mantenimento ($H$):
$$EOQ = \sqrt{\frac{2 \cdot D \cdot S}{H}}$$

### 2. Punto di Riordino (ROP) con Scorta di Sicurezza
Per gestire l'incertezza del mercato e la variabilità del Lead Time ($L$), il software calcola il livello critico di scorta come:
$$ROP = (d \cdot L) + (Z \cdot \sigma \cdot \sqrt{L})$$
*Dove $Z$ rappresenta il fattore di servizio desiderato (es. 95%) e $\sigma$ la deviazione standard della domanda.*

---

## 💻 Caratteristiche Tecniche

- **Architettura Client-Side:** Interamente sviluppato in Vanilla JavaScript per garantire velocità zero-latency.
- **Responsive Design:** Ottimizzato per l'uso in magazzino tramite smartphone (Mobile-First approach).
- **Internationalization (i18n):** Supporto multilingua completo in **Italiano, Inglese e Spagnolo**.
- **Visualizzazione Dinamica:** Generazione istantanea di tabelle comparative per l'analisi storica.

---

## 🚀 Installazione e Utilizzo

Il software è una Single Page Application (SPA). Non richiede installazione o configurazioni server.

1. Clona il repository:
   ```bash
   git clone [https://github.com/tuo-username/tuo-repo.git](https://github.com/tuo-username/tuo-repo.git)
