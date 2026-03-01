# Git Branching Strategy

## Ramas Principales

| Rama      | Propósito                        | Protegida |
| --------- | -------------------------------- | --------- |
| `master`  | Código en producción             | ✅ Sí     |
| `develop` | Código en desarrollo integración | ✅ Sí     |

## Ramas de Soporte

| Prefijo    | Ejemplo                 | Descripción                         |
| ---------- | ----------------------- | ----------------------------------- |
| `feature/` | `feature/login`         | Nuevas funcionalidades              |
| `bugfix/`  | `bugfix/fix-login`      | Correcciones de bugs                |
| `hotfix/`  | `hotfix/security-patch` | Correcciones urgentes en producción |
| `release/` | `release/v1.0.0`        | Preparación de versiones            |

---

## Flujo de Trabajo

### 1. Nueva funcionalidad (feature)

```bash
# Crear rama desde develop
git checkout -b feature/nueva-funcionalidad develop

# Trabajar y hacer commits
git add .
git commit -m "feat: descripción"

# Hacer PR hacia develop
git push -u origin feature/nueva-funcionalidad
```

### 2. Corrección de bug (bugfix)

```bash
# Crear rama desde develop
git checkout -b bugfix/descripcion-bug develop

# Trabajar y hacer commits
git add .
git commit -m "fix: descripción"

# Hacer PR hacia develop
git push -u origin bugfix/descripcion-bug
```

### 3. Release

```bash
# Crear rama de release desde develop
git checkout -b release/v1.0.0 develop

# Hacer ajustes finales, versionar, etc.
# Merge a master y develop
git checkout master
git merge release/v1.0.0
git tag -a v1.0.0 -m "Versión 1.0.0"

git checkout develop
git merge release/v1.0.0

# Eliminar rama de release
git branch -d release/v1.0.0
```

### 4. Hotfix (urgente)

```bash
# Crear rama desde master
git checkout -b hotfix/descripcion-hotfix master

# Corregir y hacer commits
git add .
git commit -m "hotfix: descripción"

# Merge a master y develop
git checkout master
git merge hotfix/descripcion-hotfix
git tag -a v1.0.1 -m "Hotfix"

git checkout develop
git merge hotfix/descripcion-hotfix

# Eliminar rama de hotfix
git branch -d hotfix/descripcion-hotfix
```

---

## Reglas

1. **Nunca hacer push directo a master o develop**
2. **Todas las features/bugfixs deben pasar por PR**
3. **PRs a develop requieren:**
   - Tests pasando (CI verde)
   - Al menos 1 approve
4. **PRs a master requieren:**
   - Tests pasando
   - Code review aprobado
   - Build exitoso

---

## Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización
test: agregar tests
chore: tareas de mantenimiento
```

Ejemplos:

- `feat: add user login`
- `fix: resolve form validation error`
- `docs: update README`
