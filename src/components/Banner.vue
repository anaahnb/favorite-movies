<template>
  <div :class="$style.bannerContainer">
    <img :class="$style.image" src="../assets/img/banner.png" alt="">
    <div :class="$style.titleContainer">
      <h1>
        Track films you’ve watched. <br>
        Save those you want to see. <br>
        Tell your friends what’s good.
      </h1>
    </div>
  </div>
</template>

<style lang="scss" module>
.bannerContainer {
  position: relative;
  width: 100%;
  overflow: hidden;

  .image {
    display: block;
    width: 100%;
    height: auto;
  }

  .titleContainer {
    position: absolute;
    bottom: 24px;
    left: 30%;
    z-index: 2;

    h1 {
      text-align: center;
      font-family: Georgia, 'Times New Roman', Times, serif;
      font-size: 2.25rem;
      line-height: 1.333;
      font-weight: 700;
      color: #fff;
    }
  }
}
</style>