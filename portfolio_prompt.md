# Prompt à coller dans Claude (dans le repo cloné du portfolio)

---

Je viens de terminer un stage de fin d'année (ENSIL-ENSCI, 4ème année Mécatronique) au DIMEAS, Politecnico di Torino (Italie), sous la supervision du Prof. Fausto Francesco Lizzio et de la Prof. Elisa Capello. Je veux mettre à jour mon portfolio pour refléter ce qui a **réellement été livré et validé** pendant ce stage, avec de vrais chiffres, et préparer le terrain pour chercher un nouveau stage/opportunité l'année prochaine. Voici tout le contexte factuel nécessaire — n'invente rien au-delà de ce qui est donné ici, et pose-moi des questions si un détail manque plutôt que de deviner.

## Contexte général du projet

Titre du stage : **Risk-Aware MPPI Navigation for a TurtleBot 4** — une chaîne de navigation "consciente du risque" pour robot mobile d'intérieur, qui résout un vrai problème de perception : un LiDAR 2D standard ne peut pas distinguer un sol mouillé, de la boue, ou un tapis épais d'un sol sec — ce sont des dangers géométriquement plats mais physiquement dangereux. Le projet ajoute une caméra RGB-D et un pipeline de vision pour détecter ces dangers, et un contrôleur de trajectoire qui en tient compte.

## Ce qui a été réellement construit (2 contributions techniques)

