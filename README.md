# Ann Thuisverpleging · Ann Gezondheid

Definitieve statische website voor Ann Vandewiele en haar team. De repository bevat de bewerkbare HTML-pagina’s, CSS, JavaScript, foto’s, het herstelde logo en lokaal gehoste lettertypen.

Website: https://ann-zorg-premium-voorbeeld.andreas-danschotte57.chatgpt.site

## Bekijken

Er is geen installatie of build nodig. Open `index.html` in een browser, of start een lokale webserver vanuit de hoofdmap:

```sh
python3 -m http.server 3000
```

Open daarna http://localhost:3000.

## Bewerken

- `index.html`: homepagina.
- `thuisverpleging.html`, `diabeteseducatie.html`, `voedingsadvies.html` en `rookstopbegeleiding.html`: uitleg over de zorg.
- `ons-team.html`, `contact.html` en `vacature.html`: team, contact en vacature.
- De aanvullende informatiepagina’s staan eveneens in de hoofdmap.
- `styles.css`: basisstijl en gedeelde footer.
- `navigation.css`: navigatie en mobiele menu-opmaak.
- `home-values.css`, `home-services.css` en `home-refinements.css`: vormgeving van de homepagina.
- `thuisverpleging.css`: vormgeving van Thuisverpleging.
- `pages.css`: gedeelde stijl voor de overige vernieuwde pagina’s.
- `vacature.css`: aanvullende vacaturevormgeving.
- `app.js`: mobiel menu, privacyvenster, contactformulier en meescrollende contactgegevens.

De HTML-bestanden zijn de actuele bron. Er is geen pagina-generator nodig. Houd relatieve links en de map `assets/` bij elkaar. De lettertypelicenties staan in `assets/fonts/`.

## Download en hosting

`ann-website.zip` bevat de complete actuele website. Pak deze uit en plaats de volledige inhoud op een statische webhosting met HTTPS. GitHub bevat de bronbestanden; het bijwerken van deze repository wijzigt de Sites-publicatie niet automatisch.

## Contactformulier

Het formulier bereidt een e-mail voor in het e-mailprogramma van de bezoeker. Het verstuurt zelf niets en slaat geen formuliergegevens op. De bezoeker controleert en verzendt de e-mail zelf. Zorgkeuzes uit links worden in het formulier overgenomen.

De site gebruikt lokaal gehoste lettertypen, zonder analytische of advertentiecookies. De bestaande privacytoelichting staat op elke pagina.
