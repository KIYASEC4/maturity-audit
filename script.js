document.addEventListener("DOMContentLoaded", function () {
    const themes = [
        "Protection des postes",
        "Pare-feu",
        "Sauvegarde",
        "Sécurité des e-mails",
        "Accès et mots de passe",
        "Sensibilisation",
        "Télétravail",
        "Procédures d’urgence",
        "RSSI",
        "PCA/PRA"
    ];

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
            <label><input type="radio" name="q${index}" value="2"> Oui</label>
            <label><input type="radio" name="q${index}" value="1"> Partiellement</label>
            <label><input type="radio" name="q${index}" value="0"> Non</label>
        `;
        form.appendChild(div);
    });

    document.getElementById("submitBtn").addEventListener("click", function () {
        let scores = Array(themes.length).fill(0);
        let counts = Array(themes.length).fill(0);

        questions.forEach((_, index) => {
            const answer = document.querySelector(`input[name='q${index}']:checked`);
            if (answer) {
                const value = parseInt(answer.value);
                scores[index] += value;
                counts[index] += 1;
            }
        });
        
        let finalScores = scores.map((score, i) => counts[i] > 0 ? (score / counts[i]) : 0);

        const ctx = document.getElementById("maturityRadar").getContext("2d");
        new Chart(ctx, {
            type: "radar",
            data: {
                labels: themes,
                datasets: [{
                    label: "Niveau de Maturité",
                    data: finalScores,
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    borderColor: "rgba(0, 123, 255, 1)",
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 2,
                        ticks: { stepSize: 1 }
                    }
                }
            }
        });
    });
});
