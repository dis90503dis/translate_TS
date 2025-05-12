<template>
    <div class="container checkOutStage">
        <div class="row checkOutStage_stageWrap">
            <div class="checkOutStage_step Order">
                <div class="checkOutStage_step_num" :class="{focous:isOrder}">
                    <span >1</span>
                </div>
                <p class="checkOutStage_step_txt" :class="{focousTxt:isOrder}">訂單資料</p>
            </div>
            <div class="checkOutStage_step Payment">
                <div class="checkOutStage_step_num" :class="{focous:isPayment}">
                    <span >2</span>
                </div>
                <p class="checkOutStage_step_txt" :class="{focousTxt:isPayment}">結帳資訊</p>
            </div>
            <div class="checkOutStage_step Confirm">
                <div class="checkOutStage_step_num" :class="{focous:isConfirm}">
                    <span >3</span>
                </div>
                <p class="checkOutStage_step_txt" :class="{focousTxt:isConfirm}">訂單確認</p>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props:['currentStep'],
        computed:{
            isOrder(){
                return this.currentStep === "Order";
            },
            isPayment(){
                return this.currentStep === "Payment";
            },
            isConfirm(){
                return this.currentStep === "Confirm";
            }
        }
    }
</script>

<style lang="scss">
@import '@/assets/scss/components/_checkOutStage.scss';
</style>