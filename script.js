// ===================================
// THEME TOGGLE
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icon based on theme
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// ===================================
// MOBILE MENU
// ===================================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Hide menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===================================
// SCROLL HEADER
// ===================================
const header = document.getElementById('header');

function scrollHeader() {
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

// ===================================
// ACTIVE LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
    });
}

// ===================================
// SKILL BARS ANIMATION
// ===================================
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

function animateSkills() {
    if (!skillsSection || skillsAnimated) return;

    const skillsPosition = skillsSection.getBoundingClientRect();
    const screenPosition = window.innerHeight;

    if (skillsPosition.top < screenPosition) {
        const skillBars = document.querySelectorAll('.skill__progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills);

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollTop = document.getElementById('scroll-top');

function showScrollTop() {
    if (window.scrollY >= 400) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', showScrollTop);

if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// CONTACT FORM
// ===================================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Here you would normally send the form data to a backend
        // For now, we'll just show a success message
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            showFormMessage('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                hideFormMessage();
            }, 5000);
        } catch (error) {
            showFormMessage('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        }
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form__message ${type}`;
    formMessage.style.display = 'block';
}

function hideFormMessage() {
    formMessage.style.display = 'none';
}

// ===================================
// TYPED TEXT EFFECT (Optional)
// ===================================
const typedText = document.querySelector('.typed-text');

if (typedText) {
    const texts = [
        'Ingeniero de Sistemas',
        'Experto en Bases de Datos',
        'Arquitecto de Soluciones',
        '25 Años de Experiencia'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            const newText = currentText.substring(0, charIndex - 1);
            // Use non-breaking space to maintain height when empty
            typedText.textContent = newText || '\u00A0';
            charIndex--;
            typingSpeed = 100;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            // Small pause before starting next text
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(type, 1000);
}

// ===================================
// SMOOTH SCROLL FOR ALL LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScrollActive = debounce(scrollActive, 10);
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedShowScrollTop = debounce(showScrollTop, 10);

window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', showScrollTop);

window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedShowScrollTop);

// ===================================
// PRELOADER (Optional)
// ===================================
window.addEventListener('load', () => {
    // Page is fully loaded
    document.body.classList.add('loaded');

    // Trigger initial animations
    scrollActive();
    scrollHeader();
    showScrollTop();
});

// ===================================
// CURSOR EFFECT (Optional - Advanced)
// ===================================
// Uncomment if you want a custom cursor effect
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});
*/

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c¡Hola! 👋', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%c¿Te gusta inspeccionar el código? ¡Excelente! Hablemos.', 'font-size: 14px; color: #6c757d;');
console.log('%cGitHub: https://github.com/tu-usuario', 'font-size: 12px; color: #6366f1;');

// ===================================
// VALUES CAROUSEL
// ===================================
const valuesCarousel = document.getElementById('values-carousel');
const valuesPrev = document.getElementById('values-prev');
const valuesNext = document.getElementById('values-next');
const valuesDots = document.getElementById('values-dots');

if (valuesCarousel && valuesPrev && valuesNext) {
    const cards = valuesCarousel.querySelectorAll('.value__card');
    const totalCards = cards.length;
    const cardsPerPage = 4;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    let currentPage = 0;

    // Create dots
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel__dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        valuesDots.appendChild(dot);
    }

    const dots = valuesDots.querySelectorAll('.carousel__dot');

    function updateCarousel() {
        cards.forEach((card, index) => {
            const startIndex = currentPage * cardsPerPage;
            const endIndex = startIndex + cardsPerPage;

            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });

        // Update button states - Always clickable for circular navigation
        valuesPrev.style.opacity = '1';
        valuesPrev.style.cursor = 'pointer';
        valuesNext.style.opacity = '1';
        valuesNext.style.cursor = 'pointer';
    }

    function goToPage(page) {
        currentPage = page;
        updateCarousel();
    }

    valuesPrev.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
        } else {
            // Circle back to last page
            currentPage = totalPages - 1;
        }
        updateCarousel();
    });

    valuesNext.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
        } else {
            // Circle back to first page
            currentPage = 0;
        }
        updateCarousel();
    });

    // Initialize
    updateCarousel();
}

// Blog Modal Functionality
const blogModal = document.getElementById('blog-modal');
const closeModal = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');

// Blog Article Content
const blogArticles = {
    1: {
        title: 'Manejo de Excepciones Oracle PL/SQL',
        content: `
<h2>Manejo de Excepciones Oracle PL/SQL</h2>

<p><strong>Un programa robusto no es aquel que no falla, sino aquel que controla adecuadamente sus excepciones.</strong> Una excepción es el resultado de una ejecución anormal del programa, una condición que no debería darse, que esperamos que no ocurra o un imprevisto no contemplado.</p>

<p>Puede parecer bastante obvio el uso de las excepciones y la teoría correspondiente. Pero si bien la explicación inicia con lo básico que debemos conocer todos, en la parte final se explica el funcionamiento que puede ocasionar problemas en los programas, por el no entendimiento de la teoría básica y la mala utilización del manejo de excepciones.</p>

<h3>Tipos de Excepciones en Oracle</h3>

<p>Existen dos tipos de excepciones en Oracle:</p>

<ul>
  <li>Excepciones pre-definidas en el sistema</li>
  <li>Excepciones definidas por el usuario</li>
</ul>

<h3>Excepciones Pre-definidas en el Sistema</h3>

<p>Son aquellas definidas y presentes implícitamente en el servidor de Oracle. Se encuentran definidas en el paquete "STANDARD" de Oracle el cual contiene la definición de todas las funciones básicas del motor (Funciones de una sola fila, procesamiento de transacciones, definición de tipos de datos, entre otros).</p>

<p>Las excepciones pre-definidas más ampliamente utilizadas son:</p>

<ul>
  <li>de>ORA-00001 DUP_VAL_ON_INDEX</code></li>
  <li>de>ORA-01403 NO_DATA_FOUND</code></li>
  <li>de>ORA-01422 TOO_MANY_ROWS</code></li>
  <li>de>ORA-01476 ZERO_DIVIDE</code></li>
</ul>

<h3>Ejemplo de Manejo de Excepciones Pre-definidas</h3>

<p>Como ejemplo se va a asumir que existe una tabla que posee los valores de los salarios mínimos mensuales por cada año. Un campo es de>ANIO</code> numérico de cuatro posiciones que posee el valor del año, y un campo de>SALARIO</code> numérico de ocho posiciones que posee el valor del salario mínimo mensual.</p>

<p>El siguiente programa muestra el valor del salario mínimo para el año 2014:</p>

<pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">de>DECLARE
  v_salario_minimo minimos_anuales.salario%type;
BEGIN
  SELECT salario
  INTO v_salario_minimo
  FROM minimos_anuales
  WHERE anio = 2014;
  DBMS_OUTPUT.PUT_LINE('EL VALOR DEL SALARIO MINIMO PARA 2014 ES '||v_salario_minimo);
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('NO ESTA DEFINIDO EL SALARIO MINIMO PARA EL AÑO 2014');
  WHEN TOO_MANY_ROWS THEN
    DBMS_OUTPUT.PUT_LINE('SE ENCUENTRA DEFINIDO EL SALARIO MINIMO PARA EL AÑO 2014 MAS DE UNA VEZ');
END;</code></pre>

<h3>Excepciones Definidas por el Usuario</h3>

<p>Algunas veces los programas deben manejar errores propios de la lógica del negocio, estandarizar mensajes entre aplicaciones, definir el resultado de invocación a interfaces, en fin, personalizar mensajes del negocio.</p>

<p>Oracle permite definir excepciones, tanto códigos como mensajes de error, para manejar de forma personalizada las excepciones. El código del ejemplo anterior podría ser re-definido de la siguiente manera:</p>

<pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">de>DECLARE
  v_salario_minimo minimos_anuales.salario%type;
  v_cantidad NUMBER(2);
  NO_SALARIO EXCEPTION;
  MUCHOS_SALARIOS EXCEPTION;
BEGIN
  SELECT COUNT(*)
  INTO    v_cantidad
  FROM minimos_anuales
  WHERE anio = 2014;
  IF v_cantidad = 1 THEN
    SELECT salario
    INTO v_salario_minimo
    FROM minimos_anuales
    WHERE anio = 2014;
    DBMS_OUTPUT.PUT_LINE('EL VALOR DEL SALARIO MINIMO PARA 2014 ES '||v_salario_minimo);
  ELSIF v_cantidad = 0 THEN
    RAISE NO_SALARIO;
  ELSE
    RAISE MUCHOS_SALARIOS;
  END IF;
EXCEPTION
  WHEN NO_SALARIO THEN
    DBMS_OUTPUT.PUT_LINE('NO ESTA DEFINIDO EL SALARIO MINIMO PARA EL AÑO 2014');
  WHEN MUCHOS_SALARIOS THEN
    DBMS_OUTPUT.PUT_LINE('SE ENCUENTRA DEFINIDO EL SALARIO MINIMO PARA EL AÑO 2014 MAS DE UNA VEZ');
END;</code></pre>

<h3>Procedimiento RAISE_APPLICATION_ERROR</h3>

<p>Existe el procedimiento de>RAISE_APPLICATION_ERROR</code>, el cual permite generar excepciones sin definirlas y dispararlas como en el ejemplo anterior. La sintaxis del procedimiento es la siguiente:</p>

<p>de>RAISE_APPLICATION_ERROR(numero,mensaje);</code></p>

<p>El número corresponde a un valor entero entre -20000 y -20999 y el mensaje corresponde a lo que se desea mostrar.</p>

<pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">de>DECLARE
  v_salario_minimo minimos_anuales.salario%type;
  v_cantidad NUMBER(2);
BEGIN
  SELECT COUNT(*)
  INTO    v_cantidad
  FROM minimos_anuales
  WHERE anio = 2014;
  IF v_cantidad = 1 THEN
    SELECT salario
    INTO v_salario_minimo
    FROM minimos_anuales
    WHERE anio = 2014;
    DBMS_OUTPUT.PUT_LINE('EL VALOR DEL SALARIO MINIMO PARA 2014 ES '||v_salario_minimo);
  ELSIF v_cantidad = 0 THEN
    RAISE_APPLICATION_ERROR(-20000,'NO ESTA DEFINIDO EL SALARIO MINIMO PARA EL AÑO 2014');
  ELSE
    RAISE_APPLICATION_ERROR(-20001, 'SE ENCUENTRA DEFINIDO EL SALARIO MINIMO PARA EL AÑO 2014 MAS DE UNA VEZ');  
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE(SQLERRM);
END;</code></pre>

<h3>Funciones Útiles para el Manejo de Excepciones</h3>

<ul>
  <li>de>SQLCODE</code>: Recupera el código del último error presentado</li>
  <li>de>SQLERRM</code>: Recupera el código y mensaje del último error presentado</li>
</ul>

<h3>Propagación de las Excepciones</h3>

<p>Dada la estructura de bloques de PL/SQL, las excepciones se propagan desde el bloque más interno, hasta el bloque más externo buscando ser manejadas. Esta es la razón por la cual <strong>no se puede decir que un buen programa es aquel que no falla</strong>, ni presenta excepciones.</p>

<p>Es preferible que aparezca un de>NO_DATA_FOUND</code> en la línea X del programa a que el programa no muestre mensajes de error pero no haga lo que se espera. Cuando se trabaja modularmente, se debe definir los errores que se pueden presentar y la manera en que estos son tratados al interior del programa y propagados hacia el exterior.</p>

<h3>Conclusión</h3>

<p>El manejo adecuado de excepciones es fundamental para crear programas robustos y confiables. No se trata de evitar que los errores ocurran, sino de anticiparlos y controlarlos de manera efectiva para garantizar que la aplicación se comporte de forma predecible y segura en todas las circunstancias.</p>
        `
    }
};

// Open modal with article
function openBlogModal(articleId) {
    if (blogArticles[articleId]) {
        modalBody.innerHTML = blogArticles[articleId].content;
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
closeModal.addEventListener('click', closeBlogModal);
window.addEventListener('click', (e) => {
    if (e.target === blogModal) closeBlogModal();
});

function closeBlogModal() {
    blogModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}
