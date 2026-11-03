const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
if(menuButton&&navigation){menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');navigation.classList.toggle('is-open',open)});navigation.addEventListener('click',event=>{if(event.target.closest('a')){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');navigation.classList.remove('is-open')}})}
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
