# Smart Form Builder — Frontend Architecture (UI MVP v1)

> Stack: **React · TypeScript · Vite · MUI · Zustand**  
> Scope: Single-page builder dashboard — no backend, no routing, no auth.

---

## 1. Vollständige Ordnerstruktur

```
src/
├── app/                          # App-Shell & globale Konfiguration
│   ├── App.tsx                   ✅ vorhanden
│   └── theme.ts                  ✅ vorhanden
│
├── components/
│   ├── shared/                   # Wiederverwendbare UI-Bausteine
│   │   ├── PanelSection.tsx      ✅ vorhanden  — Panel-Wrapper mit Header/Actions
│   │   ├── EmptyState.tsx        ➕ neu        — Leerer Zustand (kein Feld gewählt etc.)
│   │   └── SeverityChip.tsx      ➕ neu        — Farbiger Chip für UX-Severity
│   │
│   ├── builder/                  # Linke + mittlere Spalte des Builders
│   │   ├── FieldLibrary.tsx      ✅ vorhanden  — Feldkatalog-Sidebar
│   │   ├── BuilderCanvas.tsx     ✅ vorhanden  — Klickbare Feldliste
│   │   └── FieldCard.tsx         ➕ neu        — Einzelne Feldkarte (aus BuilderCanvas extrahieren)
│   │
│   ├── inspector/                # Rechte Spalte — Feldeinstellungen
│   │   ├── InspectorPanel.tsx    ✅ vorhanden  — Haupt-Inspector-Panel
│   │   └── OptionsEditor.tsx     ➕ neu        — Select/Radio-Optionen bearbeiten
│   │
│   ├── analysis/                 # Rechte Spalte — UX-Analyse
│   │   ├── UxAnalysisPanel.tsx   ✅ vorhanden  — Score + Warnungen
│   │   └── WarningCard.tsx       ➕ neu        — Einzelne Warnung (aus UxAnalysisPanel extrahieren)
│   │
│   └── preview/                  # Unterer Bereich — Live-Vorschau
│       ├── PreviewPanel.tsx      ✅ vorhanden  — Gesamtes Preview-Panel
│       └── PreviewField.tsx      ➕ neu        — Einzelnes gerendertes Feld
│
├── store/
│   └── builderStore.ts           ✅ vorhanden  — Zustand: Zustand-Store (Zustand)
│
├── data/
│   ├── fieldCatalog.ts           ✅ vorhanden  — Statischer Feldkatalog
│   └── mockForm.ts               ✅ vorhanden  — Demo-Templates
│
├── types/
│   └── form.ts                   ✅ vorhanden  — Alle TypeScript-Interfaces
│
├── utils/
│   └── analysis.ts               ✅ vorhanden  — UX-Heuristik-Logik
│
├── styles/
│   └── global.css                ✅ vorhanden  — CSS-Reset & globale Stile
│
├── main.tsx                      ✅ vorhanden  — Vite-Einstiegspunkt
└── vite-env.d.ts                 ✅ vorhanden  — Vite-Typen
```

**Legende:** ✅ vorhanden · ➕ empfohlen als nächster Schritt

---

## 2. Konkrete Dateinamen & Zuständigkeiten

### `src/app/`

| Datei                          | Zweck                                                                  |
| ------------------------------ | ---------------------------------------------------------------------- |
| [`App.tsx`](src/app/App.tsx)   | Root-Komponente: Layout-Grid (3 Spalten), Header-Bar, Template-Buttons |
| [`theme.ts`](src/app/theme.ts) | MUI-Theme: Palette, Typografie, Border-Radius, Component-Overrides     |

### `src/components/shared/`

| Datei                                                        | Zweck                                                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| [`PanelSection.tsx`](src/components/shared/PanelSection.tsx) | Universeller Panel-Wrapper: eyebrow / title / description / actions / children             |
| `EmptyState.tsx`                                             | Wiederverwendbarer Leer-Zustand mit Icon, Titel, Beschreibung, optionalem CTA              |
| `SeverityChip.tsx`                                           | Chip mit automatischer Farbe basierend auf `WarningSeverity` (`info`/`warning`/`critical`) |

### `src/components/builder/`

| Datei                                                           | Zweck                                                                                    |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`FieldLibrary.tsx`](src/components/builder/FieldLibrary.tsx)   | Linke Sidebar: Feldkatalog gruppiert nach `Basic` / `Choice`, Add-Button                 |
| [`BuilderCanvas.tsx`](src/components/builder/BuilderCanvas.tsx) | Mittlere Spalte: Feldliste, Selektion, Reihenfolge, Aktionen                             |
| `FieldCard.tsx`                                                 | Einzelne Feldkarte (Extraktion aus `BuilderCanvas`): Icon, Label, Chips, Aktions-Buttons |

