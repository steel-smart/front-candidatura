export const fireAlert = {
  methods: {
    async fireAlert({ title, tipo, message, timer, routeName }) {
      (timer = tipo === "error" && !timer ? null : timer ? timer : 5000),
        this.$bvToast
          .toast(message, {
            title: title,
            variant: tipo,
            solid: false,
          })
          .then(() => {
            if (routeName && timer) {
              this.$router.push({ name: routeName });
            }
          });
    },
  },
};
