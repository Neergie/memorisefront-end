# Memorise - Gestion de Livres

Bienvenue dans Memorise, une application web de gestion de livres qui permet aux utilisateurs de rechercher, ajouter, et acheter des livres.

## Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)


## Aperçu

Memorise est une application web de gestion de livres construite avec React et Symfony. Elle permet aux utilisateurs de rechercher des livres, d'ajouter de nouveaux livres, de consulter les détails des livres, de gérer un panier d'achat et de passer des commandes.

## Fonctionnalités

- **Recherche de livres** : Permet aux utilisateurs de rechercher des livres par titre.
- **Ajout de livres** : Les administrateurs peuvent ajouter de nouveaux livres via un formulaire.
- **Détails des livres** : Les utilisateurs peuvent consulter les détails des livres.
- **Gestion du panier** : Les utilisateurs peuvent ajouter des livres à leur panier, consulter leur panier et passer des commandes.
- **Historique des commandes** : Les utilisateurs peuvent consulter l'historique de leurs commandes.
- **Authentification** : Système de connexion et d'inscription pour les utilisateurs.

## Technologies utilisées

### Frontend

- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- **React Router** : Bibliothèque pour la gestion de la navigation dans l'application.
- **Axios** : Bibliothèque pour faire des requêtes HTTP.
- **CSS** : Pour le stylisme de l'application.

### Backend

- **Symfony** : Framework PHP pour construire l'API.
- **Doctrine ORM** : Outil de mappage objet-relationnel pour PHP.
- **JWT (JSON Web Tokens)** : Pour l'authentification des utilisateurs.

## Installation
`composer install` Pour installer toutes les dépendances 

`php bin/console lexik:jwt:generate-keypair` Pour générer le dossier jwt (clé ssl)

`symfony server:start` pour lancer le backend

`npm start` pour lancer le front end

### Prérequis

- **Node.js** (version 14 ou supérieure)
- **npm** (version 6 ou supérieure)
- **PHP** (version 7.4 ou supérieure)
- **Composer** (version 2 ou supérieure)
- **Symfony CLI**



