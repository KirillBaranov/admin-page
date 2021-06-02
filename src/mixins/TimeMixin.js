export default {
  methods: {
    parseTime( sec ) {
      const time    = new Date( sec );

      const day     = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
      const month   = time.getMonth() >= 10 ? time.getMonth() : '0' + time.getMonth();
      const year    = time.getFullYear() >= 10 ? time.getFullYear() : '0' + time.getFullYear();

      const hours   = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours();
      const minutes = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes();
      const seconds = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds();

      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
  }
}
