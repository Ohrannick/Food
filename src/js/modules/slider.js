function slider() {
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

  const deleteNotDigits = (str) => {
    return +str.replace(/\D/g, "");
  };

  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      slideIndex++;
      offset += deleteNotDigits(width);
    }
    getMovieOpacity(offset, dots, slideIndex);
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
      slideIndex = +slides.length;
    } else {
      offset -= deleteNotDigits(width);
      slideIndex--;
    }
    getMovieOpacity(offset, dots, slideIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
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
}

module.exports = slider;
