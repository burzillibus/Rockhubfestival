(() => {
    const bandData = {
        'thunder-core': {
            name: 'Thunder Core',
            date: 'Sabato 27 Giugno 2026 - Headliner'
        },
        'electric-void': {
            name: 'Electric Void',
            date: 'Domenica 28 Giugno 2026 - Headliner'
        },
        'steel-pulse': {
            name: 'Steel Pulse',
            date: 'Venerdì 26 Giugno 2026 - Headliner'
        },
        'the-rust-kings': {
            name: 'The Rust Kings',
            date: 'Venerdì 26 Giugno 2026'
        },
        'iron-wolves': {
            name: 'Iron Wolves',
            date: 'Venerdì 26 Giugno 2026'
        },
        'oredisole': {
            name: 'Oredisole',
            date: 'Sabato 27 Giugno 2026'
        },
        'neon-decay': {
            name: 'Neon Decay',
            date: 'Sabato 27 Giugno 2026'
        },
        'echoes-of-riot': {
            name: 'Echoes of Riot',
            date: 'Domenica 28 Giugno 2026'
        },
        'phantom-surge': {
            name: 'Phantom Surge',
            date: 'Domenica 28 Giugno 2026'
        },
        'dead-circuit': {
            name: 'Dead Circuit',
            date: 'Domenica 28 Giugno 2026'
        },
        'storm-engine': {
            name: 'Storm Engine',
            date: 'Domenica 28 Giugno 2026'
        },
        'black-ravens': {
            name: 'The Black Ravens',
            date: 'Domenica 28 Giugno 2026'
        },
        'volt-hammer': {
            name: 'Volt Hammer',
            date: 'Domenica 28 Giugno 2026'
        }
    };

    const slug = window.location.pathname.split('/').pop().replace('.html', '');
    const info = bandData[slug] || {
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        date: ''
    };

    const root = document.getElementById('band-root');
    if (!root) return;

    document.title = `${info.name} - Rockhub Festival 2026`;

    const article = document.createElement('article');
    article.className = 'band-detail container';

    const heading = document.createElement('h1');
    heading.textContent = info.name;

    const eventLocation = document.createElement('p');
    eventLocation.className = 'event-location';
    eventLocation.textContent = info.date;

    const image = document.createElement('img');
    image.className = 'band-photo';
    image.src = `../resources/bands/${slug}/band.png`;
    image.alt = `${info.name} - foto band`;
    image.addEventListener('error', () => {
        image.remove();
    });

    const description = document.createElement('p');
    description.className = 'band-description';
    description.textContent = 'Caricamento descrizione...';

    const backLink = document.createElement('a');
    backLink.className = 'back-link';
    backLink.href = '../index.html#le-band';
    backLink.textContent = 'Torna alla Line-up';

    root.innerHTML = '';
    root.appendChild(article);
    article.append(heading, eventLocation, image, description, backLink);

    fetch(`../resources/bands/${slug}/description.txt`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Impossibile caricare la descrizione');
            }
            return response.text();
        })
        .then(text => {
            description.textContent = text.trim();
        })
        .catch(() => {
            description.textContent = 'Descrizione non disponibile.';
        });
})();
