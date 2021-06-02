<template>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-end">
            <div class="copyright">
              <span class="copyright__text">Design & Front-end: &nbsp;</span>
              <a href="https://vk.com/kirill.baranov_off"
                 target="_blank"
                 rel="nofollow noopener"
                 class="copyright__link">Shweeps &nbsp;</a>
              <span class="copyright__text">&</span>
              <a href="https://forum.kaboom2.ru/index.php?members/2114140753/"
                 target="_blank"
                 rel="nofollow noopener"
                 class="copyright__link"> igorzab </a>
              <span class="copyright__text">; Back-end: &nbsp;&nbsp</span>
              <a href="https://forum.kaboom2.ru/index.php?members/24993/"
                 target="_blank"
                 rel="nofollow noopener"
                 class="copyright__link">Mips.</a>
            <span class="copyright__text">.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
</template>

<script>
    export default {
        name: "AppFooter"
    }
</script>

<style lang="scss" scoped>
  footer {
    border-top: 1px solid rgba( #fff, .3 );
    padding: 27px 0;
    position: relative;
    z-index: 1;
  }

  .copyright {
    a, span {
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
    }

    &__text {
      color: #A5A5A5;
    }

    &__link {
      color: var(--primary-color);
      position: relative;
      margin-right: -3px;

      &::before {
        content: '';
        position: absolute;
        left: -1px;
        bottom: -4px;
        width: 8px;
        height: 1px;
        background: var(--primary-color);
        transition: .2s ease-in-out;
      }

      &:hover {
        text-decoration: none;

        &::before {
          width: calc( 100% + 2px );
        }
      }
    }
  }
</style>
