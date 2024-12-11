// Betűk húzásának kezelése
const betukContainer = document.getElementById('betuk');
const cellakTable = document.getElementById('cellak');

// Listája a betűknek
const betuk = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Betűk létrehozása és hozzáadása a DOM-hoz
betuk.forEach(betu => {
    const betuElem = document.createElement('div');
    betuElem.classList.add('betu');
    betuElem.setAttribute('draggable', 'true');
    betuElem.id = `betu${betu}`;
    betuElem.innerText = betu;
    
    betuElem.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.id); // Betű ID-ja kerül a drag eventbe
    });

    betukContainer.appendChild(betuElem);
});

// Táblázat létrehozása és cellák hozzáadása 10x10-es táblázatként
for (let i = 0; i < 10; i++) {
    const row = document.createElement('tr');
    
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('td');
        cell.classList.add('cell');
        
        // Cellákba történő húzás engedélyezése
        cell.addEventListener('dragover', (event) => {
            event.preventDefault(); // Engedélyezi a drop eseményt
        });

        cell.addEventListener('drop', (event) => {
            event.preventDefault(); // Megakadályozza az alapértelmezett viselkedést
            const betuId = event.dataTransfer.getData('text'); // A húzott betű ID-ja

            const betu = document.getElementById(betuId);
            if (betu) {
                // Húzott betű a cellába kerül
                cell.appendChild(betu);

                // A betű színének megváltoztatása (zöldre)
                betu.style.color = 'green'; // A betű színe zöldre változik

                // Opcionálisan eltávolíthatjuk a 'droppable' osztályt, ha nem szükséges
                cell.classList.remove('droppable');
            }
        });

        row.appendChild(cell);
    }

    cellakTable.appendChild(row);
}