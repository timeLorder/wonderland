<template>
  <div>
    <wd-header />

    <main id="wd-content-wrapper">
      <Nuxt />
    </main>

    <wd-footer />
  </div>
</template>

<style lang="less">
#wd-content-wrapper {
  width: @index-width;
  margin: 30px auto;
}
</style>