window.addEventListener("DOMContentLoaded", () => {
  // Tabs

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  };

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (item === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();

  // Timer
  const deadLine = "2022-04-26";

  const getTimingRemaining = (endTime) => {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24) - 3,
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      t,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const getZero = (num) => {
    return num >= 0 && num < 10 ? `0${num}` : num < 0 ? "00" : num;
  };

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const setClock = (selector, textSelect, endTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000),
      texts = document.querySelector(textSelect),
      text = texts.querySelector("#text");

    updateClock();

    const t = getTimingRemaining(endTime);
    text.innerHTML = `Акция закончи${t.t < 0 ? "лась" : "тся"} <span>
    ${new Date(endTime).getDate()} 
    ${months[new Date(endTime).getMonth()]}</span> в 00:00`;

    function updateClock() {
      let t = getTimingRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.t <= 0) clearInterval(timeInterval);
    }
  };

  setClock(".timer", ".promotion__descr", deadLine);

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") === "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && !modal.classList.contains("hide")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // Create menu_item
  class CreateCards {
    constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.subtitle = subtitle;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.transfer = 76;
      this.parent = document.querySelector(parentSelector);
      this.changeUSARUB();
    }

    changeUSARUB() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.subtitle}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
      </div>
      `;
      // this.parent.append(element);
      this.parent.insertAdjacentElement("afterbegin", element);
    }
  }

  // const getResourse = async (url) => {
  //   const res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Coud not fetch ${url}, status: ${res.status}`);
  //   }

  //   return await res.json();
  // };

  // getResourse("http://localhost:3000/menu")
  // .then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new CreateCards(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new CreateCards(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  // Forms

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    success: "Success",
    failure: "Failure...",
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 2000);
  }

  // ======= slider =========

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    arrows = document.querySelector(".offer__slider-counter"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-wrapper_inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  total.textContent = getZero(slides.length);

  slidesField.style.width = 100 * slides.length + "%";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    dot.style.opacity = i === 0 ? 1 : "";
    indicators.append(dot);
    dots.push(dot);
  }

  const getMovieOpacity = (offset, el, num) => {
    current.textContent = getZero(+num);
    slidesField.style.transform = `translateX(-${offset}px)`;
    el.forEach((dot) => (dot.style.opacity = "0.5"));
    el[num - 1].style.opacity = "1";
  };

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      slideIndex++;
      offset += +width.slice(0, width.length - 2);
    }
    getMovieOpacity(offset, dots, slideIndex);
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
      slideIndex = +slides.length;
    } else {
      offset -= +width.slice(0, width.length - 2);
      slideIndex--;
    }
    getMovieOpacity(offset, dots, slideIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      getMovieOpacity(offset, dots, slideIndex);
    });
  });

  // Слайдер за счет свойств hide в блоках картинок

  // const toggleClass = (el, classArr) => {
  //   for (let i = 0; i < classArr.length; i++) {
  //     el.classList.toggle(classArr[i]);
  //   }
  // };

  // arrows.addEventListener("click", (e) => {
  //   let count = +current.innerHTML;
  //   if (
  //     e.target.classList.contains("offer__slider-prev") ||
  //     e.target.getAttribute("data-left") === ""
  //   ) {
  //     toggleClass(slides[count - 1], ["hide", "fade"]);
  //     count--;
  //     current.textContent =
  //       count < 1 ? getZero((count = slides.length)) : getZero(count);
  //     toggleClass(slides[count - 1], ["hide", "fade"]);
  //   } else if (
  //     e.target.classList.contains("offer__slider-next") ||
  //     e.target.getAttribute("data-right") === ""
  //   ) {
  //     toggleClass(slides[count - 1], ["hide", "fade"]);
  //     count++;
  //     current.textContent =
  //       count > slides.length ? getZero((count = 1)) : getZero(count);
  //     toggleClass(slides[count - 1], ["hide", "fade"]);
  //   }
  // });
});
