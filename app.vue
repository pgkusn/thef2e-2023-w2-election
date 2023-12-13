<script setup>
useHead({
  title: '2020臺灣總統大選情報站',
  link: [
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon-16x16.png' },
  ],
})

const route = useRoute()

const isShowNav = ref(false)

watch(
  () => route.name,
  () => {
    isShowNav.value = false
  }
)
</script>

<template>
  <header>
    <hgroup class="p5 text-center md:p6">
      <h1 class="text-8 font-700 md:text-10">2020<br class="md:hidden" />臺灣總統大選情報站</h1>
      <h2 class="text-3 mt2 md:(text-base font-700)">
        2020 Taiwan Presidential Election Information Station
      </h2>
    </hgroup>
    <div class="bg-theme-warning relative px4 py2 flex justify-end md:justify-center md:py3">
      <label for="nav-toggle" class="p2 rounded border border-#CED4DA bg-white md:hidden">
        <Icon name="Menu" size="24px" />
      </label>
      <input
        v-model="isShowNav"
        type="checkbox"
        id="nav-toggle"
        class="hidden [&+nav]:checked:h22 md:[&+nav]:checked:h-auto"
      />
      <nav
        class="absolute top-full inset-x-0 z1 bg-theme-warning h0 overflow-hidden transition-all [&>a]:(block px4 py2 text-theme-primary) [&>a.router-link-active]:text-#222 md:(h-auto flex items-center static)"
      >
        <NuxtLink to="/">開票即時報</NuxtLink>
        <NuxtLink to="/city">縣市選情版圖</NuxtLink>
      </nav>
    </div>
  </header>

  <main class="container flex-grow py5.5 md:py6">
    <NuxtPage />
  </main>

  <footer class="py4 flex justify-center items-center bg-theme-warning">
    <img src="@/assets/images/logo.png" srcset="@/assets/images/logo@2x.png 2x" />
    匿名山羌
    <span class="mx1 hidden md:block">Incognito Formosan Muntjac</span>
    © 2023
  </footer>
</template>

<style>
#__nuxt {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}
section > h1 {
  @apply flex items-center gap-x-2 text-6 font-700 leading-7.5;
}
</style>
