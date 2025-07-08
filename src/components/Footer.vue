<template>
     <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <div class="footer__logo">
            <h3>ARCH STUDIO</h3>
          </div>
          <div class="footer__links">
            <a href="#projects">Проекты</a>
            <a href="#about">О нас</a>
            <a href="#services">Услуги</a>
            <a href="#contact">Контакты</a>
          </div>
          <div class="footer__social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="LinkedIn">LI</a>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; 2024 Arch Studio. Все права защищены.</p>
        </div>
      </div>
    </footer>
</template>

<style scoped lang="scss">
.footer {
  background: #333;
  color: white;
  padding: 3rem 0 1rem;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  &__logo h3 {
    font-weight: 300;
    letter-spacing: 2px;
  }

  &__links {
    display: flex;
    gap: 2rem;

    a {
      color: white;
      text-decoration: none;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  &__social {
    display: flex;
    gap: 1rem;

    a {
      color: white;
      text-decoration: none;
      width: 40px;
      height: 40px;
      border: 1px solid #555;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;

      &:hover {
        background: #555;
      }
    }
  }

  &__bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #555;
    color: #999;
  }
}
</style>