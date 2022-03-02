document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".navbar__menu");
  const navLogo = document.querySelector("#navbar__logo");
  const cardWrapper = document.getElementById("wrapper");
  const animeInfo = document.getElementById("animeInfo");

  // Display Mobile Menu
  const mobileMenu = () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  };

  menu.addEventListener("click", mobileMenu);

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
        button.innerHTML = "LEARN MORE";
        img.className = "img-size";
        cardDetails.append(title);
        cardDetails.append(img);
        cardDetails.append(para);
        cardDetails.append(button);
        cardDetails.style.margin = "10px";
        cardWrapper.append(cardDetails);
        button.addEventListener("click", () => {
         let hero = document.getElementById("anime")
         let animeName = document.getElementById("learMore-of-anime")
         let animeSynopsis = document.getElementById("anime-clicked-synopsis")
          animeInfo.style.display = "block";
          animeName.innerHTML = anime.title;
          animeSynopsis.innerHTML = anime.synopsis

        })
      }
    })
    .catch((error) => alert(error));
    let documentBody = document.getElementsByTagName("body")
  
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

    if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
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
