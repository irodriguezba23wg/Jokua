const ErostekoObjetuak = document.querySelectorAll('.hobekuntza-zerrenda');
const puntuazioak = document.getElementById('puntuak');



ErostekoObjetuak.forEach(objektua => {
    objektua.addEventListener('click', () => {
        const prezioa = parseInt(objektua.getAttribute('data-precio'));
        const n= parseInt(objektua.getAttribute('erosketa_max'));
        let PuntuTotalak = parseInt(puntuazioak.textContent);

        if(parseInt(objektua.getAttribute('erosketa_kopuru'))<parseInt(objektua.getAttribute('erosketa_max'))){
            if (PuntuTotalak >= prezioa) {
                PuntuTotalak -= prezioa; 
                puntuazioak.textContent = PuntuTotalak;
                objektua.setAttribute('data-precio',prezioa*1.15^n);
                objektua.textContent = objektua.getAttribute('izena') + " - " + objektua.getAttribute('data-precio') + " Puntu";
                objektua.setAttribute('erosketa_kopuru',parseInt(objektua.getAttribute('erosketa_kopuru'))+1);
                if(parseInt(objektua.getAttribute('erosketa_kopuru'))==parseInt(objektua.getAttribute('erosketa_max'))){
                    disableObjektua(objektua);
                    objektua.textContent = objektua.getAttribute('izena') + " - Maxeatuta";
                }
            } else {
                alert('Ez duzu puntuazio nahikorik!');
            }
        }
        
    });
});

function disableObjektua(objektua){
    objektua.setAttribute('style', 'background-color: gold; pointer-events: none; color: black;');
}