### `src/components/inspector/`

| Datei                                                               | Zweck                                                             |
| ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`InspectorPanel.tsx`](src/components/inspector/InspectorPanel.tsx) | Rechte Spalte oben: Label, Placeholder, HelpText, Width, Required |
| `OptionsEditor.tsx`                                                 | Unterkomponente für `select`/`radio`: Optionen inline bearbeiten  |

### `src/components/analysis/`

| Datei                                                                | Zweck                                                            |
| -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`UxAnalysisPanel.tsx`](src/components/analysis/UxAnalysisPanel.tsx) | Rechte Spalte unten: Score-Bar, Summary-Chips, Warnungsliste     |
| `WarningCard.tsx`                                                    | Einzelne Warnung: Titel, Severity-Chip, Beschreibung, Empfehlung |

### `src/components/preview/`

| Datei                                                         | Zweck                                                                |
| ------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`PreviewPanel.tsx`](src/components/preview/PreviewPanel.tsx) | Unterer Bereich: Formular-Header, Grid-Layout, Submit-Button         |
| `PreviewField.tsx`                                            | Einzelnes gerendertes Feld: Switch über `FieldType` → MUI-Komponente |

### `src/store/`

| Datei                                          | Zweck                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| [`builderStore.ts`](src/store/builderStore.ts) | Einziger Zustand-Store: `form`, `selectedFieldId`, alle Aktionen |

### `src/data/`

| Datei                                         | Zweck                                             |
| --------------------------------------------- | ------------------------------------------------- |
| [`fieldCatalog.ts`](src/data/fieldCatalog.ts) | Statische Liste aller `FieldCatalogItem`s         |
| [`mockForm.ts`](src/data/mockForm.ts)         | Demo-Templates (`primaryTemplate`, `templates[]`) |

### `src/types/`

| Datei                          | Zweck                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| [`form.ts`](src/types/form.ts) | Alle Interfaces: `FormField`, `FormDefinition`, `UxWarning`, `AnalysisResult`, etc. |

### `src/utils/`

| Datei                                  | Zweck                                                |
| -------------------------------------- | ---------------------------------------------------- |
| [`analysis.ts`](src/utils/analysis.ts) | Pure Funktion `analyzeForm(form)` → `AnalysisResult` |

---

## 3. Welche Komponenten gehören wohin

```
App.tsx
│
├── [Header-Bar]                  → inline in App.tsx (zu klein für eigene Datei)
│
├── FieldLibrary                  → components/builder/
│
├── BuilderCanvas                 → components/builder/
│   └── FieldCard (×n)            → components/builder/   ← Extraktion empfohlen
│       └── FieldPreview          → inline in FieldCard (einfach genug)
│
├── InspectorPanel                → components/inspector/
│   └── OptionsEditor             → components/inspector/ ← Extraktion empfohlen
│
├── UxAnalysisPanel               → components/analysis/
│   └── WarningCard (×n)          → components/analysis/  ← Extraktion empfohlen
│
└── PreviewPanel                  → components/preview/
    └── PreviewField (×n)         → components/preview/   ← Extraktion empfohlen
```

**Trennprinzip:** Eine Komponente wird ausgelagert, wenn sie:

- eigene Props-Schnittstelle hat (nicht nur `field: FormField`)
- in mehr als einer Stelle wiederverwendet werden könnte
- mehr als ~60 Zeilen JSX enthält

---

## 4. Empfohlene Erstellungsreihenfolge

### Phase 1 — Fundament (bereits vorhanden ✅)

```
1. src/types/form.ts              — Alle Typen zuerst definieren
2. src/app/theme.ts               — Design-Token festlegen
3. src/styles/global.css          — CSS-Reset
4. src/main.tsx                   — Vite-Einstieg mit ThemeProvider
5. src/data/fieldCatalog.ts       — Statische Daten
6. src/data/mockForm.ts           — Demo-Templates
7. src/utils/analysis.ts          — Pure Logik, unabhängig von UI
8. src/store/builderStore.ts      — Zustand-Store
```

### Phase 2 — Shared UI (bereits vorhanden ✅)

```
9.  src/components/shared/PanelSection.tsx   — Basis-Wrapper für alle Panels
```

### Phase 3 — Feature-Panels (bereits vorhanden ✅)

```
10. src/components/builder/FieldLibrary.tsx
11. src/components/builder/BuilderCanvas.tsx
12. src/components/inspector/InspectorPanel.tsx
13. src/components/analysis/UxAnalysisPanel.tsx
14. src/components/preview/PreviewPanel.tsx
15. src/app/App.tsx                           — Alles zusammensetzen
```

### Phase 4 — Refactoring & Erweiterung (➕ nächste Schritte)

