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
            date: 'Venerdi 26 Giugno 2026 - Headliner'
        },
        'the-rust-kings': {
            name: 'The Rust Kings',
            date: 'Metal Alternativo'
        },
        'oredisole': {
            name: 'Oredisole',
            date: 'Hard Rock'
        },
        'echoes-of-riot': {
            name: 'Echoes of Riot',
            date: 'Punk Rock'
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
