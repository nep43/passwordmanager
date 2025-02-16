# Configuration de la base de données avec Prisma et lancement de l'application Electron

## Prérequis

- Node.js (version 14 ou supérieure)
- npm 
- Prisma CLI
- Electron

## Étape 1 : Installer les dépendances

1. Clonez le projet (ou faites un pull si le projet est déjà cloné) :

```bash
git pull https://github.com/nep43/passwordmanager
```

2. Installez les dépendances nécessaires :
```bash
npm install
```

## Étape 2 : Configurer la base de données avec Prisma

1. Assurez-vous que Prisma est installé dans votre projet. Si ce n'est pas le cas, vous pouvez l'installer avec la commande suivante :
```bash
npm install prisma --save-dev
```
3. Si c'est la première fois que vous configurez la base de données, vous pouvez initialiser Prisma avec cette commande :
```bash
npx prisma init
```
4. Modifier le fichier **.env** pour y mettre votre base de données
```bash
DATABASE_URL="mysql://user:password@DATABASEURL/DataBaseName"
```
5. Generer le schéma de la base de données
```bash
npx prisma generate
```
7. Pousser le schéma dans la base de données (ÉCRASERA TOUTES LES DONNÉES SI LA BASE DE DONNÉES N'EST PAS CONFORME AU SCHEMA)
```bash
npx prisma db push
```

## Étape 3 : Lancer l'application Electron
1. Démarrez l'application Electron avec la commande suivante :
```bash
npm start
```
