# Optimisation du ramassage de ballots de foin

## Lecture des fichiers
On lit les fichiers csv avec la librairie `pandas`. Cela permet de les stocker
dans des dataframes qui facilitent l'utilisation des données. On stocke les
dataframes (df) dans un dictionnaire qui a pour clés les noms des fichiers.

## Intervalle d'humidité
Il est possible avant toutes choses de choisir de ne ramasser que les bottes de foin
qui ont une humidité contenue dans un certain intervalle. Pour cela, il suffit
d'utiliser le paramètre `humidite_lim` qui est un tuple `(min, max)`. Si l'on ne
le renseigne pas, toutes les bottes de foin seront prises en compte.

## Création des zones de ballots proches
Le but est de créer des groupes de ballots qui soient proches afin de placer la
remorque près d'eux pour minimiser le temps de chargement de celle ci. Il y aura donc
un cluster par remorque.
Pour créer ces groupes de manière non supervisée, on utilise un algorithme de clustering.
Le clustering a pour but de rassembler des individus selon les attributs (colonnes) qu'on lui donne.
Ici, nous conservons uniquement la longitude et la latitude.

La fonction utilisée est `kmeans` et provient de la librairie `sklearn`. Elle nécessite qu'on lui dise combien de clusters former.
Nous avons choisi de prendre l'arrondi supérieur du nombre de ballots sur le nombre maximum
de ballots par remorque afin d'utiliser un minimum de remorques. C'est à dire
qu'on minimise le nombre d'allers retours entre le champ et l'entrepot.
On s'assure également que le nombre maximum de ballots par remorque n'est jamais dépassé.
Cela est fait grâce au paramètre `size_max` qui définit le nombre maximal d'individus
par cluster.
Les autres paramètres concernent le fonctionnement interne de la fonction et ne sont
pas très importants.


## Emplacement des remorques
Une fois les groupes formés, il est facile de connaitre la position idéale pour la
remorque pour chaque groupe. En effet, la fonction kmeans renvoie les centres de chaque
cluster. Le centre d'un cluster est le point qui minimise la somme des distances
avec tous les points du cluster. On obtient donc dans la variable `centers` un
dataframe qui contient les longitudes et latitudes de chaque centre de chaque cluster.


## Ordre de ramassage des ballots
Le but est de savoir quel est l'ordre le plus optimisé pour ramasser les ballots
afin d'être le plus rapide possible sachant que le chargeur peut prendre un certain
nombre de ballots à la fois. Le travail va donc se faire sur les clusters précédents
car on cherche à remplir une remorque à la fois.

Nous avons choisi de réaliser un nouveau clustering afin de regrouper les ballots
les plus proches pour les ramasser en même temps avec le chargeur. Ainsi, le nombre de
clusters souhaité est l'arrondi supérieur du nombre de ballots sur le nombre maximal
de ballot par chargeur. Et le nombre maximal d'individus par cluster est défini de
la même façon que précédemment. Les variables utilisées pour ce clustering ont en
général le même nom que pour le premier, suivi du suffixe `_camion`.

## Exportation des fichiers
Pour l'affichage sur l'application web, on exporte les fichiers csv des ballots
avec leur latitude, leur longitude, le cluster et le sous-cluster auquel ils appartiennent. Ils sont
dans le dossier `cluster` et ont pour nom le nom du jeu de données lu suivi de `_ss_cl`.

De même on exporte les centres des clusters (issus du 1etr clutering) avec les même colonnes. Ce fichier
contient donc autant de lignes que de nombre de clusters dans ce clustering. Il correspond aux coordonnées des remorques.
Ils sont aussi dans le dossier `cluster` et leur préfixe est `_centers`.

# Librairies utilisées
- `pandas` qui permet de lire les jeux de données, de les stocker sous forme de dataframes
et de les manipuler facilement.
- `sklearn` qui permet de faire le clustering

# Autres commentaires
Le code propre est situé dans le fichier `clustering_clean.ipynb`. Mais la version étape
par étape qui montre le processus de codage et de reflexion est dans le fichier
`clustering.ipynb`. On y trouve des affichages intermédiaires qui permettent de
comprendre l'utilité de chaque variable.
