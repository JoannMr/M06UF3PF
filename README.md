# 📂 Gestor de Tasques (React)

## 🎯 Descripció del projecte

Aquest projecte és una refactorització de la versió imperativa del "Gestor de Tasques" a una versió declarativa utilitzant **React**.  
L'aplicació permet gestionar usuaris i les seves tasques (afegir, editar, completar, eliminar) amb canvi de tema clar/fosc.

No es fa persistència de dades, només frontend.

---

## 🏛️ Arquitectura de l'aplicació

L’aplicació s’organitza amb una jerarquia clara de components:

```
App
├── Sidebar → mostra usuaris i resum de tasques
├── Main → mostra les tasques de l’usuari seleccionat
```

- **App**: Component arrel, inclou el Provider del Context.
- **Sidebar**: Permet afegir, seleccionar i deseleccionar usuaris, mostra el resum de tasques.
- **Main**: Gestiona la llista de tasques (crear, editar, completar, esborrar).

---

## 🧩 Ús del Context

Per complir els requisits del projecte, s'ha implementat **Context API** de React.  
Aquest context gestiona de forma global:

- La llista d’usuaris i les seves tasques.
- L’usuari seleccionat.
- El tema (clar / fosc).
- Els valors dels inputs (nous usuaris i noves tasques).

### Exemple d’estructura del Context:
```javascript
const AppContext = createContext();

function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [theme, setTheme] = useState('light');
  // Funcions: afegir usuari, afegir tasca, editar, esborrar, etc.
  return (
    <AppContext.Provider value={{ users, selectedUserIndex, ... }}>
      {children}
    </AppContext.Provider>
  );
}
```

Els components utilitzen el context mitjançant un hook personalitzat:
```javascript
const useApp = () => useContext(AppContext);
```

---

## ✔️ Requisits complerts

- Jerarquia de components de 3 nivells.
- Ús de Context obligatori.
- JSX condicional per a:
  - Tatxar tasques completades.
  - Mostrar missatges si no hi ha usuaris o tasques.
  - Resum de tasques al lateral.
- Estats per gestionar usuaris, tasques, usuari seleccionat, tema i inputs.
- Estils originals respectats (`styles.css`).

---

## 🧑‍💻 Autor

Joan Merino Serrano  
CFGS Desenvolupament d’Aplicacions Web  
MP06 - UF3