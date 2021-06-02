<template>
  <section class="app-page__mutes">
   <template v-if="result.error == ''">
     <OutputHeader time="0 ms" :meta="meta"></OutputHeader>

     <div class="output__body">
        <div class="output__table-active">
          <div class="output__body-title">Список активных мутов</div>

          <template v-if="!result.result.active">
            <div class="output__subtitle">Активный мут не найден</div>
          </template>

          <template v-else>
            <div class="output__body-active">
              <table v-if="!isMobile">
                <thead>
                <tr>
                  <td>Дата</td>
                  <td>Кто банил</td>
                  <td>Причина</td>
                  <td>Истекает</td>
                </tr>
                </thead>

                <tbody>
                <tr>
                  <td>{{ result.result.active.created }}</td>
                  <td>
                    <RouterLink :to="`/?act=bansadm&login=${result.result.active.actor}`">
                      {{ result.result.active.actor }}
                    </RouterLink>
                  </td>
                  <td>{{ result.result.active.reason }}</td>
                  <td>{{ result.result.active.expires == 0 ?  'Замучен пермаментно' : 'Через ' + result.result.active.expires}}</td>
                </tr>
                </tbody>
              </table>
              <div v-else class="output__body-active-list-mobile card">
                <div class="output__body-active-item-mobile">
                  <div class="output__body-active-line-mobile">
                    Дата: {{ result.result.active.created }}
                  </div>

                  <div class="output__body-active-line-mobile">
                    Кто мутил:
                    <RouterLink :to="`/?act=muteadm&login=${result.result.active.actor}`">
                      {{ result.result.active.actor }}
                    </RouterLink>
                  </div>

                  <div class="output__body-active-line-mobile">
                    Причина: {{ result.result.active.reason }}
                  </div>

                  <div class="output__body-active-line-mobile">
                    Истекает: {{ result.result.active.expires == 0 ?  'Замучен пермаментно' : 'Через ' + result.result.active.expires}}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

       <div class="output__history">
         <div class="output__body-title">Список мутов</div>

         <template v-if="result.result.history == false">
           <div class="output__subtitle">Муты не найдены</div>
         </template>

         <template v-else>
           <div class="output-history__list">
             <div class="output-history__item card" v-for="(item, index) in result.result.history">
               <div class="output-history__item-line">-={{index + 1}}=-</div>

               <div class="show-modal" @click="openVisibilityPlayerModal( input )">
                 <picture>
                   <img src="~@/assets/img/more.svg" alt="Посмотреть еще">
                 </picture>
               </div>

               <div class="output-history__item-line">Дата мута: {{item.pastCreated}}</div>
               <div class="output-history__item-line">
                 Ник игрока:
                 <RouterLink :to="`/?act=info&login=${input}`">
                   {{input}}
                 </RouterLink>
               </div>
               <div class="output-history__item-line">Причина: {{item.createdReason}}</div>
               <div class="output-history__item-line">Время мута: {{item.expired == 0 ? 'Перманентный мут' : item.expired}}</div>
               <div class="output-history__item-line">
                 Кто мутил:
                 <RouterLink :to="`/?act=muteadm&login=${item.pastActor}`">
                   {{item.pastActor}}
                 </RouterLink>
               </div>
               <div class="output-history__item-line">Дата размута: {{item.created}}</div>
               <div class="output-history__item-line">
                 Кто размутил:
                 <RouterLink :to="`/?act=muteadm&login=${item.actor}`">
                   {{item.actor}}
                 </RouterLink>
               </div>
             </div>
           </div>
         </template>
       </div>
     </div>
   </template>

    <template v-else>
      <OutputHeader time="0 ms" meta="Возникла ошибка при выполнении запроса, перезагрузите страницу."></OutputHeader>
    </template>
  </section>
</template>

<script>
import OutputHeader from "./header/OutputHeader";

// mixins
import AdaptiveMixin from "../../../mixins/AdaptiveMixin";

import {mapState} from "vuex";
import VisibilityPlayerModalMixin from "../../../mixins/VisibilityPlayerModalMixin";

export default {
  name: "Mutes.template.vue",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  components: {
    OutputHeader
  },
  mixins: [
    AdaptiveMixin,
    VisibilityPlayerModalMixin
  ],
  computed: {
    ...mapState( 'CheckModule', [
      'input'
    ]),
    meta() {
      return `Запрашиваемый ник: ${this.input}`;
    },
  }
}
</script>

<style lang="scss">
  .output-history__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }

  @media ( max-width: 1280px ) {
    .output-history__list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media ( max-width: 768px ) {
    .output-history__list {
      grid-template-columns: 1fr;
    }
  }

  .output__table-active {
    margin-top: 53px;

    .output__body-title {
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      color: var(--secondary-color);
      margin-bottom: 29px;
    }

    table {
      width: 100%;

      td {
        padding: 0 10px;

        &:first-child {
          padding-left: 20px;
        }

        &:last-child {
          padding-right: 20px;
        }
      }

      thead {
        background: var(--primary-color);

        td {
          height: 56px;
        }
      }

      tbody {
        td {
          padding-top: 26px;
          padding-bottom: 26px;

          border-bottom: 1px solid rgba(255, 255, 255, 0.31);
        }
      }
    }
  }

  .output__history {
    margin-top: 53px;

    .output__body-title {
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      color: var(--secondary-color);
      margin-bottom: 29px;
    }
  }
</style>
