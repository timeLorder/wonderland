<template>
  <div>
    <!-- <div class="stellarium-box">
      <iframe src="https://stellarium-web.org/" width="900" height="900" frameborder="0"></iframe>
    </div> -->
    <!-- <header class="magpie-header">
      <h1 class="title">Magpie<a-icon type="heart" theme="filled" /></h1>
      <button class="magpie-button" title="Open Stellarium website" @click="toStellarium">
        <img
          width="24"
          height="24"
          src="https://d3ufh70wg9uzo4.cloudfront.net/img/logo.5901f70d.svg"
        />
      </button>
    </header> -->
    <img
      class="banner"
      src="https://wonderland-image.oss-cn-shanghai.aliyuncs.com/cover/stellarium.png?versionId=CAEQJBiBgMDphcHE2RciIDE0YTc1MDkzMGU2MjQ0MTFiYzMwYjUwOGRkNzBjYTVl"
    />
    <div class="magpie-title">
      <p>酸，七夕节快乐~</p>
      <p>你永远是我最喜欢的宝贝😊</p>
    </div>
    <div class="magpie-waterfall">
      <waterfall :col="4" :width="282" :gutter-width="24" :data="photoList">
        <template>
          <div v-for="(item, index) in photoList" :key="index" class="card">
            <img :lazy-src="item.src" :alt="item.title" />
            <p v-if="item.title">{{ item.title }}</p>
          </div>
        </template>
      </waterfall>
    </div>
    <div v-if="useSpotify" class="spotify-box">
      <iframe
        id="spotify-iframe"
        src="https://open.spotify.com/embed/playlist/2k8yEqriRqhKPj0jwxxHzk?theme=0"
        width="100%"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      />
    </div>
    <div v-else class="netease-box">
      <iframe
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        height="100"
        src="//music.163.com/outchain/player?type=0&id=6918075673&auto=1&height=80"
      />
    </div>
    <div class="stellarium-link" title="Open Stellarium website" @click="toStellarium">
      <img
        width="24"
        height="24"
        src="https://d3ufh70wg9uzo4.cloudfront.net/img/logo.5901f70d.svg"
      />
    </div>
    <div
      class="player-switch"
      :title="useSpotify ? 'Switch to Netease player' : 'Switch to Spotify player'"
      @click="switchPlayer"
    >
      <svg
        v-if="useSpotify"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        height="32"
        width="32"
        viewBox="0 0 1024 1024"
        style="width: 32px; height: 32px"
      >
        <path
          d="M627.086668 5.114963c28.132297-7.672445 58.822075-7.672445 86.954372 0 33.24726 7.672445 63.937038 23.017334 89.511853 43.477186 10.229926 7.672445 17.902371 15.344889 23.017334 28.132297 7.672445 17.902371 5.114963 38.362223-5.114963 53.707112-7.672445 12.787408-23.017334 23.017334-40.919704 25.574815-12.787408 2.557482-25.574815 0-38.362223-7.672445-5.114963-2.557482-10.229926-10.229926-17.902371-12.787407-17.902371-10.229926-35.804741-20.459852-56.264593-17.902371-15.344889 0-28.132297 7.672445-35.804742 17.902371-10.229926 10.229926-12.787408 23.017334-10.229926 35.804741 7.672445 25.574815 12.787408 53.707112 20.459853 79.281927 51.14963 2.557482 99.741779 15.344889 143.218965 40.919704 40.919704 25.574815 79.281927 58.822075 109.971705 97.184298 25.574815 33.24726 46.034667 71.609483 56.264593 112.529187 12.787408 43.477186 17.902371 89.511853 12.787408 132.989039-2.557482 38.362223-10.229926 74.166964-23.017334 109.971705-33.24726 84.39689-92.069335 161.121336-171.351261 209.713485-56.264593 35.804741-122.759113 58.822075-189.253633 66.49452-46.034667 5.114963-92.069335 5.114963-138.104002-2.557482-94.626816-15.344889-181.581188-61.379556-250.633189-130.431558-66.49452-66.49452-112.529187-153.448891-132.989039-245.518225-7.672445-69.052001-7.672445-138.104002 7.672445-207.156004 17.902371-81.839409 61.379556-161.121336 117.644149-222.500892 48.592149-51.14963 107.414224-89.511853 171.351262-117.64415 7.672445-2.557482 12.787408-5.114963 20.459852-7.672444 15.344889-2.557482 30.689778 0 43.477186 10.229926 17.902371 12.787408 25.574815 33.24726 23.017334 53.707112-2.557482 20.459852-17.902371 38.362223-35.804741 46.034667-63.937038 25.574815-122.759113 69.052001-163.678818 122.759113C205.102218 373.392302 179.527402 432.214377 171.854958 493.593933c-7.672445 61.379556 0 122.759113 20.459852 181.581188 30.689778 84.39689 94.626816 156.006373 173.908743 196.926077 48.592149 25.574815 102.299261 38.362223 156.006373 38.362223 43.477186 0 89.511853-7.672445 130.431558-23.017334 35.804741-12.787408 71.609483-33.24726 99.741779-58.822074 28.132297-23.017334 51.14963-53.707112 66.494519-84.396891 7.672445-15.344889 17.902371-33.24726 20.459853-51.14963 15.344889-51.14963 17.902371-107.414224 2.557481-158.563854-12.787408-43.477186-38.362223-81.839409-71.609482-109.971706-15.344889-12.787408-30.689778-25.574815-48.592149-35.804741-15.344889-7.672445-30.689778-15.344889-48.592149-17.902371 12.787408 46.034667 23.017334 92.069335 35.804741 135.546521 2.557482 10.229926 5.114963 23.017334 5.114963 33.24726 2.557482 46.034667-15.344889 94.626816-46.034667 130.431557-28.132297 33.24726-69.052001 58.822075-112.529187 66.49452-46.034667 10.229926-97.184298 0-138.104002-25.574815-38.362223-25.574815-66.49452-63.937038-81.839409-104.856743-7.672445-23.017334-12.787408-48.592149-12.787407-74.166964-2.557482-56.264593 12.787408-109.971705 43.477185-156.006373 35.804741-53.707112 94.626816-92.069335 158.563855-109.971705-5.114963-17.902371-10.229926-35.804741-12.787408-53.707112-12.787408-38.362223-10.229926-81.839409 7.672445-115.086668 10.229926-20.459852 23.017334-38.362223 40.919704-51.149631C583.609483 25.574815 604.069335 12.787408 627.086668 5.114963m-148.333928 414.312006c-17.902371 17.902371-28.132297 40.919704-33.24726 63.937038-5.114963 20.459852-5.114963 43.477186 0 66.49452 5.114963 23.017334 17.902371 46.034667 38.362223 61.379556 15.344889 10.229926 35.804741 15.344889 56.264594 10.229926 35.804741-5.114963 63.937038-38.362223 63.937038-74.166964-2.557482-7.672445-2.557482-17.902371-5.114963-25.574815-12.787408-48.592149-25.574815-99.741779-38.362223-148.333928-30.689778 7.672445-58.822075 23.017334-81.839409 46.034667z"
          fill="#ffffff"
        ></path>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        height="32"
        width="32"
        viewBox="-33.4974 -55.829 290.3108 334.974"
      >
        <path
          d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"
          fill="#fff"
        />
      </svg>
    </div>
    <a-back-top />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { photos } from '@/constants/photos';

