<!-- <style> <div class="loader1"></div> -->

  <!-- .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    position: fixed;
  left: 550px;
  top: 200px; -->
 
<p>loader 0</p>
<div class="loader"></div>

<style>
p {font-family: 'Montserrat Alternates', sans-serif;font-size:18px; font-weight:700;padding-bottom:20px;color:#FFF;}

.loader {
width:50px;
height:50px;
display:inline-block;
padding:0px;
opacity:0.5;
width: 120px;
    height: 120px;
    position: fixed;
  left: 550px;
  top: 200px;
border:3px solid #09acfd;
-webkit-animation: loader 1s ease-in-out infinite alternate;
animation: loader 1s ease-in-out infinite alternate;
}

.loader:before {
content: " ";
position: absolute;
z-index: -1;
top: 5px;
left: 5px;
right: 5px;
bottom: 5px;
border: 3px solid #09acfd;

}

.loader:after {
content: " ";
position: absolute;
z-index: -1;
top: 15px;
left: 15px;
right: 15px;
bottom: 15px;
border: 3px solid #09acfd;
}

@keyframes loader {
from {transform: rotate(0deg) scale(1,1);border-radius:0px;}
to {transform: rotate(360deg) scale(0, 0);border-radius:50px;}
}
@-webkit-keyframes loader {
from {-webkit-transform: rotate(0deg) scale(1, 1);border-radius:0px;}
to {-webkit-transform: rotate(360deg) scale(0,0 );border-radius:50px;}
}

</style>