# TP Movies

Aujourd'hui, nous allons faire un tp fetch en y intégrant l'HTML/CSS/JS (bien sur 😉)

Ce que je vous propose (mais qu'implicitement nous allons faire), c'est de faire les étapes suivantes :

1. On commence par l'HTML

C'est-à-dire, que nous allons commencer à faire le squelette de notre application web.
Sur VSCode, on connait le petit raccourcie !

2. On le met en forme avec le CSS

Ensuite, je vous conseille de faire la création de votre élément principal, pour moi, c'était une carte comme ça que j'ai dupliqué :

![img](img/exemple.png)

⚠️ Vous n'êtes pas obligé de faire comme moi bien sûr ! Faite comme vous voulez, mais ne perdez pas votre temps.

3. On commence la partie JS

Tout d'abord, nous allons nous rendre sur [cette adresse](https://www.themoviedb.org/settings/api) pour la création de notre compte et ainsi, consommer l'api et faire le TP.

Comme dis, précédemment, il faut créer un compte, n'hésitez pas à utiliser votre adresse email, mais si vous ne le souhaitez pas, car après on l'utilise plus, il existe une solution top qui est ['10 minute mail'](https://10minutemail.net/?lang=fr)

Une fois le compte créé et validé, nous pouvons récupérer les datas pour ce TP j'ai utilisé l'endpoint (je vous invite à rechercher sur google si vous voyer pas ce que c'est 😁) suivant :

`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=YOUR_API_KEY"`

Sinon, faite le votre en [visitant le site](https://www.themoviedb.org/documentation/api/discover) !

Idem pour les images, vous allez voir que l'image a un format bizarre, mais la doc est bonne est donc, la réponse si trouve ! (allez, je vous aide >> [ici](https://developers.themoviedb.org/3/getting-started/images))

Ensuite, il faut fetch l'URL ci dessus pour récupérer les informations en JSON. et ensuite, vous devez dupliquer les cartes autant qu'il y a de film !

Maintenant, c'est à vous de jouer !

![meme](https://media1.tenor.com/images/46f6612fa12dfdfeb1c4ac7b4b27ab2b/tenor.gif?itemid=10966551)