@Component({
  layout: 'blank',
})
export default class App extends Vue {
  useSpotify = false;
  photoList = photos;

  toStellarium() {
    window.open('https://stellarium-web.org/');
  }

  switchPlayer() {
    this.useSpotify = !this.useSpotify;
  }
}
</script>

<style lang="less" scoped>
.magpie-header {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px #000;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;

  .title {
    margin-bottom: 0;
    margin-left: 24px;
    color: rgba(255, 255, 255, 0.75);
    i {
      display: none;
      &:last-child {
        margin-left: 4px;
      }
    }
    &:hover {
      color: rgba(255, 255, 255, 0.9);
      i {
        display: inline-block;
      }
    }
  }

  .magpie-button {
    margin-right: 24px;
    border: 1px solid transparent;
    border-radius: 50%;
    padding: 8px;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}
.banner {
  max-width: 100%;
}
.magpie-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  font-size: 30px;
}
.magpie-waterfall {
  width: 1200px;
  margin: 0 auto;
  .card {
    margin-bottom: 24px;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
    p {
      margin: 6px 14px;
      line-height: 24px;
    }
  }
}
.spotify-box {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
}
.netease-box {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  iframe {
    margin-top: -20px;
    margin-left: -10px;
    width: calc(100% + 20px);
  }
}
.player-switch {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: white;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum', 'tnum';
  position: fixed;
  right: 60px;
  bottom: 172px;
  z-index: 10;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stellarium-link {
  position: fixed;
  right: 60px;
  bottom: 224px;
  z-index: 10;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
