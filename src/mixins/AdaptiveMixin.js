export default {
  data() {
    return {
      width: null
    }
  },
  computed: {
    isMobile() {
      return this.width < 968;
    },
  },
  methods: {
    resize() {
      this.width = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener( 'resize', this.resize.bind( this ) );

    this.width = window.innerWidth;
  },
}
