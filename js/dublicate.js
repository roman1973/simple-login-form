let  BasicList = function () {
    this.alertblock = document.querySelector(".alert");          //окно сообщений
    this.signblock = document.getElementById("sign");          //страница регистрации
    this.emailInput = document.getElementById("inputEmail");     // поле ввода email  Input
    this.chekInput = document.getElementById("chb");             //checkbox Remember me
    this.butSubmit = document.getElementById("butsub");          //кнопка submit Sign in
    this.inform = document.getElementById("inform");             //блок информации о пользователе
    this.formblock = document.querySelector('.form-signin');     // форма
    this.passwordInput = document.getElementById("inputPassword");//поле ввода пароля
    this.informEmail = document.getElementById("informEmail");    //поле вывода email
    this.informpas = document.getElementById("informPassword");   //поле вывода пароля
    this.informpasbutton = document.getElementById("informpas");  //кнопка показать\СПРЯТАТЬ пароль
    this.backbutton = document.getElementById("informbut");         //кнопка назад
};

BasicList.prototype = {

	initListenerssign : function (){
     this.emailInput.addEventListener('change', this.changeInput.bind(this));
     this.passwordInput.addEventListener('change', this.changeInput.bind(this));
     this.formblock.addEventListener('submit', this.submitInput.bind(this));
     this.informpasbutton.addEventListener('click', this.informpasbut.bind(this));
     this.backbutton.addEventListener('click', this.backsign.bind(this));
   },

   backsign : function (){                         //------------кнопка назад
       listService.alertShow(this.signblock);
       listService.alertShow(this.inform,'',false);
               //---------очистка формы
       this.formblock.submit();
       this.prepareform(false);
   },
    submitInput: function(event){                //--------------submit
       event.preventDefault();
       if(listService.ls_get('login') != this.emailInput.value.trim()){
          listService.alertShow(this.alertblock,'Email mismatch.Enter exist email');
          this.emailInput.focus();
          this.emailInput.value = '';
          this.passwordInput.disabled = true;
          this.chekInput.disabled = true;
          this.butSubmit.disabled = false;
          return;
       }else if (listService.ls_get('parol') != this.passwordInput.value.trim()) {
            listService.alertShow(this.alertblock,'Parol mismatch.Enter exist parol');
            this.passwordInput.focus();
            this.passwordInput.value = '';
            this.chekInput.disabled = true;
            this.butSubmit.disabled = true;
            return;
               }else{
                   listService.alertShow(this.signblock,'',false);
                   listService.alertShow(this.inform);
                   this.informEmail.value = listService.ls_get('login');
                   this.informpas.value = listService.ls_get('parol').replace(/./g,'*');

               }
     },
    informpasbut: function(event){     //---------------show Parol
       if(/\*/.test(this.informpas.value )){
           this.informpas.value = listService.ls_get('parol');
           event.target.innerHTML = 'Спрятать пароль';
       }else{
           this.informpas.value = listService.ls_get('parol').replace(/./g,'*');
           event.target.innerHTML = 'Показать пароль';
       }
     },
    changeInput: function(event){     //--------------валидация полей ввода
         switch (event.target.id) {
            case 'inputEmail':
               if(event.target.value.trim().length === 0){
                   listService.alertShow(this.alertblock,'Enter login');
                }else if(!listService.ValidateEmail(event.target.value)){
                     listService.alertShow(this.alertblock,"You have entered an invalid email address!");
                   }else{
                       this.passwordInput.disabled = false;
                       listService.alertShow(this.alertblock,'',false);
                       this.passwordInput.focus();

                   }
             break;
           case "inputPassword":
               if(event.target.value.trim().length === 0){
                   listService.alertShow(this.alertblock,'Enter pasword');
                }else if(event.target.value.trim().length < 8){
                    listService.alertShow(this.alertblock,"Длина пароля должна быть неменее 8 символов!");
                  } else if (!/\d/.test(event.target.value)) {
                      listService.alertShow(this.alertblock," Пароль должен содержать хотя б одну цыфру!");
                    }else{
                        this.chekInput.disabled = false;
                        this.butSubmit.disabled = false;
                        listService.alertShow(this.alertblock,'',false);
                   }
            break;
        }
    },
    prepareform: function(flag){
      if(flag){
        this.passwordInput.disabled = true;
        this.chekInput.disabled = true;
        this.butSubmit.disabled = true;
        listService.alertShow(this.alertblock,'',false); //--спрятать окно сообщений
        listService.alertShow(this.inform,'',false); //--спрятать блок информации о пользователе
      }else{
        this.passwordInput.disabled = true;
        this.chekInput.disabled = true;
        this.butSubmit.disabled = true;
      }
  },
   initComponent: function(){
       this.initListenerssign();
       this.prepareform(true);

   }
};
let basicList = new BasicList();
 basicList.initComponent();
