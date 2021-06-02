import {mapGetters} from "vuex";

export default {
  data() {
    return {
      styles: {
        user: {
          general: {
            primaryColor: '#FD6950',
            backgroundColor: '#21272E',
            textColor: '#FFFFFF',
            buttons: {

            }
          },
          logs: {
            timeColor: '#ffffff',
            muteColor: '#ffffff',
            textColor: '#ffffff',
            localColor: '#ffffff',
            globalColor: '#ffffff',
            commandColor: '#ffffff'
          },
          tps: {
            good: '#43d63b', // > 17
            ok: '#2ca220', // > 14
            warning: '#e8a73f', // > 10
            danger: '#e0483e' // < 10
          },
        },
        default: {
          general: {
            primaryColor: '#FD6950',
            backgroundColor: '#21272E',
            textColor: '#FFFFFF',
          },
          logs: {
            timeColor: '#ffffff',
            muteColor: '#ffffff',
            textColor: '#ffffff',
            localColor: '#ffffff',
            globalColor: '#ffffff',
            commandColor: '#ffffff'
          },
          tps: {
            good: '#43d63b', // > 17
            ok: '#2ca220', // > 14
            warning: '#e8a73f', // > 10
            danger: '#e0483e' // < 10
          }
        }
      }
    }
  },
  watch: {
    '$route.params': function() {
      this.start();
    }
  },
  methods: {
    start() {
      const params = this.$router.history.current.query;

      if ( !params.share ) {
        const styles = localStorage.getItem( 'user-styles' );

        let parsed   = this.styles.default;

        if ( styles ) {
          parsed = JSON.parse( styles );
        }

        // default settings.
        try {
          this.styles.user.general.primaryColor      = parsed.general.primaryColor    ? parsed.general.primaryColor    : this.styles.default.general.primaryColor;
          this.styles.user.general.backgroundColor   = parsed.general.backgroundColor ? parsed.general.backgroundColor : this.styles.default.general.backgroundColor;
          this.styles.user.general.textColor         = parsed.general.textColor       ? parsed.general.textColor       : this.styles.default.general.textColor;
        }

        catch ( e ) {
          this.styles.general.user = this.styles.default.general;
          console.warn( 'Один или несколько цветов из настроек недоступны.', e );
        }

        // tps settings
        try {
          this.styles.user.tps.good          = parsed.tps.good          ? parsed.tps.good          : this.styles.default.tps.good;
          this.styles.user.tps.ok            = parsed.tps.ok            ? parsed.tps.ok            : this.styles.default.tps.ok;
          this.styles.user.tps.warning       = parsed.tps.warning       ? parsed.tps.warning       : this.styles.default.tps.warning;
          this.styles.user.tps.danger        = parsed.tps.danger        ? parsed.tps.danger        : this.styles.default.tps.danger;
        }

        catch ( e ) {
          this.styles.user.tps = this.styles.default.tps;
          console.warn( 'Один или несколько цветов из настроек недоступны.', e );
        }

        // logs settings
        try {
          this.styles.user.logs.timeColor    = parsed.logs.timeColor    ? parsed.logs.timeColor    : this.styles.default.logs.timeColor;
          this.styles.user.logs.textColor    = parsed.logs.textColor    ? parsed.logs.textColor    : this.styles.default.logs.textColor;
          this.styles.user.logs.muteColor    = parsed.logs.muteColor    ? parsed.logs.muteColor    : this.styles.default.logs.muteColor;
          this.styles.user.logs.localColor   = parsed.logs.localColor   ? parsed.logs.localColor   : this.styles.default.logs.localColor;
          this.styles.user.logs.globalColor  = parsed.logs.globalColor  ? parsed.logs.globalColor  : this.styles.default.logs.globalColor;
          this.styles.user.logs.commandColor = parsed.logs.commandColor ? parsed.logs.commandColor : this.styles.default.logs.commandColor;
        }

        catch ( e ) {
          this.styles.user.logs = this.styles.default.logs;
          console.warn( 'Один или несколько цветов из настроек недоступны.', e );
        }
      }

      else {
        try {
          this.settingsImport( params );
        }

        catch ( e ) {
          console.error( e );
        }
      }

      try {
        this.update();
      }

      catch ( e ) {
        console.error( e );
      }
    },
    save() {
      localStorage.setItem( 'user-styles', JSON.stringify( this.styles.user ) );

      if ( this.share ) {
        this.$router.push( '/settings' ).catch( err => {} );
      }
    },
    reset() {
      this.styles.user = this.styles.default;

      this.update(); // update & save.
      this.save();
    },
    reject() {
      this.$router.push( '/settings' ).catch( err => {} );
    },
    settingsImport( params ) {
      this.styles.user.general.primaryColor      = params.pc    ? '#' + params.pc    : this.styles.default.general.primaryColor;
      this.styles.user.general.backgroundColor   = params.bc    ? '#' + params.bc    : this.styles.default.general.backgroundColor;
      this.styles.user.general.textColor         = params.txtc  ? '#' + params.txtc  : this.styles.default.general.textColor;

      // tps settings
      this.styles.user.tps.good          = params.tg    ? '#' + params.tg    : this.styles.default.tps.good;
      this.styles.user.tps.ok            = params.to    ? '#' + params.to    : this.styles.default.tps.ok;
      this.styles.user.tps.warning       = params.tw    ? '#' + params.tw    : this.styles.default.tps.warning;
      this.styles.user.tps.danger        = params.td    ? '#' + params.td    : this.styles.default.tps.danger;

      this.styles.user.logs.timeColor    = params.ltc   ? '#' + params.ltc   : this.styles.default.logs.timeColor;
      this.styles.user.logs.textColor    = params.ltxtc ? '#' + params.ltxtc : this.styles.default.logs.textColor;
      this.styles.user.logs.muteColor    = params.lmc   ? '#' + params.lmc   : this.styles.default.logs.muteColor;
      this.styles.user.logs.localColor   = params.llc   ? '#' + params.llc   : this.styles.default.logs.localColor;
      this.styles.user.logs.globalColor  = params.lgc   ? '#' + params.lgc   : this.styles.default.logs.globalColor;
      this.styles.user.logs.commandColor = params.lcc   ? '#' + params.lcc   : this.styles.default.logs.commandColor;
    },
    settingsExport() {
      let link  = document.location.origin + '/#/settings?share=true&';
          link += `pc=${this.replace( this.styles.user.general.primaryColor )}&`; // primary color
          link += `bc=${this.replace( this.styles.user.general.backgroundColor )}&`; // background color
          link += `txtc=${this.replace( this.styles.user.general.textColor )}&`; // text color

          link += `tg=${this.replace( this.styles.user.tps.good )}&`; // good color
          link += `to=${this.replace( this.styles.user.tps.ok )}&`; // ok color
          link += `tw=${this.replace( this.styles.user.tps.warning )}&`; // warning color
          link += `td=${this.replace( this.styles.user.tps.danger )}&`; // danger color

          link += `ltxtc=${this.replace( this.styles.user.logs.textColor )}&`; // logs text color
          link += `lmc=${this.replace( this.styles.user.logs.muteColor )}&`; // logs mute color
          link += `ltc=${this.replace( this.styles.user.logs.timeColor )}&`; // logs time color
          link += `llc=${this.replace( this.styles.user.logs.localColor )}&`; // logs local color
          link += `lgc=${this.replace( this.styles.user.logs.globalColor )}&`; // logs global color
          link += `lcc=${this.replace( this.styles.user.logs.commandColor )}`; // logs command color

      navigator.clipboard.writeText( link )
        .then(() => {
          this.show   = true;
          this.advice = 'Ссылка успешно скопирована!';
        })
        .catch( err => {
          this.show   = true;
          this.advice = 'Ссылка не скопирована! <br>Попробуйте снова.';

          console.error( err );
        });
    },
    replace( color ) {
      return color.replace( '#', '' );
    },
    update() {
      const $html = document.querySelector( 'html' );

      $html.style.setProperty( '--primary-color', this.styles.user.general.primaryColor );
      $html.style.setProperty( '--main-bg-color', this.styles.user.general.backgroundColor );
      $html.style.setProperty( '--font-color', this.styles.user.general.textColor );

      $html.style.setProperty( '--tps-good-color', this.styles.user.tps.good );
      $html.style.setProperty( '--tps-ok-color', this.styles.user.tps.ok );
      $html.style.setProperty( '--tps-warning-color', this.styles.user.tps.warning );
      $html.style.setProperty( '--tps-danger-color', this.styles.user.tps.danger );
    },
  },
  computed: {
    ...mapGetters( 'AuthModule', [
      'isAuthenticated'
    ]),
  },
  mounted() {
    this.start();
  }
}
