---
# Fiche projet : suzune_check (outil d'audit de sécurité Linux)
# Le nom du fichier (suzune-check) donne l'URL : /projets/suzune-check/
title: suzune_check
kind: tool
description: Audit de sécurité Linux automatisé avec Ansible, inspiré des recommandations ANSSI. Contrôles en lecture seule et rapport JSON avec score.
icon: ◆
tags: [Ansible, Linux, Audit sécurité, ANSSI, JSON, CI GitHub Actions]
status: stable
repo: https://github.com/Giremuu/suzune_check
date: 2026-05-01
---

## Le projet

**suzune_check** est un outil d'audit de sécurité pour serveurs Linux (Debian et Ubuntu), construit
avec Ansible et inspiré des bonnes pratiques de l'**ANSSI**.

Il passe en revue la configuration des machines **en lecture seule**, sans rien modifier, puis produit
un **rapport JSON** par hôte, avec un score global et des conseils de remédiation.

## Ce qui est contrôlé

- **SSH** : connexion root désactivée, authentification par clé uniquement, protocole 2
- **Pare-feu** : UFW, firewalld ou nftables actif
- **Comptes et mots de passe** : mots de passe vides, politique d'expiration, sudo, compte root verrouillé
- **Mises à jour** : paquets en attente, `unattended-upgrades`, durée d'uptime
- **Réseau et fichiers** : ports en écoute, Telnet, IPv6, fichiers modifiables par tous
- **Serveur web** (optionnel) : Apache / Nginx, exposition HTTP / HTTPS, divulgation de version
- **Base de données** (optionnel) : MariaDB / MySQL / PostgreSQL, ports exposés

Chaque groupe de contrôles a son **tag** Ansible : on peut lancer tout l'audit ou seulement une partie
(`--tags ssh,firewall`).

## Le rapport

Pour chaque machine, un fichier `security_audit_<hôte>_<date>.json` contient :

- un résumé (nombre de contrôles OK / WARN / FAIL / INFO) ;
- un score global et une note (EXCELLENT, GOOD, FAIR, POOR) ;
- le détail de chaque contrôle, avec la preuve relevée et la remédiation conseillée.

## Bonnes pratiques mises en place

- **Secrets** stockés par hôte avec **Ansible Vault**, jamais commités
- **Seuils configurables** (expiration des mots de passe, uptime, profil d'audit) dans les valeurs par défaut du rôle
- **Intégration continue** GitHub Actions : `yamllint`, `ansible-lint` et vérification de syntaxe à chaque push
- Code organisé en **rôle Ansible** réutilisable, un fichier par groupe de contrôles
- Licence **MIT**
