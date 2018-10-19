let alertblock = document.querySelector(".alert"),          //окно сообщений
    signblock = document.getElementById("sign"),            //страница регистрации
    emailInput = document.getElementById("inputEmail"),     // поле ввода email  Input
    chekInput = document.getElementById("chb"),             //checkbox Remember me
    butSubmit = document.getElementById("butsub"),          //кнопка submit Sign in
    inform = document.getElementById("inform"),             //блок информации о пользователе
    formblock = document.querySelector('.form-signin'),     // форма
    passwordInput = document.getElementById("inputPassword"),//поле ввода пароля
    informEmail = document.getElementById("informEmail"),    //поле вывода email
    informpas = document.getElementById("informPassword"),   //поле вывода пароля
    informpasbutton = document.getElementById("informpas"),  //кнопка показать\СПРЯТАТЬ пароль
    backbutton = document.getElementById("informbut");         //кнопка назад


    //------подготовка формы

        passwordInput.disabled = true;
        chekInput.disabled = true;
        butSubmit.disabled = true;


    // видимость блоков true-show,false-hide
function alertShow(elem,message,flag = true){
    if(flag){
      if(!elem.classList.contains("show"))  elem.classList.add("show") ;
      if(elem.classList.contains("hide"))  elem.classList.remove("hide") ;
    if(elem == alertblock) { elem.innerHTML = message};
    }else{
      if(elem.classList.contains("show"))  elem.classList.remove("show") ;
      if(!elem.classList.contains("hide"))  elem.classList.add("hide") ;
    }

}

    //-----------ValidateEmail

    function ValidateEmail(mail)
    {
     if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm.test(mail))
      {
        return (true)
      }

        return (false)
    }
    //------------кнопка назад
     function backsign(){
       alertShow(signblock);
       alertShow(inform,'',false);
       informpasbutton.removeEventListener('click', informpasbut);
       backbutton.removeEventListener('click', backsign);
       emailInput.addEventListener('change', changeInput);
       passwordInput.addEventListener('change', changeInput);
       formblock.addEventListener('submit', submitInput);
       //---------очистка формы
       formblock.submit();
       passwordInput.disabled = true;
       chekInput.disabled = true;
       butSubmit.disabled = true;
     }
//--------------submit
let submitInput = function(event){
     event.preventDefault();
     if(ls_get('login') != emailInput.value.trim()){
        alertShow(alertblock,'Email mismatch.Enter exist email');
        emailInput.focus();
        emailInput.value = '';
        passwordInput.disabled = true;
        chekInput.disabled = true;
        butSubmit.disabled = false;return;
     }else if (ls_get('parol') != passwordInput.value.trim()) {
         alertShow(alertblock,'Parol mismatch.Enter exist parol');
         passwordInput.focus();
         passwordInput.value = '';
         chekInput.disabled = true;
         butSubmit.disabled = true;return;
        }else{
          alertShow(signblock,'',false);
          alertShow(inform);
          informEmail.value = ls_get('login');
          informpas.value = ls_get('parol').replace(/./g,'*');
          informpasbutton.addEventListener('click', informpasbut);
          backbutton.addEventListener('click', backsign);
          emailInput.removeEventListener('change', changeInput);
          passwordInput.removeEventListener('change', changeInput);
          formblock.removeEventListener('submit', submitInput);
     }


}
//---------------show Parol
let informpasbut = function(event){
  if(/\*/.test(informpas.value )){
    informpas.value = ls_get('parol');
    this.innerHTML = 'Спрятать пароль';
  }else{
    informpas.value = ls_get('parol').replace(/./g,'*');
    this.innerHTML = 'Показать пароль';
  }
}
//--------------
let changeInput = function(event){
  switch (event.target.id) {
      case 'inputEmail':
         if(this.value.trim().length === 0){
             alertShow(alertblock,'Enter login');


          }else if(!ValidateEmail(this.value)){
              alertShow(alertblock,"You have entered an invalid email address!");

              }else{
                  passwordInput.disabled = false;
                  passwordInput.focus();

                  alertShow(alertblock,'',false);
                   }
          break;
      case "inputPassword":

         if(event.target.value.trim().length === 0){
             alertShow(alertblock,'Enter pasword');


          }else if(event.target.value.trim().length < 8){
              alertShow(alertblock,"Длина пароля должна быть неменее 8 символов!");


            } else if (!/\d/.test(event.target.value)) {
                alertShow(alertblock," Пароль должен содержать хотя б одну цыфру!");



               }else{
                // passwordInput.addEventListener('keypress', changeInput);

                 chekInput.disabled = false;
                 butSubmit.disabled = false;
                  alertShow(alertblock,'',false);
              }
       break;
     }
    }
    alertShow(alertblock,'',false);
    alertShow(inform,'',false);
    emailInput.addEventListener('change', changeInput);
    passwordInput.addEventListener('change', changeInput);
    formblock.addEventListener('submit', submitInput);
  //  formblock.addEventListener('submit', changeInput);
