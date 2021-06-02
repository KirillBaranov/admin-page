import {mapGetters} from "vuex";
import {getStaffPermissions} from "../assets/js/configs/StaffConfig";

export default {
  computed: {
    ...mapGetters( 'AuthModule', [
      'getStaff'
    ]),
  },
  methods: {
    hasPerm( perm ) {
      return getStaffPermissions(this.getStaff) && getStaffPermissions(this.getStaff).includes(perm);
    }
  }
}
