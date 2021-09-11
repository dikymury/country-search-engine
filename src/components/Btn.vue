<template>
    <button class="btn" :class="bg">
        <slot/>
    </button>
</template>
<script>
export default {
    props:{
        bg: {
            type: String,
            default: 'btn-primary'
        }
    }
}
</script>