(function() {
    "use strict";
    var
      input,
      container,

      classSuccess = "success",
      classError = "error",

      formValidator = {
        init: function() {
          this.cacheDom();
          this.bindEvents();
        },
        cacheDom: function() {

          this.contactForm = document.getElementById("contactForm");

          this.formHeader = document.querySelector("#formHeader h1");
          this.formBody = document.getElementById("formBody");
          this.inputContainer = document.getElementsByClassName("inputContainer");

          this.fields = {
            userName: document.getElementById("userName"),
            userEmail: document.getElementById("userEmail"),
            userMessage: document.getElementById("userMessage")
          };
          this.submitBtn = document.getElementById("submitBtn");
        },
        bindEvents: function() {
          var i;

          this.submitBtn.onclick = this.runRules.bind(this);

          for (i in this.fields) {
            if (this.fields.hasOwnProperty(i)) {

              input = this.fields[i];
              container = input.parentElement;

              input.onfocus = this.runRules.bind(this);

              container.onclick = this.resetErrors.bind(this, input);
            }
          }
        },
        runRules: function(evnt) {
          var target = evnt.target,
            type = evnt.type;

          if (target === this.submitBtn) {

            this.preventDefault(evnt);

          } else if (type === "focus") {

            this.resetClassList(target.parentElement);

            this.resetErrors(target);
            return false;
          }

          this.resetClassList();

          this.checkFields();
        },
        preventDefault: function(evnt) {

          evnt.preventDefault();
        },
        checkFields: function() {
          var i,
            validCount = 0,

            filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

          for (i in this.fields) {
            if (this.fields.hasOwnProperty(i)) {
              input = this.fields[i];

              if (input.value === "") {

                this.addClass(input, classError);

              } else if (i === "userEmail" && !filter.test(input.value)) {

                this.addClass(input, classError);
              } else {

                this.addClass(input, classSuccess);
                validCount += 1;
              }
            }
          }

          if (validCount === 3) {

            this.submitForm();
          }
        },
        addClass: function(input, clss) {
          container = input.parentElement;

          if (clss === classError) {

            this.errorMessage(input);
          }

          input.parentElement.classList.add(clss);
        },
        errorMessage: function(input) {
          var message;

          if (input === this.fields.userName) {
            message = "Please enter your name";

          } else if (input === this.fields.userEmail) {
            message = "Please enter a valid email";

          } else if (input === this.fields.userMessage) {
            message = "Please enter your feedback";
          }
          this.renderError(input, message);
        },
        renderError: function(input, message) {
          var html;

          container = input.parentElement;

          html = document.createElement("div");
          html.setAttribute("class", "message");
          html.innerHTML = message;

          if (!container.getElementsByClassName("message")[0]) {

            container.insertBefore(html, container.firstElementChild);
          }
        },
        resetClassList: function(input) {
          var i;

          if (input) {

            container = input.parentElement;

            container.classList.remove(classError, classSuccess);

            input.focus();
          } else {
            for (i in this.fields) {

              this.fields[i].parentElement.classList.remove(classError, classSuccess);
            }
          }
        }
      },
      resetErrors: function(input) {

        container = input.parentElement;

        if (container.classList.contains(classError)) {

          this.resetClassList(input);
        }
      },
      submitForm: function() {
        var waitForAnimation;

        this.contactForm.classList.add(classSuccess);

        this.changeHeader("Sent Succesfully");

        setTimeout(this.changeHeader.bind(this, "Thank you for your feedback"), 1200);
      },
      changeHeader: function(text) {

        this.formHeader.innerHTML = text;
      }
  };

  formValidator.init();
}());
