(() => {
    const bandData = {
        'reel-tape': { name: 'Reel Tape' },
        'moscato': { name: 'Moscato Blues Band' },
        'oredisole': { name: 'Oredisole' },
        'fullflow': { name: 'The Full Flow Project' },
        'mothers': { name: 'Mother\'s Well' },
        'aftermath': { name: 'Aftermath' },
        'kimaera': { name: 'Kimaera' },
        'monochromej': { name: 'Monochrome J' },
        'framework': { name: 'Framework' },
        'yourghost': { name: 'yourghost' },
        'lips': { name: 'L.I.P.S.' },
        'antartika': { name: 'Antartika' },
        'noblesse': { name: 'Noblesse' }
    };

    const slug = window.location.pathname.split('/').pop().replace('.html', '');
    const info = bandData[slug] || {
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    };

    const root = document.getElementById('band-root');
    if (!root) return;

    const socialLinks = document.querySelector('.social-links');

    // Inietta Font Awesome se non già presente
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    // Inietta header con navbar
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="menu-toggle" id="mobile-menu"><i class="fas fa-bars"></i></div>
        <nav class="navbar" id="navbar">
            <ul>
                <li><a href="../index.html#home">Home</a></li>
                <li><a href="../index.html#band">Line-up</a></li>
                <li><a href="../index.html#sponsor">Sponsor</a></li>
                <li><a href="../index.html#contatti">Contatti</a></li>
                <li><a href="../index.html#mappa">Come Raggiungerci</a></li>
            </ul>
        </nav>`;
    document.body.prepend(header);
    document.getElementById('mobile-menu').addEventListener('click', () => {
        document.getElementById('navbar').classList.toggle('active');
    });

    document.title = `${info.name} - Rockhub Festival 2026`;

    const article = document.createElement('article');
    article.className = 'band-detail container';

    const heading = document.createElement('h1');
    heading.textContent = info.name;


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
    backLink.href = '../index.html#band';
    backLink.textContent = 'Torna alla Line-up';

    root.innerHTML = '';
    root.appendChild(article);
    article.append(heading, image, description);
    if (socialLinks) {
        article.appendChild(socialLinks);
    }
    article.appendChild(backLink);

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
