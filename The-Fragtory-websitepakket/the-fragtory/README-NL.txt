THE FRAGTORY — STARTPAKKET
===========================

Wat zit erin?
- index.html + styles.css + script.js: de website
- data/products.json: productlijst die de website toont
- .pages.yml: configuratie voor Pages CMS (beheer via browser)
- media/products/: hier worden productfoto's bewaard zodra je ze uploadt in Pages CMS
- assets/: eigen abstracte illustraties zodat de startpagina niet leeg oogt

BELANGRIJK
Dit is een eerste, publiceerbaar startpakket. Er staan nog geen echte koraalproducten in,
omdat productnamen, prijzen en foto's niet verzonnen mogen worden. De collectie toont
een nette melding totdat je je eerste producten toevoegt.

PRODUCTBEHEER
Pages CMS is een aparte gratis editor voor de inhoud van deze website.
1. Plaats de inhoud van deze map in een GitHub-repository.
2. Ga naar https://app.pagescms.org en meld aan met GitHub.
3. Installeer de Pages CMS GitHub App voor die repository.
4. Open de repository in Pages CMS. Het leest .pages.yml automatisch.
5. Open 'Koraalproducten' om producten toe te voegen, foto's te uploaden,
   prijzen/status te wijzigen of producten te verwijderen.

Per product:
- Naam van het koraal
- Prijs in euro (0 = 'Prijs op aanvraag')
- Beschikbaarheid: Beschikbaar / Gereserveerd / Verkocht
- Korte omschrijving
- Eén of meerdere foto's
- 'Tonen op de website' aan/uit

WhatsApp
Het nummer is ingesteld op 32494370324 (België, zonder +).
Per product wordt automatisch een WhatsApp-bericht met de productnaam klaargezet.

GRATIS HOSTING
Cloudflare Pages kan een statische site gratis hosten.
Na upload naar GitHub:
1. Maak een account op https://dash.cloudflare.com/
2. Ga naar Workers & Pages > Create > Pages > Connect to Git.
3. Kies de repository.
4. Build command: leeg laten.
5. Build output directory: /
6. Deploy.

De gratis Cloudflare Pages-limieten kunnen wijzigen; controleer ze bij publicatie.
Een eigen .be-domeinnaam is niet inbegrepen. Het gratis adres is doorgaans
jouw-project.pages.dev.

LET OP
Pages CMS bewaart de content in GitHub. Wijzigingen worden als repository-commits opgeslagen.
Cloudflare Pages kan gekoppeld worden aan dezelfde repository en publiceert wijzigingen
automatisch. Er is geen eigen betaalde server of database nodig.
Website-update
