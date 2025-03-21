// Referencias a elementos HTML
const searchPlayer = document.getElementById('searchPlayer');
const searchTournament = document.getElementById('searchTournament');
const searchPlayerCoop = document.getElementById('searchPlayerCoop');
const searchTournamentCoop = document.getElementById('searchTournamentCoop');
const playersContainer = document.getElementById('players-container');
const teamsContainer = document.getElementById('teams-container');

let players = [];
let teams = [];

// Cargar archivos JSON
async function loadJSON() {
    try {
        const playersResponse = await fetch('./players.json');
        const teamsResponse = await fetch('./teams.json');

        players = await playersResponse.json();
        teams = await teamsResponse.json();

        renderPlayers();
        renderTeams(); // Asegurar que se renderizan equipos al inicio
    } catch (error) {
        console.error('Error al cargar archivos JSON:', error);
    }
}

// Renderizar jugadores
function renderPlayers() {
    playersContainer.innerHTML = '';
    const filteredPlayers = players.filter(player =>
        player.player.toLowerCase().includes(searchPlayer.value.toLowerCase())
    );

    filteredPlayers.forEach(player => {
        const playerSection = document.createElement('div');
        playerSection.className = 'player-section';
        playerSection.style.backgroundImage =  `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${player.backgroundImage || 'default.jpg'})`;
        playerSection.style.backgroundSize = "cover";
        playerSection.style.backgroundPosition = "center";
        playerSection.innerHTML = `
            <img src="${player.image}" class="player-image" alt="${player.player}">
            <h3>${player.player}</h3>
            ${player.tournaments.map(t => `
                <div class="tournament">
                    <h5>${t.name}</h5>
                    <img src="${t.trophy}" class="trophy-img" alt="Trofeo">
                </div>
            `).join('')}
        `;
        playersContainer.appendChild(playerSection);
    });
}

// Renderizar equipos
function renderTeams() {
    teamsContainer.innerHTML = '';
    const filteredTeams = teams.filter(team =>
        team.team.toLowerCase().includes(searchPlayerCoop.value.toLowerCase())
    );

    filteredTeams.forEach(team => {
        const teamSection = document.createElement('div');
        teamSection.className = 'player-section';
        teamSection.style.backgroundImage = `url(${team.backgroundImage})`;
        teamSection.innerHTML = `
            <h3>${team.team}</h3>
            <h5>${team.name1} & ${team.name2}</h5>
            ${team.tournaments.map(t => `
                <div class="tournament">
                    <h5>${t.name}</h5>
                    <img src="${t.trophy}" class="trophy-img" alt="Trofeo">
                </div>
            `).join('')}
        `;
        teamsContainer.appendChild(teamSection);
    });
}

// Eventos de búsqueda
searchPlayer.addEventListener('input', renderPlayers);
searchPlayerCoop.addEventListener('input', renderTeams);

// Cambiar entre pestañas
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    const activeTab = e.target.getAttribute('href');

    if (activeTab === '#cooperative') {
        renderTeams();
    } else {
        renderPlayers();
    }
});

// Iniciar carga de datos
loadJSON();