**1. Carte de risque à deux couches** (perception) :
- Couche sémantique : un réseau de segmentation (comparaison de 3 backbones testés : SegFormer-B0, DeepLabV3+/MobileNetV2, et **YOLO26** retenu pour le déploiement) transforme chaque pixel caméra en un risque attendu R(p) = Σ r_c · P(c|p)
- Couche géométrique : les obstacles rigides (murs, objets) sont détectés depuis le nuage de points de profondeur (caméra OAK-D Pro RGB-D)
- Les deux couches sont fusionnées (maximum) et accumulées dans une carte de coût persistante en vue de dessus (bird's-eye-view costmap), publiée en temps réel sur ROS 2
- YOLO26 a été retenu car 5-6× plus rapide en inférence CPU que les alternatives (environ 46 FPS vs 7-10 FPS), permettant un déploiement embarqué sans GPU
- Catalogue de dangers avec scores de risque calibrés : sol sec=0, petite marche=0.35, sol mouillé=0.50, boue/tapis épais=0.85, escaliers=1.0 (barrière dure infranchissable)

**2. Contrôleur GPU risk-aware MPPI** (contrôle/planification de trajectoire) :
- Construit sur la bibliothèque MPPI-Generic (Model Predictive Path Integral — un algorithme de commande prédictive stochastique par échantillonnage massif de trajectoires sur GPU, PAS un "Model Context Protocol")
- Fonction de coût personnalisée en CUDA qui échantillonne la carte de risque comme une texture GPU
- Un unique paramètre (λ_risk) permet de régler le comportement du robot, du "risque-aveugle" (comme un MPPI standard) au "fortement risque-averse"
- 5120 trajectoires simulées en parallèle par cycle de décision, à 14 Hz, sur un horizon de planification de ~14 secondes (~4.3 mètres de profondeur de vision)

## Contribution scientifique/mathématique (le point le plus fort à mettre en avant)

Au-delà de l'implémentation, le stage a produit un **modèle quantitatif explicite** du comportement du contrôleur : un calcul d'arbitrage de coût qui prédit, pour un danger et une géométrie donnés, le seuil exact de λ_risk auquel le robot bascule de "traverser le danger" à "faire un détour pour l'éviter". Ce modèle a été :
1. Dérivé analytiquement depuis la formule de coût du contrôleur
2. Testé contre des mesures réelles (le modèle initial sous-estimait le seuil d'un ordre de grandeur)
3. Corrigé en identifiant le facteur manquant (le poids de distance à l'objectif du contrôleur)
4. Revalidé : le modèle corrigé prédit le bon ordre de grandeur du seuil mesuré
5. Honnêtement discuté avec ses limites restantes (un écart résiduel de 40-60%, et une inversion contre-intuitive proche/loin attribuée à la troncature de l'horizon de planification)

C'est une vraie démarche de modélisation scientifique (hypothèse → test → correction → revalidation → discussion des limites), pas juste du réglage empirique par essai-erreur. Un relecteur externe a spécifiquement souligné cette contribution comme le point fort du travail.

## Résultats expérimentaux chiffrés (à utiliser dans le portfolio, ce sont de vraies mesures)

Sur deux scénarios contrôlés, comparer le MPPI standard (λ_risk=0) au MPPI risk-aware réglé :
- **Traversée forcée mur-à-mur** ("barrier") : réduction de **44%** de l'exposition au risque réel (de 3.43 à 1.93), pour un surcoût de seulement 2-6% en distance et en temps
- **Zone évitable en champ ouvert** ("cross_or_detour") : réduction de **100%** de l'exposition au risque (le robot évite entièrement la zone dangereuse en faisant un léger détour), pour un surcoût de seulement 2-9%
- Identification d'un régime de λ_risk trop élevé où plus de prudence n'apporte plus aucun bénéfice de sécurité supplémentaire, et déstabilise au contraire le contrôleur dans une hésitation indéfinie (le robot tourne en rond sans jamais avancer) — un phénomène de blocage documenté et expliqué par le modèle théorique

## Démonstration sur robot réel

Le contrôleur a été démontré sur un **TurtleBot 4 physique** : piloté par une carte de risque "vérité terrain" injectée directement (pas de caméra pour cette démo précise), le robot navigue réellement dans une pièce en évitant des obstacles qui n'existent que virtuellement dans la carte de coût — une façon contrôlée, reproductible et sans danger matériel de valider le comportement d'évitement de risque sur du vrai hardware.

L'intégration complète (perception embarquée par caméra + contrôle, les deux sur le robot réel simultanément) a été tentée (architecture "ghost-twin" avec un jumeau numérique Gazebo téléporté en temps réel) mais n'a pas abouti dans le temps du stage à cause de problèmes de fiabilité réseau (DDS) entre le robot réel et la simulation — c'est explicitement noté comme le prochain travail à faire.

## Stack technique complet

ROS 2 Jazzy, Gazebo Harmonic, C++/CUDA (contrôleur), Python (perception, simulation, scripts d'évaluation), PyTorch (entraînement), MPPI-Generic (bibliothèque GPU), TurtleBot 4 (base iRobot Create 3, caméra OAK-D Pro RGB-D, LiDAR RPLIDAR A1, Raspberry Pi 4).

## Dates et affiliation exactes

- Institution d'accueil : DIMEAS, Politecnico di Torino (Italie)
- Superviseurs : Prof. Fausto Francesco Lizzio, Prof. Elisa Capello
- École : ENSIL-ENSCI (Université de Limoges), 4ème année Mécatronique
- [DEMANDE-MOI les dates exactes de début/fin si tu ne les as pas déjà dans le portfolio — je ne les ai pas confirmées dans ce prompt]

## Ce que je te demande de faire dans le portfolio

### 1. Réécrire la section "P/01 — MPPI sémantique au Politecnico di Torino"
Remplace la description actuelle (qui décrit l'objectif de départ, formulé avant que le travail soit fait) par ce qui a été **réellement livré et mesuré** : les deux couches de la carte de risque, le contrôleur GPU MPPI, le modèle d'arbitrage de coût (en insistant sur la démarche scientifique dérive→test→correction→revalidation, c'est le point le plus différenciant), les chiffres réels (44%/100% de réduction de risque), et la démo robot réel. Garde le format à puces existant du site si c'est la convention pour les autres projets. Le titre peut évoluer si "MPPI sémantique" ne rend plus justice à l'ampleur du travail (perception ET contrôle ET modélisation) — propose une meilleure formulation courte si pertinent, mais garde un ton cohérent avec les autres titres de projets du site (ex: "Navigation autonome d'un UGV").

### 2. Mettre à jour la section "Expérience professionnelle"
L'entrée actuelle dit "Mai-Juillet 2026 — Stagiaire R&D Politecnico di Torino" et semble formulée comme en cours/futur. Passe-la au passé (le stage est terminé) avec un résumé cohérent avec la nouvelle description du projet ci-dessus — pas besoin de répéter tous les détails techniques (déjà dans la section Projets), mais donne le contexte professionnel : rôle, encadrement, contribution principale en une phrase.

### 3. Revoir le message "recherche de stage"
Le portfolio dit actuellement chercher "un stage de fin d'études (mars – septembre 2027)". Vérifie si ce message a encore du sens maintenant que ce stage-ci est terminé, et ajuste-le si besoin pour refléter :
- Que ce stage en robotique/perception/contrôle est un point fort concret à mettre en avant dans toute candidature à venir
- [DEMANDE-MOI si tu veux rester dans le même domaine (robotique/perception/MPPI) pour le prochain stage, ou élargir/pivoter — je n'ai pas cette information]

### Contraintes de style à respecter
- Garde le ton narratif et personnel déjà présent sur le site (comparable au style utilisé pour le projet "véhicule autonome" : progression honnête, pas de jargon creux)
- Reste factuel : n'invente aucun chiffre au-delà de ceux donnés ici, et si une info manque pour compléter une phrase, demande-la-moi plutôt que d'inventer
- Ne mentionne jamais MPPI comme "Model Context Protocol" — c'est un algorithme de commande prédictive stochastique (Model Predictive Path Integral), aucun rapport avec le protocole MCP des LLM
- Le texte visible du site reste en français (le code/les commentaires peuvent rester en anglais si c'est déjà la convention du repo)
