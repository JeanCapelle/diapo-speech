<template>
<div>
  <section class="star-wars">

  <div class="crawl">
    
    <div class="title">
      <h1>Merci à vous</h1>
    </div>
    
    <p> Je souhaite adresser mes remerciements aux personnes qui m’ont accompagné dans la rédaction de cette thèse ainsi que les personnes qui m’ont permis
de la rédiger.
Tout d’abord, je souhaite remercier Yann NICODEME, CEO de la société qui
m’a accompagnée dans le choix du sujet à aborder dans cette thèse professionnelle ainsi que toute l’équipe de Switfi pour leur accompagnement ainsi que
leur bienveillance.</p>
<p>
Je souhaite adresser mes remerciements à l’ensemble des répondants à
mes demandes d’interviews. Tel que Antonin BARTHÉLEMY, Sèverine OLIVIER et Patrick
Meyer, qui m’ont permis d’apporter une réelle vision technique et opérationnelle au
sujet ainsi que de soulever les hypothèses auxquelles j’ai pu être confronté. Je
tiens également à souligner l’importance de mes échanges avec Gilles VEIRA,
qui a répondu à toutes mes questions après sa conférence tenu lors d’un Meetup
sur les chatbots.</p>
<p>Je tiens également à remercier ma mère, Marie-Noëlle CAPELLE et ma soeur
Julie CAPELLE, mon ami Nicolas DERRIEN (un parfait homonyme du chargé d’affaire du CESI) et Magali RAYNARD pour leurs relectures et l’expression de leurs
ressentis avant le rendu.</p>
Pour finir, je tiens à remercier l’ensemble du personnel du CESI de Montpellier pour m’avoir
<p>
permis de rédiger cette thèse, tout particulièrement Jean-Pierre HAUGEMAT pour son
accompagnement pédagogique durant mes travaux de recherches. Je remercie
également quelques intervenants du CESI comme Marion GASNE pour son aide
à la création du préambule en anglais.</p>

  </div>

</section>
</div>
</template>

<script>
    export default {
        props: ['myProp'],
        mounted() {
            console.log(this.myProp); // foobar
        }
    };
</script>
<style>
body {
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}

.fade {
  position: relative;
  width: 100%;
  min-height: 60vh;
  top: -250px;
  background-image: linear-gradient(0deg, transparent, black 75%);
  z-index: 1;
}

.star-wars {
  position: fixed;
  z-index: 5;
  display: flex;
  justify-content: center;
  position: relative;
  height: 800px;
  color: #feda4a;
  font-family: 'Pathway Gothic One', sans-serif;
  font-size: 500%;
  font-weight: 600;
  letter-spacing: 6px;
  line-height: 150%;
  perspective: 400px;
  text-align: justify;
}

.crawl {
  position: relative;
  top: 9999px;
  transform-origin: 50% 100%;
  animation: crawl 60s linear;
}

.crawl > .title {
  font-size: 90%;
  text-align: center;
}

.crawl > .title h1 {
  margin: 0 0 100px;
  text-transform: uppercase;
}

@keyframes crawl {
  0% {
    top: 0;
    transform: rotateX(20deg)  translateZ(0);
  }
  100% { 
    top: -6000px;
    transform: rotateX(25deg) translateZ(-2500px);
  }
}
</style>
