document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header-burger");
  const closeBtn = document.querySelector(".header-nav__close-btn");
  const header = document.querySelector(".header");
  const phoneInput = document.querySelector("[data-tel-input]");
  const phoneBtn = document.querySelector(".promotions-call__form-btn");
  const $hours = document.querySelector(".time-count__hours");
  const $minutes = document.querySelector(".time-count__minutes");
  const $seconds = document.querySelector(".time-count__seconds");
  const titleHours = document.querySelector("[data-hours]");
  const titleMinutes = document.querySelector("[data-minutes]");
  const titleSeconds = document.querySelector("[data-seconds]");
  const anchors = document.querySelectorAll('a[href*="#"]');
  const faqLinks = document.querySelectorAll(".faq-link");
  const accordionContent = document.querySelectorAll(
    ".faq-accordion-item__content"
  );

  accordionContent.forEach((item) => {
    let header = item.querySelector("header");
    header.addEventListener("click", () => {
      item.classList.toggle("active");
      let description = item.querySelector(".faq-accordion-item__panel");
      if (item.classList.contains("active")) {
        description.style.height = `${description.scrollHeight}px`;
        item.querySelector(".faq-accordion-item__icon").src =
          "../images/minus.svg";
        item
          .querySelector(".faq-accordion-item__icon")
          .classList.remove("faq-accordion-item__icon");
      } else {
        description.style.height = "0px";
        item.querySelector("img").classList.add("faq-accordion-item__icon");
        item.querySelector(".faq-accordion-item__icon").src =
          "../images/faq-plus.svg";
      }
    });
  });

  faqLinks.forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".active")?.classList.remove("active");
      link.classList.add("active");
    })
  );

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute("href").substring(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  const addClassHandler = (selector, classname = "open") =>
    selector.classList.add(classname);

  const removeClassHandler = (selector, classname = "open") =>
    selector.classList.remove(classname);

  const getInputNumbers = (input) => input.value.replace(/\D/g, "");

  const onPhoneInput = (e) => {
    let input = e.target,
      inputNumbersValue = getInputNumbers(input),
      formattedInputValue = "",
      selectionStart = input.selectionStart;

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (!inputNumbersValue) input.value = "";

    if (["7", "8", "9"].includes(inputNumbersValue[0])) {
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }

      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }

      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    }

    input.value = formattedInputValue;
  };

  const onPhoneKeyDown = (e) => {
    let input = e.target;
    if (e.keyCode == 8 && getInputNumbers(input).length == 1) {
      input.value = "";
    }
  };

  const onPhonePaste = (e) => {
    let pasted = e.clipboardData || window.clipboardData,
      input = e.target,
      inputNumbersValue = getInputNumbers(input);

    if (pasted) {
      let pastedText = pasted.getData("Text");
      if (!/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  };

  const deadline = new Date("2030-03-25 03:00:00 GMT+0300");
  let timerId = null;
  const declensionNum = (num, words) => {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  };

  const timer = () => {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      clearInterval(timerId);
    }

    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    $hours.textContent = hours < 10 ? "0" + hours : hours;
    $minutes.textContent = minutes < 10 ? "0" + minutes : minutes;
    $seconds.textContent = seconds < 10 ? "0" + seconds : seconds;
    titleHours.textContent = declensionNum(hours, ["час", "часа", "часов"]);
    titleMinutes.textContent = declensionNum(minutes, [
      "минута",
      "минуты",
      "минут",
    ]);
    titleSeconds.textContent = declensionNum(seconds, [
      "секунда",
      "секунды",
      "секунд",
    ]);
  };

  timer();
  timerId = setInterval(timer, 1000);

  burger.addEventListener("click", () => addClassHandler(header));

  closeBtn.addEventListener("click", () => removeClassHandler(header));

  phoneInput.addEventListener("input", onPhoneInput);
  phoneInput.addEventListener("keydown", onPhoneKeyDown);
  phoneInput.addEventListener("paste", onPhonePaste);

  phoneBtn.addEventListener("click", () => {
    let input = phoneInput.value.replace(/[^0-9]/g, "");
    window.open(`https://tipcash.ge/app/signup?phone=${input}`);
  });
});
