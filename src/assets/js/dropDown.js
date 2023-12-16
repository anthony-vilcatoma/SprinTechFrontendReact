
    const button = document.getElementById('menu-button');
    const menu = document.getElementById('dropdown-menu');

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));

      if (!expanded) {
        menu.classList.add('transform', 'opacity-100', 'scale-100');
        menu.classList.remove('opacity-0', 'scale-95');
      } else {
        menu.classList.add('opacity-0', 'scale-95');
        menu.classList.remove('transform', 'opacity-100', 'scale-100');
      }
    });
