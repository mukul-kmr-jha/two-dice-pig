var scores,activePlayer,total ,isPlaying;

function init(){
  
  scores=[0,0,0];
  activePlayer=1; 
  total=0;
  isPlaying=1;

  document.querySelector('.player__score-glb--1').textContent="0";
  document.querySelector('.player__score-glb--2').textContent="0";
  document.querySelector('.current-score--1').textContent="0";
  document.querySelector('.current-score--2').textContent="0";

  //remove the active class from players and set it to 1st player back again
  document.querySelector('.player--1').classList.remove('active-back');
  document.querySelector('#dot--1').classList.remove('active');
  document.querySelector('.player--1').classList.remove('winner');

  document.querySelector('.player--2').classList.remove('active-back');
  document.querySelector('.player--2').classList.remove('winner');
  document.querySelector('#dot--2').classList.remove('active');

  document.querySelector('.player--1').classList.add('active-back');
  document.querySelector('#dot--1').classList.add('active');


}

function nextPlayer(){
      
      activePlayer=activePlayer===1?2:1;
      /* no need to set display to none as i am using an arrow to show turn change
       document.querySelector('.dice-img').style.display="none";
      */
      document.querySelector('.player--1').classList.toggle('active-back');
      document.querySelector('#dot--1').classList.toggle('active');
      document.querySelector('.player--2').classList.toggle('active-back');  
      document.querySelector('#dot--2').classList.toggle('active');
}


init();

document.querySelector('.new-game').addEventListener('click',function(){
  
   init();
   document.querySelector('.player__name--1').textContent="player 1";
   document.querySelector('.player__name--2').textContent="player 2";
            

   console.log("button is clicked");
   // document.querySelector('.player--1').classList.add('active');

});

document.querySelector('.roll-dice').addEventListener('click',function(){
 if(isPlaying){
    //1.generate random number 
    console.log("isPlaying is"+isPlaying);
    var dice1=Math.floor(Math.random()*6)+1;
    var dice2=Math.floor(Math.random()*6)+1;
    console.log("dice1 : " + dice1);
    console.log("dice2 : " + dice2);
    //2. image of dice
    document.querySelector('.dice-img').style.display="block";
    document.querySelector('.dice-img-1').src="./images/dice-"+dice1+".png";
    document.querySelector('.dice-img-2').src="./images/dice-"+dice2+".png";
    //3. update the score
    if(dice1!==1 && dice2!==1)  //checking if dice is not 1 (player changing rule )
    {
         total+=dice1+dice2;
         if(total+scores[ activePlayer]>=100)
         {
             winnerFunction(total+scores[ activePlayer]);
         }
         document.querySelector('.current-score--'+activePlayer).textContent=total;
    }
    else if(dice1!==1 || dice2!==1)  //checking if dice is not 1 (player changing rule )
    {
      document.querySelector('.dice-img').style.display="block";
      dice1 == 1 ? document.querySelector('.dice-img-1').src="./images/turnChanged"+activePlayer+".png":document.querySelector('.dice-img-2').src="./images/turnChanged"+activePlayer+".png";
      total=0;
      nextPlayer();
    }       
    else 
    {
      document.querySelector('.dice-img').style.display="block";
      document.querySelector('.dice-img').src="./images/turnChanged"+activePlayer+".png";
      total=0;
      scores[activePlayer] =0;
        nextPlayer();
    }
 }

});

document.querySelector('.hold').addEventListener('click',function(){
   if(isPlaying){
    
    scores[activePlayer]+=total;
    // change the ui(global score)
    document.querySelector('.player__score-glb--'+activePlayer).textContent=scores[activePlayer];
    console.log(scores[activePlayer]);
    if(scores[activePlayer]>=100)
    	{
        winnerFunction(scores[activePlayer]);
    	}
   else{
           document.querySelector('.dice-img').style.display="block";
           document.querySelector('.dice-img').src="./images/turnChanged"+activePlayer+".png";
   	       nextPlayer();
       }
    total=0;
  }
});
var winnerFunction=function(score)
{
  
  document.querySelector('.player__name--'+activePlayer).innerHTML="winner!!";
  document.querySelector('.player--'+activePlayer).classList.add('winner');
  console.log("active Player is "+activePlayer);
  document.querySelector('.player__score-glb--'+activePlayer).textContent=score;
  // document.querySelector(".current-score--"+activePlayer).textContent=0;  
  document.querySelector('#dot--'+activePlayer).classList.remove('active');
  document.querySelector('.dice-img-container').style.display="none";

  isPlaying=0;

}






