var listService = (function(){
  //достать значения из localStorage
     function ls_get(key){
         return localStorage.getItem(key)
         }


        // видимость блоков true-show,false-hide
     function alertShow(elem,message = '',flag = true){
         if(flag){
             if(!elem.classList.contains("show"))  elem.classList.add("show") ;
             if(elem.classList.contains("hide"))  elem.classList.remove("hide");
             if(message.length) { elem.innerHTML = message || ""};
          }else{
              if(elem.classList.contains("show"))  elem.classList.remove("show") ;
              if(!elem.classList.contains("hide"))  elem.classList.add("hide") ;
         }

     }
     //-----------ValidateEmail

     function ValidateEmail(mail){
         if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm.test(mail))  {  return (true) };
         return (false)
     }
    return {
         ls_get: ls_get,
         alertShow: alertShow,
         ValidateEmail: ValidateEmail
          }
}())
