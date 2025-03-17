
document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        "Chaque poste de travail est équipé d'un antimalware avancé et d'un pare-feu actif ?",
        "Avez-vous un pare-feu d'entreprise et analysez-vous régulièrement ses journaux d'événements ?",
        "Avez-vous mis en place une stratégie de sauvegarde 3/2/1 ?",
        "Votre messagerie électronique dispose-t-elle d'outils de protection, au minimum un antispam ?",
        "Limitez-vous les droits d'accès des utilisateurs et appliquez-vous une stratégie de mots de passe ?",
        "Les utilisateurs sont-ils régulièrement sensibilisés et les bonnes pratiques incluses dans votre charte informatique ?",
        "La sécurité numérique du télétravail est-elle bien maîtrisée dans votre entreprise ?",
        "Disposez-vous de procédures d'urgence en cas de cyberattaque ?",
        "Un RSSI (Responsable de la Sécurité des Systèmes d'Information) est-il nommé et en charge de la cybersécurité ?",
        "Avez-vous un Plan de Continuité d'Activité (PCA) et/ou un Plan de Reprise d'Activité (PRA) ?"
    ];

    const form = document.getElementById("auditForm");

    questions.forEach((question, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${question}</p>
            <label><input type="radio" name="q${index}" value="oui"> Oui</label>
            <label><input type="radio" name="q${index}" value="partiellement"> Partiellement</label>
            <label><input type="radio" name="q${index}" value="non"> Non</label>
        `;
        form.appendChild(div);
    });

    document.getElementById("submitBtn").addEventListener("click", function () {
        let score = 0;
        questions.forEach((_, index) => {
            const answer = document.querySelector(`input[name='q${index}']:checked`);
            if (answer) {
                if (answer.value === "oui") score += 2;
                else if (answer.value === "partiellement") score += 1;
            }
        });
        
        const result = document.getElementById("result");
        result.textContent = score > 15 ? "Maturité élevée" : score > 10 ? "Maturité moyenne" : "Maturité faible. Pensez à renforcer vos mesures de sécurité.";
    });
});