```
16. src/components/shared/EmptyState.tsx      — Leer-Zustände vereinheitlichen
17. src/components/shared/SeverityChip.tsx    — Severity-Farbe zentralisieren
18. src/components/builder/FieldCard.tsx      — Aus BuilderCanvas extrahieren
19. src/components/inspector/OptionsEditor.tsx — Aus InspectorPanel extrahieren
20. src/components/analysis/WarningCard.tsx   — Aus UxAnalysisPanel extrahieren
21. src/components/preview/PreviewField.tsx   — Aus PreviewPanel extrahieren
```

---

## 5. Warum diese Struktur für ein kleines, sauberes UI-MVP sinnvoll ist

### 5.1 Feature-Slices statt Layer-Trennung

```
❌ Nicht so:          ✅ So (aktuell):
components/           components/
  inputs/               builder/
  panels/               inspector/
  cards/                analysis/
  modals/               preview/
                        shared/
```

Jeder Ordner entspricht einem **sichtbaren UI-Bereich**. Ein neuer Entwickler findet `UxAnalysisPanel.tsx` sofort unter `analysis/` — ohne Suche.

### 5.2 Einziger Store, flacher State

[`builderStore.ts`](src/store/builderStore.ts) hält **alles** in einem flachen Objekt:

- `form: FormDefinition` — die gesamte Formulardefinition
- `selectedFieldId: string | null` — Selektion

Kein Context-Nesting, kein Redux-Boilerplate. Zustand-Selektoren verhindern unnötige Re-Renders.

### 5.3 Typen zuerst, Logik getrennt

[`form.ts`](src/types/form.ts) definiert alle Interfaces **ohne** React-Abhängigkeit.  
[`analysis.ts`](src/utils/analysis.ts) ist eine **pure Funktion** — testbar ohne DOM, ohne Store.

### 5.4 `PanelSection` als Design-System-Kern

[`PanelSection.tsx`](src/components/shared/PanelSection.tsx) ist der einzige Layout-Wrapper. Alle 5 Panels sehen konsistent aus, weil sie dieselbe Komponente nutzen. Änderungen am Panel-Design (Schatten, Radius, Padding) wirken sich sofort überall aus.

### 5.5 Keine vorzeitige Abstraktion

Das MVP hat **keine**:

- Router (`react-router-dom`) — eine Seite reicht
- API-Layer — Mock-Daten in `data/`
- Formular-Bibliothek (`react-hook-form`) — Preview ist read-only
- Drag & Drop — Click-to-build ist ausreichend für MVP
- Lazy Loading — Bundle ist klein genug

### 5.6 Direkt geeignet für späteren Ausbau

| Erweiterung              | Wo einhängen                                                |
| ------------------------ | ----------------------------------------------------------- |
| Drag & Drop im Canvas    | `BuilderCanvas.tsx` → `@dnd-kit` integrieren                |
| Mehrere Seiten / Routing | `app/` → `AppRouter.tsx` hinzufügen                         |
| Backend-Anbindung        | `store/` → `builderStore.ts` um `async` Aktionen erweitern  |
| Mehr Feldtypen           | `types/form.ts` → `FieldType` erweitern + `fieldCatalog.ts` |
| Erweiterte UX-Regeln     | `utils/analysis.ts` → neue Heuristiken hinzufügen           |
| Dark Mode                | `app/theme.ts` → `mode: 'dark'` Variante                    |
| Mehrsprachigkeit         | `data/` → i18n-Strings auslagern                            |
| Unit Tests               | `utils/analysis.ts` ist bereits pure → direkt testbar       |

---

## Zusammenfassung: Aktuelle vs. empfohlene Struktur

```
AKTUELL (✅ solide MVP-Basis)          NÄCHSTE SCHRITTE (➕ Phase 4)
─────────────────────────────          ──────────────────────────────
src/app/App.tsx                        src/components/shared/EmptyState.tsx
src/app/theme.ts                       src/components/shared/SeverityChip.tsx
src/components/shared/PanelSection     src/components/builder/FieldCard.tsx
src/components/builder/FieldLibrary    src/components/inspector/OptionsEditor.tsx
src/components/builder/BuilderCanvas   src/components/analysis/WarningCard.tsx
src/components/inspector/Inspector     src/components/preview/PreviewField.tsx
src/components/analysis/UxAnalysis
src/components/preview/PreviewPanel
src/store/builderStore.ts
src/data/fieldCatalog.ts
src/data/mockForm.ts
src/types/form.ts
src/utils/analysis.ts
src/styles/global.css
```

Die aktuelle Struktur ist **bereits production-ready für ein UI-MVP**. Die Phase-4-Extraktionen verbessern die Wartbarkeit, sind aber kein Blocker für die erste Demo.
