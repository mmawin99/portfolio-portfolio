function ValidateEmail(input) {

    var validRegex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (input.match(validRegex)) {  
      return true;
    } else {  
      return false;
    }
  
  }
function sendmail() {
    // generate a five digit number for the contact_number variable
    // this.contact_number.value = Math.random() * 100000 | 0;
    // these IDs from the previous steps
    let textLang = {
        'writedown': {
            'en': "Please write all the input fields 📩",
            'th': "กรุญากรอกข้อมูลให้ครบทุกช่อง 📩"
        },
        'success': {
            'en': "Message sent! ✅",
            'th': "ส่งข้อความแล้ว! ✅"
        },
        'error': {
            'en': "Message cann't sent! ❎",
            'th': "ส่งข้อความไม่ได้! ❎"
        },
        'emailError': {
            'en': "Invalid Email",
            "th": "รูปแบบอีเมลล์ไม่ถูกต้อง"
        },
        'maximumReach':{
            'en': "Our email API has reached its monthly quota limit.",
            'th': "API อีเมลล์ของเราใช้โควตาประจำเดือนนี้หมดแล้ว."
        }
    }
    let messageDisplayEleTH = document.querySelector('.contact__content_message_th.message'),
        messageDisplayEleEN = document.querySelector('.contact__content_message_en.message'),
        messageUse, messageLang;
    let step = {
        'contact__form__email': document.getElementById('contact__form__email').value,
        'contact__form__name': document.getElementById('contact__form__name').value,
        'contact__form__header': document.getElementById('contact__form__header').value,
        'contact__form__message': document.getElementById('contact__form__message').value,
        'g-recaptcha-response': grecaptcha.getResponse()
    };
    if (typeof messageDisplayEleEN === 'undefined') {
        messageUse = messageDisplayEleTH
        messageLang = 'th'
    } else {
        messageUse = messageDisplayEleEN
        messageLang = 'en'
    }
    if (step.contact__form__email == '' || step.contact__form__header == '' || step.contact__form__message == '' || step.contact__form__name == '') {
        messageUse.classList.remove('color-blue');
        messageUse.classList.add('color-red');
        messageUse.textContent = textLang.writedown[messageLang]
    } else {
        if(ValidateEmail(step.contact__form__email)){
            emailjs.send('service_mxxcub9', 'template_21ay92b', step, 'sjEccL5Xxwo6NA8La')
                .then(function() {
                    console.log('Successfully Sent!');
                    messageUse.classList.add('color-blue');
                    messageUse.classList.remove('color-red');
                    messageUse.textContent = textLang.success[messageLang]
                    document.getElementById('contact__form__email').value = ''
                    document.getElementById('contact__form__name').value = ''
                    document.getElementById('contact__form__message').value = ''
                    document.getElementById('contact__form__header').value = ''
                    window.location.reload();
                    setTimeout(() => {
                        messageUse.classList.remove('color-red');
                        messageUse.classList.remove('color-blue');
                        messageUse.textContent = '';
                    }, 5000);
                }, function(error) {
                    console.log('Sending Email Failed!', error);
                    messageUse.classList.remove('color-blue');
                    messageUse.classList.add('color-red');
                    messageUse.textContent = textLang.error[messageLang]
                    document.getElementById('contact__form__email').value = ''
                    document.getElementById('contact__form__name').value = ''
                    document.getElementById('contact__form__message').value = ''
                    document.getElementById('contact__form__header').value = ''
                    setTimeout(() => {
                        messageUse.classList.remove('color-red');
                        messageUse.classList.remove('color-blue');
                        messageUse.textContent = '';
                    }, 5000);
                });
        }else{
            messageUse.classList.remove('color-blue');
            messageUse.classList.add('color-red');
            messageUse.textContent = textLang.emailError[messageLang] 
        }
    }
}

document.querySelector("#sendbtn").addEventListener("click", sendmail);