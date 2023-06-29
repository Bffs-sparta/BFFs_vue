
export default {
    methods: {
        snotify(status,message){
            this.$snotify.clear();
            if(status == 'success'){
                this.$snotify.success(message, {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position:'centerTop',
                });
            }
            else if(status == 'error'){
                this.$snotify.error(message, {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position:'centerTop',
                });
            }
            else if(status=='warning'){
                this.$snotify.warning(message, {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position:'centerTop',
                });
            }
            else if(status=='info'){
                this.$snotify.info(message, {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    position:'centerTop',
                });
            }
        }
    }
}
