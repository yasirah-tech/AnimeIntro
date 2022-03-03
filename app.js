document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".navbar__menu");
  const navLogo = document.querySelector("#navbar__logo");
  const cardWrapper = document.getElementById("wrapper");
  const animeInfo = document.getElementById("animeInfo");
  const iframe = document.getElementById("video");
  const recommended = document.getElementById("recommendation");
  const top10Ani = document.getElementById("top-10-anime");
  const heroContainer = document.getElementById("hero__container");
  const recommendHolder = document.getElementById("recommendWrapper");
  const searchHolder = document.getElementById("searchWrapper");
  const animeInput = document.getElementById("anime-name");
  const animeSubmitButton = document.getElementById("anime-submit");
  // Display Mobile Menu
  const mobileMenu = () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  };

  animeSubmitButton.addEventListener("click", (e) => {
    // console.log(stringed)
    // animeInputValue.value = " "
    e.preventDefault();
    const animeInputValue = document
      .getElementById("anime-name")
      .value.replace(/\s/g, "");
    console.log(animeInputValue);
    cardWrapper.style.display = "none";
    searchHolder.style.display = "flex"
    top10Ani.innerHTML = "YOUR SEARCH RESULTS ARE:";
    // DELETE AFTER
    let url = `https://api.jikan.moe/v4/anime?q=${animeInputValue}`;
    console.log(url, "url-look");
    // DELETE AFTER
    fetch(`https://api.jikan.moe/v4/anime?q=${animeInputValue}`)
      .then((response) => response.json())
      .then((results) => {
        for (let i = 0; i < results.data.length; i++) {
          let anime = results.data[i];
          // console.log(anime, "anime names")
          let cardDetails = document.createElement("div");
            let title = document.createElement("h3");
            title.innerHTML = `${anime.title}`;
            let img = document.createElement("img");
            img.src = `${anime.images.jpg.large_image_url}`;
            let button = document.createElement("button");
            button.type = button;
            let anchor = document.createElement("a");
            button.innerHTML = "LEARN MORE";
            img.className = "img-size";
            cardDetails.append(img);
            cardDetails.append(title);
            anchor.append(button);
            cardDetails.append(anchor);
            cardDetails.style.margin = "10px";
            searchHolder.append(cardDetails);
            button.addEventListener("click", () => {
              anchor.target = "blank";
              anchor.href = anime.url;
        })
        }
      });
  });

  let top10 = true;
  if (top10) {
    recommendHolder.style.display = "none";
  }

  menu.addEventListener("click", mobileMenu);

  animeInput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.code === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      console.log("hi");
      // Trigger the button element with a click
      document.getElementById("myBtn").click();
    }
  });

  fetch(`https://api.jikan.moe/v4/top/anime`)
    .then((response) => response.json())
    .then((results) => {
      for (let i = 0; i < 10; i++) {
        let anime = results.data[i];
        let cardDetails = document.createElement("div");
        let title = document.createElement("h5");
        title.innerHTML = `${anime.title}`;
        let img = document.createElement("img");
        img.src = `${anime.images.jpg.large_image_url}`;
        let para = document.createElement("p");
        para.innerHTML = `${anime.synopsis}`;
        let button = document.createElement("button");
        button.type = button;
        let anchor = document.createElement("a");
        button.innerHTML = "LEARN MORE";
        img.className = "img-size";
        cardDetails.append(title);
        cardDetails.append(img);
        cardDetails.append(para);
        anchor.append(button);
        cardDetails.append(anchor);
        cardDetails.style.margin = "10px";
        cardWrapper.append(cardDetails);
        button.addEventListener("click", () => {
          let animeName = document.getElementById("learMore-of-anime");
          let animeSynopsis = document.getElementById("anime-clicked-synopsis");
          animeInfo.style.display = "block";
          anchor.href = "#anime-clicked-synopsis";
          animeName.innerHTML = anime.title;
          animeSynopsis.innerHTML = anime.synopsis;
          iframe.src = anime.trailer.embed_url;
        });
      }
    })
    .catch((error) => alert(error));
  // let documentBody = document.getElementsByTagName("body")

  recommended.addEventListener("click", () => {
    if (top10) {
      top10 = false;
      recommended.innerHTML = "Top 10 Anime";
      top10Ani.innerHTML = "Recommended Anime Films";
      cardWrapper.style.display = "none";
      recommendHolder.style.display = "flex";
      fetch("https://api.jikan.moe/v4/recommendations/anime")
        .then((response) => response.json())
        .then((results) => {
          for (let i = 0; i < 25; i++) {
            let anime = results.data[i].entry[1];
            let cardDetails = document.createElement("div");
            let title = document.createElement("h3");
            title.innerHTML = `${anime.title}`;
            let img = document.createElement("img");
            img.src = `${anime.images.jpg.large_image_url}`;
            let button = document.createElement("button");
            button.type = button;
            let anchor = document.createElement("a");
            button.innerHTML = "LEARN MORE";
            img.className = "img-size";
            cardDetails.append(img);
            cardDetails.append(title);
            anchor.append(button);
            cardDetails.append(anchor);
            cardDetails.style.margin = "10px";
            recommendHolder.append(cardDetails);
            button.addEventListener("click", () => {
              anchor.target = "blank";
              anchor.href = anime.url;
            });
          }
        });
    } else {
      top10 = true;
      recommended.innerHTML = "Recommended";
      recommendHolder.style.display = "none";
      cardWrapper.style.display = "flex";
    }
  });

  // Show active menu when scrolling
  const highlightMenu = () => {
    const elem = document.querySelector(".highlight");
    const homeMenu = document.querySelector("#home-page");
    const aboutMenu = document.querySelector("#about-page");
    const servicesMenu = document.querySelector("#services-page");
    let scrollPos = window.scrollY;

    // adds 'highlight' class to my menu items

    if (window.innerWidth > 960 && scrollPos < 600) {
      homeMenu.classList.add("highlight");
      aboutMenu.classList.remove("highlight");
      return;
    } else if (window.innerWidth > 960 && scrollPos < 1400) {
      aboutMenu.classList.add("highlight");
      homeMenu.classList.remove("highlight");
      servicesMenu.classList.remove("highlight");
      return;
    } else if (window.innerWidth > 960 && scrollPos < 2345) {
      servicesMenu.classList.add("highlight");
      aboutMenu.classList.remove("highlight");
      return;
    }

    if ((elem && window.innerWidth < 960 && scrollPos < 600) || elem) {
      elem.classList.remove("highlight");
    }
  };

  window.addEventListener("scroll", highlightMenu);
  window.addEventListener("click", highlightMenu);

  //  Close mobile Menu when clicking on a menu item
  const hideMobileMenu = () => {
    const menuBars = document.querySelector(".is-active");
    if (window.innerWidth <= 768 && menuBars) {
      menu.classList.toggle("is-active");
      menuLinks.classList.remove("active");
    }
  };

  menuLinks.addEventListener("click", hideMobileMenu);
  navLogo.addEventListener("click", hideMobileMenu);
});
