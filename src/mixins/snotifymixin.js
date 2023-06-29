
export default {
    methods: {
        snotify(status,message){
            if(status == 'success'){
                this.$snotify.success(message, {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position:'centerBottom',
                });
            }
            else if(status == 'error'){
                this.$snotify.error(message, {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position:'centerBottom',
                });
            }
            else if(status=='warning'){
                this.$snotify.warning(message, {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position:'centerBottom',
                });
            }
        }
    }
}
