# 🍺 BarQuiz

**Schätzfragen-PWA für die Bar-Runde.**

## Benutzung

1. Datei `index.html` im Browser öffnen (Doppelklick reicht)
2. Frage lesen, diskutieren/schätzen
3. Auf die Antwortbox **tippen** → Auflösung wird angezeigt
4. **✓ Richtig** oder **✗ Falsch** → nächste Frage
5. **🎲** mischt neu durch

## Als App installieren (PWA)

### Android (Chrome)
- Beim ersten Besuch erscheint ein Install-Banner
- Oder: Menü ⋮ → „App installieren"

### iPhone (Safari)
- Safari öffnen → Teilen-Button (🔼) → „Zum Home-Bildschirm"
- Wichtig: Die Seite muss über **`file://`** oder **HTTPS** geladen sein

### Desktop (Chrome/Edge)
- Adressleiste: Install-Icon (➕) klicken

## Dateien

| Datei | Zweck |
|-------|-------|
| `index.html` | Die App (einfach im Browser öffnen) |
| `manifest.json` | PWA-Konfig (Name, Icon, Vollbild) |
| `sw.js` | Service Worker (Offline-Support) |
| `icon.svg` | App-Icon (Bier-Emoji) |

## Fragen hinzufügen

Einfach `index.html` öffnen, im `QUESTIONS`-Array neue Einträge ergänzen:

```js
{ q: 'Deine Frage?', a: 'Die Antwort', cat: 'Kategorie' }
```