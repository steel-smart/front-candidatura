// import { forEach } from "core-js/core/array";

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
            let msg =''
            
            if(typeof message  != "string") {
                for (var obj in message) {
                    message[obj].forEach(element => {
                        msg = element +"  " + msg 
    
});
                }
            }else{
                msg = message
            }
            timer = tipo === 'error' && !timer ? null : timer ? timer : 5000,
            this.$fire({
                title: title ? title : "Aviso",
                text: msg,
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
  