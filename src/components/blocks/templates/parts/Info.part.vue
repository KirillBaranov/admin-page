<template>
  <div class="info__part-wrapper card">
    <div class="info__part">
      <div class="info__position">Позиция: -= <span class="bold">{{ id }}</span> =-</div>

      <div class="show-modal" @click="openVisibilityPlayerModal( user.login )">
        <picture>
          <img src="~@/assets/img/more.svg" alt="Посмотреть еще">
        </picture>
      </div>

      <div class="info__login">
        Логин:
        <a :href="`/user/${user.login}`"
            @click.prevent="put(user.login)"
            class="bold">
          {{ user.login }}
        </a>
      </div>
      <div class="info__email" v-if="hasPerm('email')">
        Email: <a :href="`mailto:${user.email}`" class="bold">{{ user.email }}</a>
      </div>
      <div class="info__uuid">Uuid: <span class="bold">{{ user.uuid }}</span></div>
      <div class="info__registration">Регистрация: <span class="bold">{{ parseTime(user.reg) }}</span></div>
      <div class="info__lastEntry">Последниц вход: <span class="bold">{{ parseTime(user.last) }}</span></div>
    </div>
    <div class="info__part" v-if="hasPerm('ip')">
      <span class="ip-list-title">Список IP адресов: </span>
      <ol v-if="user.ips && user.ips.length > 0">
        <li v-for="ip in user.ips">
          <span class="ip-list__li-wrapper">
            <span class="last_ip-time">{{ parseTime(ip[0]) }}</span>
            <a target="_blank"
               rel="nofollow noopener"
               :href="`https://whatismyipaddress.com/ip/${ip[1]}`"
               class="last_ip">
              {{ ip[1] }}
            </a>
          </span>
        </li>
      </ol>

      <p v-else class="info__no-ips">IP адресов не найдено.</p>
    </div>
  </div>
</template>

<script>
import PermissionMixin from "../../../../mixins/PermissionMixin";
import TimeMixin from "../../../../mixins/TimeMixin";
import {mapMutations} from 'vuex';
import VisibilityPlayerModalMixin from "../../../../mixins/VisibilityPlayerModalMixin";

export default {
  name: "Info.part",
  props: {
    user: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapMutations( 'CheckModule', [
      'updateInput'
    ]),
    put( value ) {
      this.updateInput( value );
      this.refresh();
    },
    refresh() {
      this.$emit( 'refresh' );

      window.scrollTo( 0, 0 );
    }
  },
  mixins: [
    PermissionMixin,
    TimeMixin,
    VisibilityPlayerModalMixin
  ]
}
</script>

<style lang="scss" scoped>
  .info__part {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;

    color: var( --font-color );

    a {
      color: var( --primary-color );
    }

    ol, ul {
      padding-left: 20px;
    }

    li {
      max-width: 409px;
      width: 100%;
    }

    .ip-list__li-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span.bold {
      color: var( --font-color );
    }
  }

  .ip-list-title {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;

    color: var( --font-color );
    margin-bottom: 18px;
    margin-top: 23px;
    display: block;
  }

  @media ( max-width: 576px ) {
    .info__part {
      .ip-list__li-wrapper {
        font-size: 14px;
      }
    }
  }
</style>
