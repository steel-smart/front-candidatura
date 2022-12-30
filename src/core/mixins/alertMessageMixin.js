export const fireAlert = {
    // methods: {
    //   async fireAlert({ title, tipo, message, timer, routeName }) {
    //     (timer = tipo === "error" && !timer ? null : timer ? timer : 5000),
    //       this.$bvToast
    //         .toast(message, {
    //           title: title,
    //           variant: tipo,
    //           solid: false,
    //         })
    //         .then(() => {
    //           if (routeName && timer) {
    //             this.$router.push({ name: routeName });
    //           }
    //         });
    //   },
    // },
  
    methods: {
        async fireAlert({title, tipo, message, timer, routeName}) {
            timer = tipo === 'error' && !timer ? null : timer ? timer : 5000,
            this.$fire({
                title: title ? title : "Aviso",
                text: message,
                type: tipo ? tipo : 'success',
                timer: timer
            }).then(() => {
                if (routeName && timer) {
                    this.$router.push({name: routeName});
                }
            });
        },
    }
  };
  