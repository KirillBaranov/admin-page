<template>
  <div class="output__template">

    <template v-if="result.error == ''">
      <OutputHeader time="0 ms" :meta="meta"></OutputHeader>

      <div class="output__body">
        <div class="output__body-block">
          <div class="output__tps">
            Тпс сервера:
            <span :class="tpsClass"  class="tps">{{result.result['tps'] }}</span>
          </div>
        </div>
        <div class="output__body-block">
          <div class="list-body">
            <span class="list-title">Игроки в мирах:</span>
            <ul class="list-output">
              <li v-for="world in worlds"  :key="world[0]">{{world[0] + ': ' + world[1]}}</li>
            </ul>
            <span class="list-total">Во всех мирах: {{ players }}</span>
          </div>
        </div>
        <div class="output__body-block">
          <div class="list-body">
            <span class="list-title">TPS в мирах:</span>
            <ul class="list-output">
              <li v-for="world in worldsTps" :key="world[0]">{{world[0] + ': ' + world[1]}}</li>
            </ul>
          </div>
        </div>
        <div class="output__body-block">
          <div class="list-body">
            <span class="list-title">Энтити в мирах:</span>
            <ul class="list-output">
              <li v-for="entity in entities" :key="entity[0]">{{entity[0] + ': ' + entity[1]}}</li>
            </ul>
          </div>
        </div>
        <div class="output__body-block">
          <div class="output-uptime">
            Uptime сервера: <span>{{ uptime }}</span>
          </div>
        </div>

        <div class="output__body-block">
          <button class="button button-primary button-refresh" @click="restart">Перезагрузить</button>
        </div>
      </div>

    </template>

    <template v-else>
      <OutputHeader time="0 ms" meta="Возникла ошибка при выполнении запроса, перезагрузите страницу."></OutputHeader>
    </template>
  </div>
</template>

<script>
import OutputHeader from "./header/OutputHeader";

import {mapGetters} from 'vuex';

export default {
  name: "Tps.template",
  components: {
    OutputHeader
  },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {
    restart() {
      // restart server.
    }
  },
  computed: {
    ...mapGetters( 'CheckModule', [
      'getCurrentServer'
    ]),
    meta() {
      return `Запрашиваемый сервер: ${this.getCurrentServer}`;
    },
    players() {
      return Object.values( this.result.result.players_in_world ).reduce( ( accum, number ) => {
        return accum + number;
      });
    },
    worlds() {
      return Object.keys( this.result.result.players_in_world ).map((key) => {
        return [
          key,
          this.result.result.players_in_world[key],
        ]
      });
    },
    worldsTps() {
      return Object.keys( this.result.result.world_tps ).map((key) => {
        return [
          key,
          this.result.result.world_tps[key],
        ]
      })
    },
    entities() {
      return Object.keys( this.result.result.entities ).map((key) => {
        return [
          key,
          this.result.result.entities[key],
        ]
      })
    },
    uptime() {
      const secs  = this.result.result.uptime;

      const hours = Math.floor(secs / (60 * 60));

      const divisor_for_minutes = secs % (60 * 60);
      const minutes = Math.floor(divisor_for_minutes / 60);

      const divisor_for_seconds = divisor_for_minutes % 60;
      const seconds = Math.ceil(divisor_for_seconds);

      return `${hours}ч ${minutes}мин ${seconds}сек`;
    },
    tpsClass() {
      const tps = this.result.result['tps'];

      if ( tps > 17 ) {
        return 'good';
      }

      if ( tps > 14 ) {
        return 'ok';
      }

      if ( tps >= 10 ) {
        return 'warning';
      }

      if ( tps < 10 ) {
        return 'danger';
      }

      return 'good';
    }
  }
}
</script>

<style lang="scss">
  .output__body {
    margin-top: 28px;
    margin-bottom: 70px;

    .button-refresh {
      width: 222px;
      height: 57px;

      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
    }
  }

  .output__body-block {
    margin-bottom: 28px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .output__tps {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: var(--secondary-color);

    margin-bottom: 28px;
    .tps {
      color: var(--primary-color);
      font: inherit;
    }
  }

  .list-body {
    span.primary {
      color: var(--primary-color);
    }

    .list-title {
      margin-bottom: 14px;
      display: block;
    }

    .list-output {
      li {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;

        color: var(--secondary-color);
      }
    }
  }
  .normal {
    color: var(--tps-good-color);
  }
  .warning{
    color: var(--tps-warning-color);
  }
  .stable{
    color: var(--primary-color);
  }
</style>
