<template>
  <section class="about">
    <div class="about__content"  data-aos="fade-up">
      <h2 class="about__title">О компании</h2>
      <p class="about__text">
        Мы — команда архитекторов и дизайнеров, создающих современные и функциональные пространства. 
        Наши проекты сочетают эстетику и практичность, соответствуя уникальным запросам каждого клиента.
      </p>
    </div>
    <div class="about__image" data-aos="fade-left"></div>
  </section>
</template>

<style scoped lang="scss">
.about {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6rem 10vw;
  gap: 4rem;
  background-color: #fff;

  &__content {
    flex: 1;
    animation: fadeInLeft 1s ease forwards;
  }

  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  &__text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #444;
  }

  &__image {
    flex: 1;
    height: 300px;
    background: url('https://static2.abitant.com/uploads/project_image/256/260/lj0jbnpbay4i5c2rfadd.jpg') no-repeat center/cover;
    border-radius: 8px;
    animation: fadeInRight 1s ease forwards;
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
