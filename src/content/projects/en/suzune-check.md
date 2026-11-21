---
# Project page: suzune_check (Linux security audit tool)
# The file name (suzune-check) sets the URL: /en/projets/suzune-check/
title: suzune_check
kind: tool
description: Automated Linux security audit built with Ansible, inspired by ANSSI guidelines. Read-only checks and a scored JSON report.
icon: ◆
tags: [Ansible, Linux, Security audit, ANSSI, JSON, GitHub Actions CI]
status: stable
repo: https://github.com/Giremuu/suzune_check
date: 2026-05-01
---

## The project

**suzune_check** is a security audit tool for Linux servers (Debian and Ubuntu), built with Ansible
and inspired by the French cybersecurity agency (**ANSSI**) best practices.

It reviews each host's configuration **read-only**, without changing anything, and produces a
**JSON report** per host, with an overall score and remediation guidance.

## What it checks

- **SSH**: root login disabled, key-based authentication only, protocol 2
- **Firewall**: UFW, firewalld or nftables active
- **Accounts and passwords**: empty passwords, expiration policy, sudo, locked root account
- **Updates**: pending packages, `unattended-upgrades`, uptime
- **Network and files**: listening ports, Telnet, IPv6, world-writable files
- **Web server** (optional): Apache / Nginx, HTTP / HTTPS exposure, version disclosure
- **Database** (optional): MariaDB / MySQL / PostgreSQL, exposed ports

Each check group has its own Ansible **tag**: run the full audit or only part of it
(`--tags ssh,firewall`).

## The report

For each host, a `security_audit_<host>_<date>.json` file contains:

- a summary (number of OK / WARN / FAIL / INFO checks);
- an overall score and rating (EXCELLENT, GOOD, FAIR, POOR);
- every check in detail, with the collected evidence and the recommended fix.

## Good practices

- **Secrets** stored per host with **Ansible Vault**, never committed
- **Configurable thresholds** (password expiration, uptime, audit profile) in the role defaults
- GitHub Actions **CI**: `yamllint`, `ansible-lint` and a syntax check on every push
- Code organised as a reusable **Ansible role**, one file per check group
- **MIT** license
