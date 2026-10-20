
// ==========================================
// BARBER PRIME — JAVASCRIPT
// Etapa 4: Funcionalidades completas
// ==========================================


// 1. CONFIGURAÇÕES DO PROJETO

// Deixe vazio enquanto a barbearia for fictícia.
// Em um projeto real, informe 55 + DDD + telefone,
// utilizando somente números.

const WHATSAPP_NUMBER = "";


// 2. IDENTIFICAR SUPORTE A ANIMAÇÕES

const allowsMotion = window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
).matches;


// 3. ANO AUTOMÁTICO DO RODAPÉ

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ==========================================
// 4. MENU MOBILE
// ==========================================

// Indica ao CSS que o JavaScript está funcionando.

document.documentElement.classList.add("js-enabled");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("is-open");
    menuToggle.classList.remove("is-active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && navigation) {

    // Abrir ou fechar ao clicar no botão.

    menuToggle.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle(
            "is-open"
        );

        menuToggle.classList.toggle(
            "is-active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

    });

    // Fechar ao selecionar uma seção.

    navigation.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", closeMenu);

    });

    // Fechar com a tecla Esc.

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navigation.classList.contains("is-open")
        ) {
            closeMenu();
            menuToggle.focus();
        }

    });

    // Fechar ao retornar à visualização desktop.

    window.addEventListener("resize", () => {

        if (window.innerWidth > 767) {
    closeMenu();
}

    });

}


// ==========================================
// 5. GALERIA INTERATIVA
// ==========================================

const galleryDialog = document.getElementById(
    "gallery-dialog"
);

const dialogImage = document.getElementById(
    "gallery-dialog-image"
);

const dialogCaption = document.getElementById(
    "gallery-dialog-caption"
);

const galleryClose = document.querySelector(
    ".gallery-close"
);

const galleryButtons = document.querySelectorAll(
    ".gallery-open"
);

if (
    galleryDialog &&
    dialogImage &&
    dialogCaption &&
    galleryClose
) {

    galleryButtons.forEach((button) => {

        button.addEventListener("click", () => {

            // Obtém a imagem clicada.
            const image = button.querySelector("img");

            // Obtém o cartão da galeria.
            const card = button.closest(".gallery-item");

            if (!image || !card) return;

            const title = card.querySelector(
                "figcaption h3"
            );

            // Prepara a fotografia ampliada.
            dialogImage.src = image.src;
            dialogImage.alt = image.alt;

            dialogCaption.textContent = title
                ? title.textContent
                : "";

            // Abre a janela modal.
            galleryDialog.showModal();

        });

    });

    // Fecha pelo botão X.
    galleryClose.addEventListener("click", () => {
        galleryDialog.close();
    });

    // Fecha ao clicar no fundo externo.
    galleryDialog.addEventListener("click", (event) => {

        if (event.target === galleryDialog) {
            galleryDialog.close();
        }

    });

    // A tecla Esc já é suportada pelo <dialog>.

}


// ==========================================
// 6. AGENDAMENTO PELO WHATSAPP
// ==========================================

const bookingButtons = document.querySelectorAll(
    "[data-service]"
);

const bookingStatus = document.getElementById(
    "booking-status"
);

bookingButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        // Identifica o serviço selecionado.
        const service = button.dataset.service;

        // Personaliza a mensagem.
        let message;

        if (service === "Atendimento geral") {

            message =
                "Olá! Gostaria de conhecer os serviços " +
                "da Barber Prime e consultar os horários " +
                "disponíveis para agendamento.";

        } else {

            message =
                `Olá! Gostaria de agendar um horário ` +
                `para ${service} na Barber Prime. ` +
                `Poderiam me informar os horários disponíveis?`;

        }

        // Confere o formato brasileiro:
        // 55 + DDD + telefone com 8 ou 9 dígitos.

        const validNumber = /^55\d{10,11}$/.test(
            WHATSAPP_NUMBER
        );

        // Modo demonstrativo: não há empresa real.
        if (!validNumber) {

            if (bookingStatus) {

                bookingStatus.hidden = false;

                bookingStatus.textContent =
                    "Este é um projeto demonstrativo. " +
                    "Para habilitar o agendamento, " +
                    "configure o número do WhatsApp " +
                    "da empresa no arquivo script.js.";

                bookingStatus.scrollIntoView({
                    behavior: allowsMotion
                        ? "smooth"
                        : "auto",
                    block: "center"
                });

            }

            return;
        }

        // Codifica a mensagem para uso na URL.
        const encodedMessage = encodeURIComponent(
            message
        );

        // Monta o link do WhatsApp.
        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}` +
            `?text=${encodedMessage}`;

        // Abre o WhatsApp em uma nova aba.
        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

});


// ==========================================
// 7. ANIMAÇÕES AO ROLAR A PÁGINA
// ==========================================

const animatedElements = document.querySelectorAll(
    "[data-reveal]"
);

const supportsObserver =
    "IntersectionObserver" in window;

if (allowsMotion && supportsObserver) {

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "is-visible"
                    );

                    currentObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    animatedElements.forEach((element) => {

        element.classList.add("reveal-ready");

        observer.observe(element);

    });

}
