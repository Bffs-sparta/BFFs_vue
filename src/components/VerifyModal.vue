<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <!-- 모달 몸통 -->
                    <div class="modal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>

</script>

<style scoped>

</style>